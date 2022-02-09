import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCVText } from "../../store/create";
import { useEffect, useState } from "react";
import { Navbar } from "../Navbar";
const CV = (props) => {
  let user = useSelector((state) => state.user);
  let cv = useSelector((state) => state.user.cv);

  const dispatch = useDispatch();

  let [text, setText] = useState("");

  let [header, setHeader] = useState("education");

  let changeHandler = async (evt) => {
    evt.preventDefault();
    setHeader(evt.target.value);
    setText(cv[evt.target.value]);
    [evt.target.name] = evt.target.value;
  };

  let textHandler = (evt) => {
    evt.preventDefault();
    setText(evt.target.value);
  };

  let submitHandler = (evt) => {
    evt.preventDefault();
    dispatch(updateCVText(props.user.id, header, text));
  };

  return (
    <>
      <Navbar user={user} />
      <div className="w-full flex">
        <form className="w-full" onSubmit={submitHandler}>
          <div>
            <label htmlFor="header">Category</label>
            <select
              className="border-2"
              id="header"
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
          </div>
          <label htmlFor="cv">
            {/* (YYYY)* (YYYY), Heading 1 *, Heading 2, City ST, Link (https://www..) */}
            eg. 2020, Columbia University, MFA Painting, New York NY
          </label>
          <textarea
            name="cv"
            className="w-full md:w-5/6 h-full border-b-2 outline-hidden"
            placeholder="(YYYY)* (YYYY), Heading 1 *, Heading 2, City ST, Link (https://www..)"
            onChange={textHandler}
            value={text}
          ></textarea>

          <button type="submit" className="pill">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
export default CV;
