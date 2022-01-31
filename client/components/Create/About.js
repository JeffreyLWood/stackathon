import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAboutText } from "../../store/create";
import { useEffect, useState } from "react";
import { fetchUserData } from "../../store/user";
const About = (props) => {
  let aboutData = props.user.about;

  let dispatch = useDispatch();

  let text = aboutData && aboutData.text;

  let [aboutText, setAboutText] = useState("");

  useEffect(() => {
    setAboutText(text);
  }, [text]);

  let changeHandler = (evt) => {
    evt.preventDefault();
    setAboutText(evt.target.value);
  };

  let submitHandler = (evt) => {
    evt.preventDefault();
    dispatch(updateAboutText(props.user.id, { aboutText }));
    dispatch(fetchUserData(props.user.userName));
  };

  return (
    <form className="space-x-5" onSubmit={submitHandler}>
      <div>
        <textarea
          rows="15"
          cols="50"
          className="border-2 w-4/6 p-2"
          name="about"
          type="text"
          onChange={changeHandler}
          value={aboutText}
        />
      </div>
      <div>
        <button className="pill my-2" id="about" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};
export default About;
