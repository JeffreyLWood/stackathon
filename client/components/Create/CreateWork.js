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

  let worksData = user?.collections;

  let [primary, setPrimary] = useState("Work");
  let [secondary, setSecondary] = useState("Hidden");

  let [show, setShow] = useState(false);
  let [displayName, setDisplayName] = useState("");
  let [imgId, setImgId] = useState("");
  let [modalCollection, setModalCollection] = useState(primary); // Not loading

  useEffect(() => {
    user = dispatch(fetchUserData(username));
  }, [show]);

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
    setDisplayName(e.target.id);
    setShow(true);
  };

  const clickHandler = (e) => {
    e.preventDefault();
    setDisplayName("Edit Work");
    let imgId = e.target.src.split("/").slice(-1).join();
    setImgId(imgId);
    setShow(true);
    setModalCollection(e.target.id);
  };

  const changeHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.id === "primary") {
      setPrimary(evt.target.value);
    } else if (evt.target.id === "secondary") {
      setSecondary(evt.target.value);
    }
  };

  return (
    <div>
      <Navbar user={user} />
      <section className="w-screen flex justify-center sm:p-5 sm:h-90vh">
        <section className="flex flex-col w-full md:flex-row ">
          <div className="md:w-4/6">
            <CreateSnapshot
              id={"primary"}
              collectionTitle={primary}
              changeHandler={changeHandler}
              headers={headers}
              secondary={secondary}
              userId={userId}
              clickHandler={clickHandler}
              imgId={imgId}
              setImgId={setImgId}
              displayName={displayName}
              setDisplayName={setDisplayName}
              show={show}
              setShow={setShow}
            />
          </div>
          <div className="md:w-2/6">
            <CreateSnapshot
              id={"secondary"}
              collectionTitle={secondary}
              changeHandler={changeHandler}
              headers={headers}
              primary={primary}
              userId={userId}
              clickHandler={clickHandler}
              imgId={imgId}
              setImgId={setImgId}
              setDisplayName={setDisplayName}
              setShow={setShow}
            />
          </div>
        </section>
        <section className="flex mx-10 toolbar justify-center w-2/6">
          <img
            src="../../../collectionactive.png"
            id="Collections"
            onClick={(e) => submitHandler(e)}
            className="w-12 m-2"
          />

          <img
            src="../../../newworkactive.png"
            onClick={(e) => submitHandler(e)}
            id="Add a Work"
            className="w-12 m-2"
          />

          <img
            onClick={(e) => submitHandler(e)}
            src="../../../newcollectionactive.png"
            id="New Collection"
            className="w-12 m-2"
          />
        </section>
      </section>

      {/* <CreateUploader
        headers={headers}
        collection={modalCollection}
        displayName={displayName}
        show={show}
        setShow={setShow}
        imgId={imgId}
        user={user}
        usrId={userId}
        snapshotId={modalCollection === primary ? "primary" : "secondary"}
      /> */}
    </div>
  );
}
