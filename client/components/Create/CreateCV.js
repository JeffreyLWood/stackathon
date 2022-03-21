import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCVText } from "../../store/create";
import { useEffect, useState } from "react";
import { Navbar } from "../Navbar";
import { fetchUserData } from "../../store/user";
import CVGroup from "../Site/CVGroup";
const CV = (props) => {
  let user = useSelector((state) => state.user);

  let dispatch = useDispatch();

  useEffect(() => {
    user = dispatch(fetchUserData(props.match.params.username));
  }, []);

  let [text, setText] = useState("");

  let [header, setHeader] = useState("education");
  let [data, setData] = useState("");

  useEffect(() => {
    setText(user && user.cv ? user.cv.education : {});
    setData(user && user.cv ? user.cv.education.split("\n") : []);
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
  };

  let submitHandler = (evt) => {
    evt.preventDefault();
    // console.log(user.id, header, text);
    dispatch(updateCVText(user.id, header, text));
  };

  return (
    <>
      <Navbar user={user} />
      <div className="w-full min-h-screen justify-center bg-neutral-50 mt-20 p-10 flex">
        <form
          className="w-full min-h-screen space-y-10"
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
            <label htmlFor="header" className="my-2 flex flex-col">
              <span className=" mb-2 font-semibold">
                Columns must be separated by comma and in order:
              </span>
              <span className="text-lg mb-2">
                YYYY, Heading 1, Heading 2, Location, Link or Description 1,
                Description 2, Description 3
              </span>
              <span className="italic text-neutral-400">
                If there is a comma in your title, use double-comma. eg. "Me,,
                Myself,, and Irene" would be "Me, Myself, and Irene"
              </span>
              <span className="mb-2 italic text-neutral-400">
                eg. 2020, Columbia University, MFA Painting, New York NY
                <br />
                eg. 2013-2015, New York University, Adjunct Faculty New York NY,
                https://nyu.edu, Painting 1 Professor, Admissions Supervisor
              </span>
            </label>
          </div>
          <div className="w-full h-72 flex flex-row space-x-4">
            <textarea
              id="#inputBox"
              name="cv"
              className="h-auto w-3/6 border-b-2 outline-hidden"
              placeholder="YYYY, Heading 1, Heading 2, City ST, https://google.com, Description 1, Desciption 2, Description 3"
              onChange={textHandler}
              style={{ resize: "none" }}
              value={text ? text : ""}
            ></textarea>

            <div className="w-3/6">
              <CVGroup title={null} data={data} />
            </div>
          </div>
          <button type="submit" className="pill">
            Save
          </button>
        </form>
      </div>
    </>
  );
};
export default CV;
