import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCVText } from "../../store/create";
import { useEffect, useState } from "react";

const CV = (props) => {
  let cv = useSelector((state) => state.user.cv);

  const dispatch = useDispatch();

  let [text, setText] = useState("");

  // useEffect(() => {

  //   cv && setText(cv[header]);
  // }, []);

  // cv && setText(cv[header]);
  let [header, setHeader] = useState("");

  let changeHandler = (evt) => {
    evt.preventDefault();
    // setHeader(evt.target.value);
    setText(cv[evt.target.value.toLowerCase()]);
    // [evt.target.name] = evt.target.value;
    setHeader(evt.target.value);
    console.log(evt.target.value, header);
  };

  let textHandler = (evt) => {
    evt.preventDefault();
    setText(evt.target.value);
  };

  let submitHandler = (evt) => {
    evt.preventDefault();
    console.log(props.user.id, header, text);

    dispatch(updateCVText(props.user.id, header.toLowerCase(), text));
  };

  return (
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
            <option>Education</option>
            <option>Solo Exhibitions</option>
            <option>Exhibition</option>
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
          className="w-full md:w-3/6 h-90vh border-b-2 outline-hidden"
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
