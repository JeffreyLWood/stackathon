import React from "react";
import { updateContactData } from "../../store/create";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Contact(props) {
  let dispatch = useDispatch();

  let fields = {
    text: "",
    email: "",
    socialMedia: "",
  };

  let changeHandler = (evt) => {
    evt.preventDefault();
    fields[evt.target.name] = evt.target.value;
  };

  let submitHandler = (evt) => {
    evt.preventDefault();
    dispatch(updateContactData(props.user.id, fields));
    fields = {
      text: "",
      email: "",
      socialMedia: "",
    };
  };
  return (
    <div>
      <form className="space-x-5" onSubmit={submitHandler}>
        <label htmlFor="text">Text</label>
        <input
          className="border-2"
          name="text"
          type="text"
          onChange={changeHandler}
        ></input>
        <label htmlFor="email">Email</label>
        <input
          className="border-2"
          name="email"
          type="text"
          onChange={changeHandler}
        ></input>
        <label htmlFor="socialMedia">Social Media</label>
        <input
          className="border-2"
          name="socialMedia"
          type="text"
          onChange={changeHandler}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
