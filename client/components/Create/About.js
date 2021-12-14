import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAboutText } from "../../store/create";
import { useEffect } from "react";

const About = (props) => {
  let dispatch = useDispatch();

  let text = "";

  let changeHandler = (evt) => {
    evt.preventDefault();
    text = evt.target.value;
  };

  let submitHandler = (evt) => {
    evt.preventDefault();
    console.log("text", text);

    dispatch(updateAboutText(props.user.id, { text }));
    text = "";
  };

  return (
    <div>
      <form className="space-x-5" onSubmit={submitHandler}>
        <label htmlFor="about">About</label>
        <input
          className="border-2 w-3/6"
          name="about"
          type="text"
          onChange={changeHandler}
        />
        {text}

        <button id="about" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
export default About;
