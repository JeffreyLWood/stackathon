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
  let username = useSelector((state) => state.auth.username);
  let userId = useSelector((state) => state.auth.id);
  let user = useSelector((state) => state.user);
  let dispatch = useDispatch();

  useEffect(() => {
    user = dispatch(fetchUserData(username));
  }, []);

  let worksData = user?.collections;

  let [primary, setPrimary] = useState("Work");
  let [secondary, setSecondary] = useState("Hidden");

  let [show, setShow] = useState(false);
  let [displayName, setDisplayName] = useState("");
  let [imgId, setImgId] = useState("");

  let headers = [];
  const headings = () => {
    for (let i = 0; i < worksData.length; i++) {
      if (worksData[i].title !== null && !headers.includes(worksData[i].title))
        headers.push(worksData[i].title);
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
                collectionTitle={primary}
                headers={headers}
                innerRef={ddc}
                userId={userId}
                // clickHandler={clickHandler}
                imgId={imgId}
                setImgId={setImgId}
                setDisplayName={setDisplayName}
                setShow={setShow}
              />
            </div>
            <div className="w-2/6">
              {/* <CreateSnapshot
                id={"secondary"}
                innerRef={ddc}
                collectionTitle={secondary}
                setHeader={setSecondary}
                headers={headers}
                innerRef={ddc}
                userId={userId}
                // clickHandler={clickHandler}
                imgId={imgId}
                setImgId={setImgId}
                setDisplayName={setDisplayName}
                setShow={setShow}
              /> */}
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
            collection={primary}
            displayName={displayName}
            show={show}
            setShow={setShow}
            imgId={imgId}
            user={user}
          />
        </div>
      </DragDropContext>
    </>
  );
}
