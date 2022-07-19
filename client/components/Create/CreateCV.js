import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCVText } from "../../store/create";
import { useEffect, useState } from "react";
import { fetchUserData } from "../../store/user";
import CVGroup from "../Templates/1/CVGroup";
import { destroyCVImage } from "../../store/create";

const CV = (props) => {
  let user = useSelector((state) => state.user);

  let dispatch = useDispatch();

  let [text, setText] = useState("");

  let [header, setHeader] = useState("education");
  let [data, setData] = useState("");
  let [unsaved, setUnsaved] = useState(false);
  let [image, setImage] = useState("");
  let [caption, setCaption] = useState("");
  let [previous, setPrevious] = useState("");
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  let [unsavedChanges, setUnsavedChanges] = useState(false);
  useEffect(() => {
    setText(user && user.cv ? user.cv.education : {});
    setData(
      user && user.cv && user.cv.education?.length
        ? user.cv.education.split("\n")
        : []
    );
  }, [user]);

  let changeHandler = async (evt) => {
    evt.preventDefault();
    setHeader(evt.target.value);

    setText(user.cv[evt.target.value]);
    [evt.target.name] = evt.target.value;
    user.cv[evt.target.value]
      ? setData(user.cv[evt.target.value].split("\n"))
      : setData(document.getElementById("#inputBox").placeholder.split("\n"));
  };

  let textHandler = (evt) => {
    evt.preventDefault();
    setText(evt.target.value);
    setData(text.split("\n"));
    setUnsaved(true);
  };

  let submitHandler = (evt) => {
    evt.preventDefault();
    // console.log(user.id, header, text);
    dispatch(updateCVText(user.id, header, text));
    setUnsaved(false);
  };

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
    uploadImage(previewSource);
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({
          data: base64EncodedImage,
          userId: user.id,
          type: "cv",
          caption: caption,
        }),
        headers: { "Content-type": "application/json" },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeCvImage = (e) => {
    e.preventDefault();
    setImage("");
    setPreviewSource("");
    dispatch(destroyAboutImage(user.id));
  };

  return (
    <>
      <div className="w-full min-h-screen justify-center px-2 pt-12 bg-neutral-50 mt-20 sm:mt-10 sm:p-10 flex">
        <form
          className="w-full min-h-screen space-y-5"
          onSubmit={submitHandler}
        >
          <div className="flex flex-col">
            <span>
              <label htmlFor="header">Category</label>
              <select
                className="border-2"
                id="header"
                name="header"
                value={header}
                onChange={changeHandler}
              >
                <option value="education">Education</option>
                <option value="soloExhibition">Solo Exhibition</option>
                <option value="groupExhibition">Group Exhibition</option>
                <option value="experience">Related Experience</option>
                <option value="teaching">Teaching</option>
                <option value="awards">Awards</option>
                <option value="press">Press</option>
                <option value="publication">Publication</option>
                <option value="residencies">Residencies</option>
                <option value="advocacy">Advocacy</option>
                <option value="communityInvolvement">
                  Community Involvement
                </option>
              </select>
            </span>
            <label htmlFor="header" className="mt-2 flex flex-col">
              <span className=" mb-2 font-semibold">
                Columns must be separated by comma and in order:
              </span>
              <span className="text-lg">
                YYYY, Heading 1, Heading 2, Location, Link and/or Description 1,
                Description 2, Description 3
              </span>
              {/* <span className="italic text-sm text-neutral-400">
                If there is a comma in your title, use double-comma. eg. "Me,,
                Myself,, and Irene" would be "Me, Myself, and Irene"
              </span> */}
              <span className="italic mb-2 text-sm font-semibold">
                Links must begin with 'https://'
              </span>
              <span className="hidden sm:block text-indigo-600">
                Having trouble? See the examples below. Copy and paste them into
                the input field{" "}
                <span className=" hidden sm:blockunderline text-indigo-600">
                  and hit enter
                </span>{" "}
                to see how they render.
              </span>
              <ul className="hidden sm:block text-sm italic list-disc">
                <li>2020, Columbia University, MFA Painting, New York NY</li>
                <li>
                  2013-2015, New York University, Adjunct Faculty, New York NY,
                  https://nyu.edu, Painting 1 Professor, Admissions Supervisor
                </li>
                <li>
                  2022, New York Times, 30 Artists Under 30 by Jean Sullivan, ,
                  https://nytimes.com/notarealarticle
                </li>
                <li>2022, Fullbright Scholarship, , Berlin</li>
              </ul>
            </label>
          </div>
          <div className="w-full  flex flex-col sm:flex-row space-x-4">
            <div className="w-full h-36 sm:h-72 sm:w-3/6">
              <textarea
                id="#inputBox"
                name="cv"
                className="h-full w-full border-b-2 outline-hidden"
                placeholder="YYYY, Heading 1, Heading 2, City ST, https://google.com, Description 1, Desciption 2, Description 3"
                onChange={textHandler}
                style={{ resize: "none" }}
                value={text ? text : ""}
              ></textarea>
            </div>
            <div className="w-full sm:w-3/6">
              <CVGroup title={null} data={data} />
            </div>
          </div>
          <button type="submit" className="pill">
            Save
          </button>
          {unsaved ? (
            <span className="text-xs mx-4 tracking-widest italic text-indigo-600">
              Remember to save your changes before moving on to another category
              or exiting the window.
            </span>
          ) : null}
        </form>
        <form onSubmit={imgSubmitHandler}>
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
            onClick={(e) => destroyCVImage(e)}
          >
            Clear Image
          </button>
        </form>
      </div>
    </>
  );
};
export default CV;
