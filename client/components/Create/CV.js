import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCVText } from "../../store/create";
import { useEffect, useState } from "react";

const CV = (props) => {
  let cv = useSelector((state) => state.user.cv);

  let [header, setHeader] = useState("");
  const dispatch = useDispatch();
  let defaultVal = cv && cv.exhibition;

  let [text, setText] = useState(defaultVal);

  useEffect(() => {
    setText(defaultVal);
  }, [cv]);

  let changeHandler = (evt) => {
    evt.preventDefault();
    [evt.target.name] = evt.target.value;

    setHeader(evt.target.value);
  };
  let textHandler = (evt) => {
    setText(evt.target.value);
  };
  let submitHandler = (evt) => {
    evt.preventDefault();
    console.log(props.user.id, header, text);
    dispatch(updateCVText(props.user.id, header, text));
  };
  console.log(cv);
  return (
    <div className="w-full flex">
      <form className="w-full" onSubmit={submitHandler}>
        <div>
          <label htmlFor="header">Category</label>
          <select
            className="border-2"
            name="header"
            onChange={changeHandler}
            value={header}
          >
            <option>Education</option>
            <option>Solo Exhibitions</option>
            <option>Group Exhibitions</option>
            <option>Teaching</option>
            <option>Related Experience</option>
            <option>Grants / Awards</option>
            <option>Residencies</option>
            <option>Press / Publication</option>
          </select>
        </div>
        <label htmlFor="cv">
          (YYYY)* (YYYY), Location *, Title *, Address, Link (https://www..)
        </label>
        <textarea
          name="cv"
          className="w-full h-full border-b-2 outline-hidden"
          placeholder="(YYYY)* (YYYY), Location *, Title *, Address, Link (https://www..)"
          onChange={textHandler}
          value={text}
        ></textarea>

        <button type="submit" className="pill">
          Submit
        </button>
      </form>
    </div>
  );
};
export default CV;
