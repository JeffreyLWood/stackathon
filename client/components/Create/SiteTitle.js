import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTitleData } from "../../store/create";
import { useEffect } from "react";
import { fetchUserData } from "../../store/user";
export default function SiteTitle(props) {
  let dispatch = useDispatch();
  let title = useSelector((state) => state.auth.siteTitle);
  // let title = `${props.user.siteTitle}`;
  console.log("test", title);
  let changeHandler = (evt) => {
    evt.preventDefault();
    title = evt.target.value;
  };

  let submitHandler = (evt) => {
    evt.preventDefault();
    console.log("text", title);

    dispatch(updateTitleData(props.user.id, { title }));
    dispatch(fetchUserData(props.user.username));
  };
  return (
    <div className="h-full">
      <form className="flex flex-col" onSubmit={submitHandler}>
        <div>
          <input
            className="p-1 border-2 w-2/6 subHeader"
            name="title"
            type="text"
            onChange={changeHandler}
            placeholder={title}
          />
        </div>
        <div>
          <button
            type="submit"
            className="my-4 p-2 border-2 rounded-md subHeader"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
