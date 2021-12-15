import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAboutText } from "../../store/create";
import { useEffect } from "react";

export default function Work(props) {
  let dispatch = useDispatch();

  let changeHandler = (evt) => {
    evt.preventDefault();
  };

  let submitHandler = (evt) => {
    evt.preventDefault();
  };
  return (
    <div>
      <form className="space-x-5">
        <input className="border-2" name="work" type="text"></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
