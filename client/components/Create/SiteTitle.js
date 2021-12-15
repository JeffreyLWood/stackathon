import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTitleData } from "../../store/auth";
import { useEffect } from "react";
export default function SiteTitle(props) {
  let dispatch = useDispatch();
  console.log("site title props", props.user.username);
  let title = props.user.username;

  let changeHandler = (evt) => {
    evt.preventDefault();
    title = evt.target.value;
  };

  let submitHandler = (evt) => {
    evt.preventDefault();
    console.log("text", title);

    dispatch(updateTitleData(props.user.id, { title }));
  };
  return (
    <div>
      <form className="space-x-5" onSubmit={submitHandler}>
        <input
          className="border-2"
          name="title"
          type="text"
          onChange={changeHandler}
          placeholder={title}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
