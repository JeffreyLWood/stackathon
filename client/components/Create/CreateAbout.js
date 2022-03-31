import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAboutText, destroyAboutImage } from "../../store/create";
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
  let [header, setHeader] = useState("");
  let [image, setImage] = useState("");
  let [caption, setCaption] = useState("");
  let [previous, setPrevious] = useState("");

  let [unsavedChanges, setUnsavedChanges] = useState(false);
  useEffect(() => {
    setText(user && user.about ? user.about.text : "");
    setImage(user && user.about ? user.about.imgId : "");
    setHeader(user && user.about ? user.about.header : "");
    setCaption(user && user.about ? user.about.caption || "" : "");
    setPrevious(text); // !
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

    evt.target.name === "header"
      ? setHeader(evt.target.value)
      : setText(evt.target.value);
  };

  let submitHandler = (evt) => {
    evt.preventDefault();
    setUnsavedChanges(false);
    dispatch(
      updateAboutText(user.id, {
        aboutText: text,
        header: header,
        caption: caption,
      })
    );
    dispatch(fetchUserData(user.userName));
  };

  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  let imgChangeHandler = (evt) => {
    evt.preventDefault();
    setUnsavedChanges(true);
    if (evt.target.name === "caption") {
      setCaption(evt.target.value);
    } else {
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

  let imgSubmitHandler = (evt) => {
    evt.preventDefault();
    if (!previewSource) {
      dispatch(
        updateAboutText(user.id, {
          aboutText: text,
          header: header,
          caption: caption,
        })
      );
    } else {
      uploadImage(previewSource);
    }
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({
          data: base64EncodedImage,
          userId: user.id,
          type: "about",
          caption: caption,
        }),
        headers: { "Content-type": "application/json" },
      });
    } catch (error) {
      console.log("About image", error);
    }
  };

  const removeAboutImage = (e) => {
    e.preventDefault();
    setImage("");
    setPreviewSource("");
    dispatch(destroyAboutImage(user.id));
  };

  return (
    <>
      <Navbar user={user} />
      <div className="w-screen p-10 mt-20 flex flex-col justify-center sm:space-x-4 bg-neutral-50 md:flex-row">
        <div className="h-2/6 w-full md:w-2/6 h-full  flex items-center">
          <form className="" onSubmit={imgSubmitHandler}>
            <input
              id="image"
              name="image"
              type="file"
              onChange={imgChangeHandler}
              value={fileInputState}
              className="mx-auto"
              style={{ display: "none" }}
            />
            <label htmlFor="image">
              {previewSource ? (
                <img
                  src={previewSource}
                  alt="chosen"
                  className="h-72 mx-auto"
                />
              ) : image ? (
                <Image
                  cloudName={"jeffreywood"}
                  publicId={image}
                  className="mx-auto h-72"
                />
              ) : (
                <img
                  src="../../../placeholderadd.png"
                  className="h-72 mx-auto"
                ></img>
              )}
            </label>
            <input
              id="caption"
              type="text"
              name="caption"
              className="m-4 w-full text-xs p-2"
              placeholder="Optional - Image Caption"
              value={caption}
              onChange={imgChangeHandler}
            />
            <button type="submit" className="pill m-4">
              Submit
            </button>
            <button
              type="button"
              className="pillRed m-4"
              onClick={(e) => removeAboutImage(e)}
            >
              Clear Image
            </button>
          </form>
        </div>

        <div className="h-2/6 w-full md:w-4/6 h-full sm:px-10 pb-10 flex items-center">
          <form className="" onSubmit={submitHandler}>
            <label htmlFor="header" />
            Heading
            <textarea
              rows="3"
              cols="140"
              className="w-full p-4"
              name="header"
              placeholder="Optional Header. If a quote, end with double dash followed by author. eg: This is a quote --Me"
              type="text"
              style={{ resize: "none" }}
              onChange={changeHandler}
              value={header ? header : ""}
            />
            <label htmlFor="about" />
            Body
            <textarea
              rows="15"
              cols="140"
              placeholder="Brief Biography"
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
