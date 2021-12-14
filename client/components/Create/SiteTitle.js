import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAboutText } from "../../store/create";
import { useEffect } from "react";
export default function SiteTitle() {
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
      <form className="space-x-5">
        <label htmlFor="title">Site Title</label>
        <input className="border-2" name="title" type="text"></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
