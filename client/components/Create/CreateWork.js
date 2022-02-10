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
  let [secondary, setSecondary] = useState("hidden");

  const changeHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.name === "primary") {
      setPrimary(evt.target.value);
    }
    if (evt.target.name === "secondary") {
      console.log(evt.target.name, evt.target.value, secondary);
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
          <select
            name="primary"
            id="primary"
            onChange={changeHandler}
            value={primary}
          >
            <option value="work">Work</option>
            <option value="hidden">Hidden</option>
            {headers.map((heading, idx) => (
              <option key={idx} value={heading}>
                {heading}
              </option>
            ))}
          </select>
          <select
            type="select"
            name="secondary"
            id="secondary"
            onChange={changeHandler}
            value={secondary}
          >
            <option value="hidden">Hidden</option>
            <option value="work">Work</option>
            {headers.map((heading, idx) => (
              <option key={idx} value={heading}>
                {heading}
              </option>
            ))}
          </select>
          <div className="flex flex-row w-full">
            <div className="w-4/6">
              <CreateSnapshot
                user={user}
                works={worksData?.filter((work) => work?.heading === primary)}
              />
              {/* Will be works.primary */}
            </div>
            <div className="w-2/6">
              <CreateSnapshot
                user={user}
                works={
                  worksData &&
                  worksData.filter((work) => {
                    if (secondary === "hidden") {
                      return work.hidden === true;
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
