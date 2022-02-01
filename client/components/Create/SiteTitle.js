import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTitleData } from "../../store/create";
import { useEffect, useState } from "react";
import { fetchUserData } from "../../store/user";
export default function SiteTitle(props) {
  let dispatch = useDispatch();
  let titleData = useSelector((state) => state.auth.siteTitle);
  let [title, setTitle] = useState(titleData);

  let changeHandler = (evt) => {
    evt.preventDefault();
    setTitle(evt.target.value);
  };

  let submitHandler = (evt) => {
    evt.preventDefault();
    dispatch(updateTitleData(props.user.id, { title }));
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
            value={title}
          />
        </div>
        <div>
          <button type="submit" className="pill my-2">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

// import { useDispatch, useSelector } from "react-redux";
// import { updateTitleData } from "../../store/create";
// import { useEffect, useState } from "react";
// import { fetchUserData } from "../../store/user";

// export default function SiteTitle(props) {
//   let dispatch = useDispatch();
//   let titleData = useSelector((state) => state.user.siteTitle);
//   let [user, setUser] = useState(props.user);
//   let [title, setTitle] = useState(props.user.siteTitle);

//   let changeHandler = (evt) => {
//     evt.preventDefault();
//     setTitle(evt.target.value);
//   };

//   useEffect(() => {
//     dispatch(fetchUserData(props.user.username));
//   }, [title]);

//   let submitHandler = (evt) => {
//     evt.preventDefault();
//     console.log("text", title);

//     dispatch(updateTitleData(props.user.id, { title }));
//     dispatch(fetchUserData(props.user.username));
//   };
//   return (
//     <form className="flex flex-row" onSubmit={submitHandler}>
//       <input
//         className="mx-2 siteTitle border-2 border-hidden hover:border-solid border-blue-300 "
//         name="title"
//         type="text"
//         onChange={changeHandler}
//         value={title}
//       />

//       <div>
//         <button type="submit" className=""></button>
//       </div>
//     </form>
//   );
// }
