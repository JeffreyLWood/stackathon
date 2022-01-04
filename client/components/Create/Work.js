import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAboutText } from "../../store/create";
import { useEffect, useState } from "react";
import Snapshot from "./Snapshot";
export default function Work(props) {
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  let changeHandler = (evt) => {
    evt.preventDefault();
    const file = evt.target.files[0];
    previewFile(file);
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
      await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage, userId: user.id }),
        headers: { "Content-type": "application/json" },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {/* Should be a modal 
         <form className="space-x-5" onSubmit={submitHandler}>
        <input
          className="border-2"
          name="image"
          type="file"
          onChange={changeHandler}
          value={fileInputState}
        />

        <button type="submit">Submit</button>
        {previewSource && (
          <img src={previewSource} alt="chosen" className="h-24" />
        )}
      </form> */}
      <Snapshot user={props.user} works={props.works} />
    </div>
  );
}
