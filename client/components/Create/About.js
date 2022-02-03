import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAboutText } from "../../store/create";
import { useEffect, useState } from "react";
import { fetchUserData } from "../../store/user";

const About = (props) => {
  let aboutData = props.user.about;

  let dispatch = useDispatch();

  let text = aboutData && aboutData.text;
  // let imgId = aboutData && aboutData.imgId;
  let [aboutText, setAboutText] = useState("");
  let image;
  useEffect(() => {
    setAboutText(text);
  }, [text]);

  let changeHandler = (evt) => {
    evt.preventDefault();
    setAboutText(evt.target.value);
  };

  let submitHandler = (evt) => {
    evt.preventDefault();
    dispatch(updateAboutText(props.user.id, { aboutText }));
    dispatch(fetchUserData(props.user.userName));
  };

  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  let imgChangeHandler = (evt) => {
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

  let imgSubmitHandler = (evt) => {
    evt.preventDefault();
    if (!previewSource) return;
    uploadImage(previewSource);
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({
          data: base64EncodedImage,
          userId: props.user.id,
          type: "about",
        }),
        headers: { "Content-type": "application/json" },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="space-x-5" onSubmit={imgSubmitHandler}>
        <div>
          <input
            id="image"
            name="image"
            type="file"
            onChange={imgChangeHandler}
            value={fileInputState}
            style={{ display: "none" }}
          />
          <label htmlFor="image">
            {previewSource ? (
              <img src={previewSource} alt="chosen" className="h-56" />
            ) : image ? (
              <Image
                cloudName={"jeffreywood"}
                publicId={null}
                className="h-56"
              />
            ) : (
              <img src="../placeholderadd.png"></img>
            )}
          </label>
        </div>
        <button
          type="submit"
          className="bg-black text-white text-uppercase p-1 my-3"
        >
          Submit
        </button>
      </form>
      <form className="space-x-5" onSubmit={submitHandler}>
        <div>
          <textarea
            rows="15"
            cols="50"
            className="border-2 w-4/6 p-2"
            name="about"
            type="text"
            onChange={changeHandler}
            value={aboutText}
          />
        </div>
        <div>
          <button className="pill my-2" id="about" type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};
export default About;
