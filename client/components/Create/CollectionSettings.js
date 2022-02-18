import React from "react";
import { useState } from "react";
export default function CollectionSettings(props) {
  let [state, setState] = useState({
    title: props.collectionTitle,
    description: props.collectionDescription,
  });

  const changeHandler = (e) => {
    e.preventDefault();
    setState({ ...state, [e.target.name]: [e.target.value] });
  };

  //   const submitHandler = (e) => {
  //     e.preventDefault();
  //     dispatch(updateCollection(userId, collectionId, state));
  //   };

  return (
    <form className="flex flex-col my-5 font-light">
      <label htmlFor="title" className="text-gray-400">
        Collection Title: *{" "}
      </label>
      <input
        name="title"
        type="text"
        style={{ outline: "none" }}
        className="border-b-2 border-gray-200 mb-5 w-3/6 font-light"
        value={state.title}
        onChange={changeHandler}
        required
      ></input>
      <label htmlFor="description" className="text-gray-400">
        Description:
      </label>
      <textarea
        rows="10"
        cols="40"
        name="description"
        onChange={changeHandler}
        className="border-b-2"
        value={state.description}
        style={{ resize: "none", outline: "none" }}
        placeholder=""
      ></textarea>
      <div className="flex flex-row justify-between w-3/6">
        <button type="submit" className="pill">
          Save Changes
        </button>
        <button type="submit" className="pillDark hover:bg-red-700">
          Delete Collection
        </button>
      </div>
    </form>
  );
}
