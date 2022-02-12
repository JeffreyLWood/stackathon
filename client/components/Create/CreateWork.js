import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CreateSnapshot from "./CreateSnapshot";
import { DragDropContext } from "react-beautiful-dnd";
import { Navbar } from "../Navbar";
import { fetchUserData } from "../../store/user";
import CreateUploader from "./CreateUploader";
import { useRef } from "react";
export default function CreateWork(props) {
  let user = useSelector((state) => state.user);

  let dispatch = useDispatch();

  useEffect(() => {
    user = dispatch(fetchUserData(props.match.params.username));
  }, []);

  let worksData = user?.works;

  let [primary, setPrimary] = useState("Work");
  let [secondary, setSecondary] = useState("Hidden");

  let [show, setShow] = useState(false);
  let [displayName, setDisplayName] = useState("");
  let [imgId, setImgId] = useState("");

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

  const submitHandler = (e) => {
    e.preventDefault();
    setDisplayName(e.target.value);
    setShow(true);
  };

  const onDragEnd = () => {};
  let ddc = useRef("ddc");
  return (
    <>
      <Navbar user={user} />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="p-10">
          <div className="flex flex-row w-full">
            <div className="w-4/6">
              <CreateSnapshot
                id={"primary"}
                setHeader={setPrimary}
                value={primary}
                headers={headers}
                innerRef={ddc}
                user={user}
                works={worksData?.filter(
                  (work) => work?.heading === primary && work.hidden === "false"
                )}
              />
            </div>
            <div className="w-2/6">
              <CreateSnapshot
                id={"secondary"}
                innerRef={ddc}
                setHeader={setSecondary}
                value={secondary}
                headers={headers}
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
            </div>
          </div>

          <button
            type="submit"
            onClick={(event) => submitHandler(event)}
            className="pill m-2"
            value="Add a Work"
          >
            Add a Work
          </button>

          <CreateUploader
            displayName={displayName}
            show={show}
            setShow={setShow}
            imgId={imgId}
            user={props.user}
          />
        </div>
      </DragDropContext>
    </>
  );
}
