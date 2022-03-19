import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAboutText } from "../../store/create";
import { useEffect, useState } from "react";
import { fetchUserData } from "../../store/user";
import { Navbar } from "../Navbar";
import { Image } from "cloudinary-react";
const About = (props) => {
  let user = useSelector((state) => state.user);

  let dispatch = useDispatch();

  useEffect(() => {
    user = dispatch(fetchUserData(props.match.params.username));
  }, []);

  let [text, setText] = useState("");

  let [image, setImage] = useState("");

  let [previous, setPrevious] = useState("");

  let [unsavedChanges, setUnsavedChanges] = useState(false);
  useEffect(() => {
    setText(user && user.about ? user.about.text : "");
    setImage(user && user.about ? user.about.imgId : "");
    setPrevious(text);
  }, [user]);

  useEffect(() => {
    setText(text);
  }, [text]);

  let changeHandler = (evt) => {
    evt.preventDefault();

    if (text == previous) {
      setUnsavedChanges(false);
    } else {
      setUnsavedChanges(true);
    }
    setText(evt.target.value);
  };

  let submitHandler = (evt) => {
    evt.preventDefault();
    setUnsavedChanges(false);

    dispatch(updateAboutText(user.id, { aboutText: text }));
    dispatch(fetchUserData(user.userName));
  };

  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  let imgChangeHandler = (evt) => {
    evt.preventDefault();
    setUnsavedChanges(true);
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
          userId: user.id,
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
      <Navbar user={user} />
      <div className="container w-full p-10 flex flex-col justify-center md:flex-row">
        <div className="h-3/6 md:w-3/6 h-full flex items-center justify-center">
          <form className="" onSubmit={imgSubmitHandler}>
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
                <img src={previewSource} alt="chosen" className="h-72" />
              ) : image ? (
                <Image
                  cloudName={"jeffreywood"}
                  publicId={image}
                  className="my-4 h-72"
                />
              ) : (
                <img src="../../../placeholderadd.png"></img>
              )}
            </label>

            <button type="submit" className="pill">
              Submit
            </button>
          </form>
        </div>

        <div className="h-3/6 md:w-3/6 h-full flex items-center">
          <form className="" onSubmit={submitHandler}>
            <textarea
              rows="15"
              cols="140"
              className="w-full p-4"
              name="about"
              type="text"
              style={{ resize: "none" }}
              onChange={changeHandler}
              value={text ? text : ""}
            />

            <button className="pill my-2" id="about" type="submit">
              Save Changes
            </button>
            <span className="italic text-indigo-600 text-sm mx-4">
              {unsavedChanges ? `Remember to save your changes` : null}
            </span>
          </form>
        </div>
      </div>
    </>
  );
};
export default About;
