import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAboutText } from "../../store/create";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";
import { fetchSingleWork, destroyWork } from "../../store/create";

const Modal = (props) => {
  let work = useSelector((state) => state.create);

  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const dispatch = useDispatch();

  const [state, setState] = useState({
    title: "",
    year: "",
    height: "",
    width: "",
    medium: "",
    hidden: "",
  });
  console.log("state1", state, "work1", work);

  useEffect(() => {
    async function loadImageData() {
      if (props.displayName === "Add a Work") {
        // clears state
        await dispatch(fetchSingleWork(null, null));
        // clears preview image in case modal was closed and add a work was opened
        setPreviewSource("");
        setState({
          title: "",
          year: "",
          height: "",
          width: "",
          medium: "",
          hidden: "",
        });
      }
      if (props.displayName === "Edit Work") {
        await dispatch(fetchSingleWork(props.user.id, props.imgId));
      }
    }
    loadImageData();
  }, [props.show]);

  const destroyHandler = (userId, imgId) => {
    imgId = imgId.split("/").slice(-1).join();
    dispatch(destroyWork(userId, imgId));
    props.setShow(false);
  };

  let changeHandler = (evt) => {
    evt.preventDefault();
    //if evt target is files, we are dealing with the img file
    if (evt.target.files) {
      const file = evt.target.files[0];
      previewFile(file);
    } else {
      //if event target name is in data, change data to value
      setState({ ...state, [evt.target.name]: evt.target.value });
      work = { ...work, [evt.target.name]: evt.target.value };
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  let submitHandler = (evt) => {
    evt.preventDefault();
    if (props.displayName === "Edit Work") {
      //if edit work and preview source, post new image, put data, if no preview source and edit, do code, then next code as normal
      console.log("Edit");
      updateData(previewSource);
    } else if (!previewSource) return;
    else if (props.displayName === "Add a Work") {
      console.log("Add");
      uploadImage(previewSource);
    }
  };
  // if preview source => then new image

  const uploadImage = async (base64EncodedImage) => {
    try {
      await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({
          data: base64EncodedImage,
          userId: props.user.id,
          title: state.title,
          year: state.year,
          height: state.height,
          width: state.width,
          medium: state.medium,
          hidden: state.hidden,
        }),
        headers: { "Content-type": "application/json" },
      });
    } catch (error) {
      console.log(props, error);
    }
  };

  const updateData = async (base64EncodedImage) => {
    try {
      console.log("updateData base64EncodedImage", base64EncodedImage.length);
      await fetch("/api/update", {
        method: "POST",
        body: JSON.stringify({
          data: base64EncodedImage,
          newImage: previewSource ? true : false,
          imgId: state.imgId ? state.imgId : work.imgId,
          userId: props.user.id,
          title: state.title.length ? state.title : work.title,
          year: state.year.length ? state.year : work.year,
          height: state.height.length ? state.height : work.Height,
          width: state.width.length ? state.width : work.width,
          medium: state.medium.length ? state.medium : work.Medium,
          hidden: state.hidden.length ? state.hidden : work.Hidden,
        }),
        headers: { "Content-type": "application/json" },
      });
    } catch (error) {
      console.log(props, error);
    }
  };

  if (!props.show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header flex justify-between">
          <h2>{props.displayName}</h2>
          <h2 onClick={() => props.setShow(false)}>
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
                  <img src="placeholderadd.png"></img>
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
              <label htmlFor="hidden" className="my-1">
                Set to Hidden
                <input
                  name="hidden"
                  type="checkbox"
                  id="hidden"
                  onChange={changeHandler}
                  className="m-1"
                  value={
                    state.hidden.length
                      ? state.hidden
                      : work
                      ? work.hidden
                      : state.hidden
                  }
                />
              </label>

              <button
                type="submit"
                className="bg-black text-white text-uppercase p-1 my-3"
              >
                Submit
              </button>
              {work ? (
                <button
                  className="border-2 text-uppercase p-1"
                  onClick={() => destroyHandler(props.user.id, work.imgId)}
                >
                  Delete
                </button>
              ) : null}
            </div>
          </form>
        </div>
        {/* Modal Footer */}
        <div className="modal-footer">test</div>
      </div>
    </div>
  );
};

export const Uploader = Modal;
