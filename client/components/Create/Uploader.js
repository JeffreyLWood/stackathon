import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAboutText } from "../../store/create";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Uploader(props) {
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  let data = {
    title: "",
    year: 0,
    height: 0,
    width: 0,
    medium: "",
    hidden: "off",
  };

  let changeHandler = (evt) => {
    evt.preventDefault();
    //if event target name is in data, change data to value
    data[evt.target.name] = evt.target.value;

    console.log("data[evt.target.name]", data[evt.target.name]);
    //if evt target is files, we are dealing with the img file
    if (evt.target.files) {
      const file = evt.target.files[0];
      previewFile(file);
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
    if (!previewSource) return;
    uploadImage(previewSource);
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      console.log("data", data);
      await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({
          data: base64EncodedImage,
          userId: props.user.id,
          title: data.title,
          year: data.year,
          height: data.height,
          width: data.width,
          medium: data.medium,
          hidden: data.hidden,
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
          <h2>Add a Work</h2>
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
              />
              <input
                type="text"
                name="year"
                className="my-1 border-b-2"
                placeholder="Year"
                onChange={changeHandler}
              />
              <input
                type="text"
                name="medium"
                className="my-1 border-b-2"
                placeholder="Medium"
                onChange={changeHandler}
              />
              <div className="flex flex-row">
                <input
                  type="text"
                  name="height"
                  className="my-1 border-b-2"
                  placeholder="Height"
                  onChange={changeHandler}
                />
                <input
                  type="text"
                  name="width"
                  className="my-1 border-b-2"
                  placeholder="Width"
                  onChange={changeHandler}
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
                />
              </label>

              <button
                type="submit"
                className="bg-black text-white text-uppercase p-1 my-3"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        {/* Modal Footer */}
        <div className="modal-footer"></div>
      </div>
    </div>
  );
}
