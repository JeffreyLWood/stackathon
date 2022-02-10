import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CreateSnapshot from "./CreateSnapshot";
import { DragDropContext } from "react-beautiful-dnd";
import { Navbar } from "../Navbar";
import { fetchUserData } from "../../store/user";
export default function Work(props) {
  let user = useSelector((state) => state.user);

  let dispatch = useDispatch();

  useEffect(() => {
    user = dispatch(fetchUserData(props.match.params.username));
  }, []);

  console.log(props, user);
  let worksData = user?.works;

  let [primary, setPrimary] = useState("Work");
  let [secondary, setSecondary] = useState("Hidden");

  const changeHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.name === "primary") {
      setPrimary(evt.target.value);
    }
    if (evt.target.name === "secondary") {
      setSecondary(evt.target.value);
    }
  };

  let headers = [];
  const headings = () => {
    for (let i = 0; i < worksData.length; i++) {
      if (
        worksData[i].heading !== null &&
        !headers.includes(worksData[i].heading)
      )
        headers.push(worksData[i].heading);
    }
  };
  worksData && headings();
  return (
    <>
      <Navbar user={user} />
      <div className="p-10">
        <DragDropContext>
          <div className="flex flex-row w-full">
            <div className="w-4/6">
              <select
                name="primary"
                id="primary"
                onChange={changeHandler}
                value={primary}
              >
                {headers.map((heading, idx) => (
                  <option key={idx} value={heading}>
                    {heading}
                  </option>
                ))}
              </select>
              <CreateSnapshot
                user={user}
                works={worksData?.filter(
                  (work) => work?.heading === primary && work.hidden === "false"
                )}
              />
            </div>
            <div className="w-2/6">
              <select
                type="select"
                name="secondary"
                id="secondary"
                onChange={changeHandler}
                value={secondary}
              >
                <option value="Hidden">Hidden</option>

                {headers.map((heading, idx) => (
                  <option key={idx} value={heading}>
                    {heading}
                  </option>
                ))}
              </select>
              <CreateSnapshot
                user={user}
                works={
                  worksData &&
                  worksData.filter((work) => {
                    if (secondary === "Hidden") {
                      return work.hidden === "true";
                    } else {
                      return work.heading === secondary;
                    }
                  })
                }
              />
              {/* will be works.secondary */}
            </div>
          </div>
        </DragDropContext>
      </div>
    </>
  );
}
