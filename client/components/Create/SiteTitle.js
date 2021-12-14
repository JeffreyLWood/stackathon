import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTitleData } from "../../store/auth";
import { useEffect } from "react";
export default function SiteTitle(props) {
  let dispatch = useDispatch();

  let title = "";

  let changeHandler = (evt) => {
    evt.preventDefault();
    title = evt.target.value;
  };

  let submitHandler = (evt) => {
    evt.preventDefault();
    console.log("text", title);

    dispatch(updateTitleData(props.user.id, { title }));
    title = "";
  };
  return (
    <div>
      <form className="space-x-5" onSubmit={submitHandler}>
        <label htmlFor="title">Site Title</label>
        <input
          className="border-2"
          name="title"
          type="text"
          onChange={changeHandler}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
