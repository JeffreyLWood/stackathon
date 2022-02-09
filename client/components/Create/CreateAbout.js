import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAboutText } from "../../store/create";
import { useEffect, useState } from "react";
import { fetchUserData } from "../../store/user";
import { Navbar } from "../Navbar";

const About = (props) => {
  let user = useSelector((state) => state.user);

  let dispatch = useDispatch();

  useEffect(() => {
    user = dispatch(fetchUserData(props.match.params.username));
  }, []);

  let [text, setText] = useState("");

  useEffect(() => {
    setText(user && user.about ? user.about.text : "");
  }, [user]);

  let image;

  useEffect(() => {
    setText(text);
  }, [text]);

  let changeHandler = (evt) => {
    evt.preventDefault();
    setText(evt.target.value);
  };

  let submitHandler = (evt) => {
    evt.preventDefault();
    dispatch(updateAboutText(user.id, { aboutText: text }));
    dispatch(fetchUserData(user.userName));
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
      <div className="w-full p-10">
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
          <button type="submit" className="pill">
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
              style={{ resize: "none" }}
              onChange={changeHandler}
              value={text}
            />
          </div>
          <div>
            <button className="pill my-2" id="about" type="submit">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default About;
