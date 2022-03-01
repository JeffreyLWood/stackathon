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

  useEffect(() => {
    const load = async () => {
      collection = await dispatch(
        fetchCollection(props.userId, props.collectionTitle)
      );
    };
    load();
    setState(collection);
  }, []);

  useEffect(() => {
    const load = async () => {
      collection = await dispatch(
        fetchCollection(props.userId, props.collectionTitle)
      );
    };
    load();
    setState(collection);
  }, [props.settings]);

  const changeHandler = (e) => {
    e.preventDefault();
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

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
      <label htmlFor="description" className="text-gray-400">
        Description:
      </label>
      <textarea
        rows="10"
        cols="40"
        name="description"
        onChange={changeHandler}
        className="border-b-2"
        value={state?.description || ""}
        style={{ resize: "none", outline: "none" }}
        placeholder=""
      ></textarea>
      <div className="flex flex-row justify-between w-3/6">
        <button type="submit" className="pill">
          Save Changes
        </button>
        <button
          type="button"
          onClick={deleteCollection}
          className="pillDark hover:bg-red-700"
          id="primary"
          value="Work"
        >
          Delete Collection
        </button>
      </div>
    </form>
  );
}
