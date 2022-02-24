import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPrimaryCollection,
  fetchSecondaryCollection,
  updateAboutText,
} from "../../store/create";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";
import {
  fetchSingleWork,
  destroyWork,
  fetchCollection,
  upload,
  update,
  switcher,
} from "../../store/create";

export default function CreateUploader(props) {
  let work = useSelector((state) => state?.create.work);
  let user = useSelector((state) => state.user);
  const [fileInputState, setFileInputState] = useState("");
  let [previewSource, setPreviewSource] = useState("");

  const dispatch = useDispatch();

  let [state, setState] = useState({
    collection: props.collection,
    title: "",
    year: "",
    height: "",
    width: "",
    medium: "",
    hidden: false,
  });

  let [hidden, setHidden] = useState(false);

  useEffect(() => {
    async function loadImageData() {
      if (props.displayName === "Add a Work") {
        // clears state
        await dispatch(fetchSingleWork(null, null, null));
        // clears preview image in case modal was closed and add a work was opened
        setPreviewSource("");
        setState({
          collection: props.collection,
          title: "",
          year: "",
          height: "",
          width: "",
          medium: "",
          hidden: false,
        });
      }
      if (props.displayName === "Edit Work") {
        work = await dispatch(
          fetchSingleWork(user.id, props.collection, props.imgId)
        );
      }
    }
    loadImageData();
  }, [props.show]);

  let changeHandler = (evt) => {
    evt.preventDefault();
    //if evt target is files, we are dealing with the img file
    if (evt.target.name === "image") {
      const file = evt.target.files[0];
      previewFile(file);
    } else {
      setState({ ...state, [evt.target.name]: evt.target.value });
      work = { ...work, [evt.target.name]: evt.target.value }; // ? needed?
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  // CALL THUNK ACTIONS TO TRIGGER REFRESH
  let submitHandler = async (evt) => {
    evt.preventDefault();
    console.log(
      "state.collection",
      state.collection,
      "props.collection",
      props.collection
    );
    if (props.displayName === "Edit Work") {
      if (state.collection !== props.collection) {
        switchHandler(previewSource);
      } else if (state.collection === props.collection) {
        updateHandler(previewSource);
      }
    } else if (!previewSource) return;
    else if (props.displayName === "Add a Work") {
      uploadHandler(previewSource);
    }
    // Clears single work state
    await dispatch(fetchSingleWork(null, null));
    //Clears input fields
    setState({
      title: "",
      collection: props.collection,
      year: "",
      height: "",
      width: "",
      medium: "",
      hidden: null,
    });
    //Closes
    props.setShow(false);
  };

  const uploadHandler = async (base64EncodedImage) => {
    try {
      let body = {
        data: base64EncodedImage,
        collection: state.collection,
        userId: user.id,
        title: state.title,
        year: state.year,
        height: state.height,
        width: state.width,
        medium: state.medium,
        hidden: hidden,
      };
      dispatch(upload(body));
    } catch (error) {
      console.log(error);
    }
  };

  //SHOULD BE IN REDUX STORE AS THUNK CREATOR UPDATE WORK
  const updateHandler = async (base64EncodedImage) => {
    try {
      let body = {
        data: base64EncodedImage,
        newImage: previewSource ? true : false,
        collection: state.collection,
        imgId: work.imgId,
        userId: user.id,
        title: state.title.length ? state.title : work.title,
        year: state.year.length ? state.year : work.year,
        height: state.height.length ? state.height : work.height,
        width: state.width.length ? state.width : work.width,
        medium: state.medium.length ? state.medium : work.medium,
      };
      console.log(body);
      dispatch(update(body));
      setPreviewSource("");
    } catch (error) {
      console.log(props, error);
    }
  };

  const switchHandler = async (base64EncodedImage) => {
    try {
      let body = {
        newImage: previewSource ? true : false,
        data: base64EncodedImage,
        collection: state.collection,
        destination: {
          snapshotId:
            state.collection === props.primary ? "primary" : "secondary",
          collection: state.collection,
        },
        origin: {
          snapshotId:
            props.collection === props.primary ? "primary" : "secondary",
          collection: props.collection,
        },
        userId: user.id,
        imgId: work.imgId,
        title: state.title.length ? state.title : work.title,
        year: state.year.length ? state.year : work.year,
        height: state.height.length ? state.height : work.height,
        width: state.width.length ? state.width : work.width,
        medium: state.medium.length ? state.medium : work.medium,
      };
      dispatch(switcher(body));
    } catch (error) {
      console.log(error);
    }
  };

  // Deletes a work from a collection
  const destroyHandler = (userId, collection, imgId, snapshotId) => {
    imgId = imgId.split("/").slice(-1).join();
    dispatch(destroyWork(userId, collection, imgId, snapshotId));
    props.setShow(false);
  };

  const closeHandler = () => {
    props.setShow(false);
    setState({
      title: "",
      year: "",
      height: "",
      width: "",
      medium: "",
      hidden: null,
    });
    setPreviewSource("");
  };

  if (!props.show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header flex justify-between">
          <h2>{props.displayName}</h2>
          <h2 onClick={closeHandler}>
            <img src="/icons8-close-16.png"></img>
          </h2>
        </div>
        {/* Modal Body */}
        <div className="h-full">
          <form
            className="h-full bg-white flex justify-around items-center"
            onSubmit={submitHandler}
          >
            <div>
              <input
                id="image"
                name="image"
                type="file"
                onChange={changeHandler}
                value={fileInputState}
                style={{ display: "none" }}
              />

              <label htmlFor="image">
                {previewSource ? (
                  <img src={previewSource} alt="chosen" className="h-56" />
                ) : work ? (
                  <Image
                    cloudName={"jeffreywood"}
                    publicId={work.imgId}
                    className="h-56"
                  />
                ) : (
                  <img src="../../../placeholderadd.png"></img>
                )}
              </label>
            </div>
            <div className="flex flex-col justify-around">
              <input
                type="text"
                name="title"
                className="my-1 border-b-2"
                placeholder="Title"
                onChange={changeHandler}
                value={
                  state.title.length
                    ? state.title
                    : work
                    ? work.title
                    : state.title
                }
              />
              <input
                type="text"
                name="year"
                className="my-1 border-b-2"
                placeholder="Year"
                onChange={changeHandler}
                value={
                  state.year.length ? state.year : work ? work.year : state.year
                }
              />
              <input
                type="text"
                name="medium"
                className="my-1 border-b-2"
                placeholder="Medium"
                onChange={changeHandler}
                value={
                  state.medium.length
                    ? state.medium
                    : work
                    ? work.medium
                    : state.medium
                }
              />
              <div className="flex flex-row">
                <input
                  type="text"
                  name="height"
                  className="my-1 border-b-2"
                  placeholder="Height"
                  onChange={changeHandler}
                  value={
                    state.height.length
                      ? state.length
                      : work
                      ? work.height
                      : state.height
                  }
                />
                <input
                  type="text"
                  name="width"
                  className="my-1 border-b-2"
                  placeholder="Width"
                  onChange={changeHandler}
                  value={
                    state.width.length
                      ? state.length
                      : work
                      ? work.width
                      : state.width
                  }
                />
              </div>
              <label
                htmlFor="collection"
                className="flex m-1 items-center space-x-2"
              >
                Collection:
                <select
                  name="collection"
                  className="p-2"
                  onChange={changeHandler}
                  value={state.collection ? state.collection : props.collection}
                >
                  {props &&
                    props?.headers.map((heading, idx) => (
                      <option
                        key={idx}
                        name="collection"
                        value={heading}
                        id={props.id}
                      >
                        {heading}
                      </option>
                    ))}
                  {props.id === "secondary" ? (
                    <option value="Hidden">Hidden</option>
                  ) : null}
                </select>
              </label>
              {/*  <div
                onClick={hiddenHandler}
                className="flex space-x-5 items-center w-12 p-1"
              >
               <span>
                  {hidden ? (
                    <img
                      src="../../../hiddenactive.png"
                      name="hidden"
                      value={hidden}
                      className="w-8"
                    />
                  ) : (
                    <img
                      src="../../../hiddeninactive.png"
                      onClick={hiddenHandler}
                      name="hidden"
                      value={hidden}
                      className="w-8"
                    />
                  )}
                </span> 
              </div>*/}
              <button
                type="submit"
                className="bg-black text-white text-uppercase p-1 my-3"
              >
                Submit
              </button>
              {work ? (
                <button
                  className="border-2 text-uppercase p-1"
                  type="button"
                  onClick={() =>
                    destroyHandler(
                      user.id,
                      props.collection,
                      work.imgId,
                      props.snapshotId
                    )
                  }
                >
                  Delete
                </button>
              ) : null}
            </div>
          </form>
        </div>
        {/* Modal Footer */}
        <div className="modal-footer"></div>
      </div>
    </div>
  );
}
