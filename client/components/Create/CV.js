import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCVText } from "../../store/create";
import { useEffect } from "react";

const CV = (props) => {
  let dispatch = useDispatch();

  let fields = {
    header: "",
    title: "",
    description: "",
    from: "",
    to: "",
  };

  let changeHandler = (evt) => {
    evt.preventDefault();
    fields[evt.target.name] = evt.target.value;
  };

  let submitHandler = (evt) => {
    evt.preventDefault();
    dispatch(updateCVText(props.user.id, fields));
    fields = {
      header: "",
      title: "",
      description: "",
      from: "",
      to: "",
    };
  };

  return (
    <div>
      <form className="space-x-5" onSubmit={submitHandler}>
        <label htmlFor="header">Header</label>
        <input
          className="border-2"
          name="header"
          type="text"
          onChange={changeHandler}
        ></input>
        <label htmlFor="title">Title</label>
        <input
          className="border-2"
          name="title"
          type="text"
          onChange={changeHandler}
        ></input>
        <label htmlFor="description">Description</label>
        <input
          className="border-2"
          name="description"
          type="text"
          onChange={changeHandler}
        ></input>
        <label htmlFor="from">From</label>
        <input
          className="border-2"
          name="from"
          type="text"
          onChange={changeHandler}
        ></input>
        <label htmlFor="to">To</label>
        <input
          className="border-2"
          name="to"
          type="text"
          onChange={changeHandler}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default CV;
