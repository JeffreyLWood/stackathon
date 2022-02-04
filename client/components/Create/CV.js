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
    <div className="w-full flex">
      <form className="w-full" onSubmit={submitHandler}>
        <div>
          <label htmlFor="header">Category</label>
          <select className="border-2" name="header" onChange={changeHandler}>
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
        <div className="flex flex-row">
          {/* <label htmlFor="from">From</label> */}
          <span className="flex mx-2 items-center">
            <img src="/add.png" className="block w-6" />
          </span>
          <input
            className="border-b-2 my-2 mx-1 w-1/12"
            name="from"
            type="text"
            placeholder="from YYYY*"
            onChange={changeHandler}
          ></input>
          {/* <label htmlFor="to">To</label> */}
          <input
            className="border-b-2 my-2 mx-1 w-1/12"
            name="to"
            type="text"
            placeholder="to YYYY"
            onChange={changeHandler}
          ></input>
          {/* <label htmlFor="title">Title</label> */}
          <input
            className="border-b-2 my-2 mx-1 w-3/12"
            name="title"
            type="text"
            placeholder="Title *"
            onChange={changeHandler}
          ></input>
          {/* <label htmlFor="description">Description</label> */}
          <input
            className="border-b-2 my-2 mx-1 w-4/12"
            cols="30"
            name="description"
            type="text"
            placeholder="description"
            onChange={changeHandler}
            style={{ resize: "none" }}
          ></input>
          <input
            className="border-b-2 my-2 mx-1 w-2/12"
            name="address"
            type="text"
            placeholder="address"
            onChange={changeHandler}
          ></input>
          <span className="flex mx-2 items-center">
            <img src="/icons8-close-16.png" className="block" />
          </span>
        </div>
        <button type="submit" className="pill">
          Submit
        </button>
      </form>
    </div>
  );
};
export default CV;
