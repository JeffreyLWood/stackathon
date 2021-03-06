import React from "react";
import { useState, useEffect } from "react";
import {
  fetchCollection,
  destroyCollection,
  updateCollectionData,
} from "../../store/create";
import { useSelector, useDispatch } from "react-redux";
export default function CollectionSettings(props) {
  let collection = useSelector((state) => state.create.collection);
  const dispatch = useDispatch();

  let [state, setState] = useState(collection);
  let [unique, setUnique] = useState(true);

  useEffect(() => {
    const load = async () => {
      collection = await dispatch(
        fetchCollection(props.userId, props.collectionTitle)
      );
    };
    load();
    setState(collection);
  }, []);

  const changeHandler = (e) => {
    e.preventDefault();
    setState({ ...state, [e.target.name]: e.target.value });
    setUnique(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let others = props.collections.filter(
      (collection) =>
        collection !== props.collectionTitle && collection !== "Hidden"
    );

    for (let i = 0; i < others.length; i++) {
      if (others[i] === state.title) {
        setUnique(false);
        return;
      }
    }
    if (state.title === "Hidden") {
      setUnique(false);
      return;
    }
    props.setPrimary(state.title);
    dispatch(updateCollectionData(props.userId, props.collectionTitle, state));
  };

  const deleteCollection = (e) => {
    e.preventDefault();
    props.changeHandler(e);
    dispatch(destroyCollection(props.userId, props.collectionTitle));
    props.setSettings(false);
  };

  return (
    <form className="flex flex-col my-5 font-light" onSubmit={submitHandler}>
      <label htmlFor="title" className="text-gray-400">
        Collection Title: *{" "}
        {!unique ? (
          <span className="text-sm italic text-indigo-600">
            Title must be unique
          </span>
        ) : null}
      </label>
      <input
        name="title"
        type="text"
        style={{ outline: "none" }}
        className="border-b-2 border-gray-200 mb-5 w-3/6 font-light"
        value={state?.title || ""}
        onChange={changeHandler}
        required
      ></input>
      <label htmlFor="subheading 1" className="text-gray-400">
        Subheading 1:
      </label>
      <input
        name="subheading 1"
        type="text"
        style={{ outline: "none" }}
        className="border-b-2 border-gray-200 mb-5 w-3/6 font-light"
        value={state?.subheading1 || ""}
        onChange={changeHandler}
      ></input>
      <label htmlFor="subheading 2" className="text-gray-400">
        Subheading 2:
      </label>
      <input
        name="subheading 2"
        type="text"
        style={{ outline: "none" }}
        className="border-b-2 border-gray-200 mb-5 w-3/6 font-light"
        value={state?.subheading2 || ""}
        onChange={changeHandler}
      ></input>
      <textarea
        rows="10"
        cols="40"
        name="description"
        onChange={changeHandler}
        className="border-b-2"
        value={state?.description || ""}
        style={{ resize: "none", outline: "none" }}
        placeholder="Description"
      ></textarea>
      <div className="flex flex-row justify-between w-3/6">
        {!unique ? (
          <button
            type="button"
            className="pill text-neutral-300 background-neutral-300"
          >
            Save Changes
          </button>
        ) : (
          <button type="submit" className="pill">
            Save Changes
          </button>
        )}
        <button
          type="button"
          onClick={deleteCollection}
          className="pillRed"
          id="primary"
          value="Work"
        >
          Delete Collection
        </button>
      </div>
    </form>
  );
}
