import React from "react";
import { updateContactData } from "../../store/create";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar } from "../Navbar";
import { fetchUserData } from "../../store/user";
export default function CreateContact(props) {
  let user = useSelector((state) => state.user);

  let dispatch = useDispatch();
  let [state, setState] = useState({});

  let [image, setImage] = useState("");
  let [caption, setCaption] = useState("");
  let [unsavedChanges, setUnsavedChanges] = useState(false);
  useEffect(() => {
    user = dispatch(fetchUserData(props.match.params.username));
  }, []);

  useEffect(() => {
    setState(user?.contact || {});
  }, [user]);

  let changeHandler = (evt) => {
    evt.preventDefault();
    setState({ ...state, [evt.target.name]: evt.target.value });
  };

  let submitHandler = (evt) => {
    evt.preventDefault();
    dispatch(updateContactData(user.id, state));
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
      dispatch(updateContactData(user.id, state));
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
          type: "contact",
          caption: caption,
        }),
        headers: { "Content-type": "application/json" },
      });
    } catch (error) {
      console.log("Contact image", error);
    }
  };

  const removeContactImage = (e) => {
    e.preventDefault();
    setImage("");
    setPreviewSource("");
    dispatch(destroyContactImage(user.id));
  };

  return (
    <>
      <Navbar user={user} />

      <form
        className="contact h-full mt-24 sm:mt-20 w-full bg-neutral-50 flex flex-col mx-2 md:flex-row md:p-10 md:space-x-5 font-light text-gray-500"
        onSubmit={submitHandler}
      >
        <div className="w-full flex flex-col">
          <label htmlFor="text" className="">
            Contact Text:
          </label>
          <textarea
            rows="5"
            className="w-5/6"
            style={{ resize: "none" }}
            name="text"
            type="text"
            onChange={changeHandler}
            value={state?.text || ""}
          />
          <label htmlFor="email" className="mt-5">
            Public Contact Information
          </label>
          <label htmlFor="email">Email *</label>
          <input
            required
            className=" w-4/6"
            name="email"
            type="text"
            onChange={changeHandler}
            value={state?.email || user.email}
          ></input>
          <label htmlFor="email">Phone</label>
          <input
            className=" w-4/6"
            name="phone"
            type="tel"
            onChange={changeHandler}
            value={state?.phone || ""}
            placeholder={"000 123 4567"}
          ></input>
          <label htmlFor="email">Location</label>
          <input
            className=" w-4/6"
            name="address"
            type="text"
            onChange={changeHandler}
            value={state?.address || ""}
            placeholder="City, ST"
          ></input>
        </div>
        <div className="w-full pt-5 sm:pt-0 flex flex-col">
          <label htmlFor="socialMedia" className="mb-1">
            Social Media Links
          </label>
          <label htmlFor="instagram">Instagram</label>
          <input
            className=" w-4/6"
            name="instagram"
            type="url"
            onChange={changeHandler}
            value={state?.instagram || ""}
            placeholder="https://wwww.instagram.com/"
          ></input>
          <label htmlFor="facebook">Facebook</label>
          <input
            className=" w-4/6"
            name="facebook"
            type="url"
            onChange={changeHandler}
            placeholder="https://wwww.facebook.com/"
            value={state?.facebook || ""}
          ></input>
          <label htmlFor="twitter">Twitter</label>
          <input
            className=" w-4/6"
            name="twitter"
            type="url"
            onChange={changeHandler}
            placeholder="https://wwww.twitter.com/"
            value={state?.twitter || ""}
          ></input>
          <label htmlFor="youtube">Youtube</label>
          <input
            className=" w-4/6"
            name="youtube"
            type="url"
            onChange={changeHandler}
            placeholder="https://wwww.youtube.com/"
            value={state?.youtube || ""}
          ></input>
          <label htmlFor="linkedin">LinkedIn</label>
          <input
            className=" w-4/6"
            name="linkedin"
            type="url"
            onChange={changeHandler}
            placeholder="https://wwww.linkedin.com/"
            value={state?.linkedin || ""}
          ></input>
          <label htmlFor="etsy">Etsy</label>
          <input
            className=" w-4/6"
            name="etsy"
            type="url"
            onChange={changeHandler}
            placeholder="https://wwww.etsy.com/"
            value={state?.etsy || ""}
          ></input>
          <label htmlFor="pinterest">Pinterest</label>
          <input
            className=" w-4/6"
            name="pinterest"
            type="url"
            onChange={changeHandler}
            placeholder="https://wwww.pinterest.com/"
            value={state?.pinterest || ""}
          ></input>
          <label htmlFor="tiktok">TikTok</label>
          <input
            className=" w-4/6"
            name="tiktok"
            type="url"
            onChange={changeHandler}
            placeholder="https://wwww.tiktok.com/"
            value={state?.tiktok || ""}
          ></input>
          <div>
            <button type="submit" className="pill mt-5 text-black">
              Save Changes
            </button>
          </div>
        </div>
      </form>
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
            <img src={previewSource} alt="chosen" className="h-72 mx-auto" />
          ) : image ? (
            <Image
              cloudName={process.env.CLOUDINARY_NAME}
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
          onClick={(e) => removeContactImage(e)}
        >
          Clear Image
        </button>
      </form>
    </>
  );
}
