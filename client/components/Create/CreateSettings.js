import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTitleData } from "../../store/create";
import { useEffect, useState } from "react";
import { fetchUserData, changeUsername } from "../../store/user";

import { destroyAccount } from "../../store/auth";
import { Navbar } from "../Navbar";
import { logout } from "../../store";
export default function CreateSettings(props) {
  let user = useSelector((state) => state.auth);

  let dispatch = useDispatch();

  useEffect(() => {
    user = dispatch(fetchUserData(props.match.params.username));
  }, []);

  let [title, setTitle] = useState("");

  let [username, setUsername] = useState(user?.username);

  useEffect(() => {
    user.siteTitle
      ? setTitle(user.siteTitle)
      : setTitle(`${user.firstName} ${user.lastName}`);
    setUsername(user?.username);
  }, [user]);
  console.log(user);
  let changeHandler = (evt) => {
    evt.preventDefault();
    setTitle(evt.target.value);
  };

  let changeHandlerUsername = (evt) => {
    evt.preventDefault();
    setInvalid(false);
    setUsername(evt.target.value);
  };

  let submitHandler = (evt) => {
    evt.preventDefault();
    dispatch(updateTitleData(user.id, { title }));
  };

  let [invalid, setInvalid] = useState(false);

  let updateUsername = (evt) => {
    evt.preventDefault();
    if (/[^a-zA-Z]/.test(username)) {
      setInvalid(true);
      return;
    }
    dispatch(changeUsername(user, username)).then(dispatch(logout()));
  };

  const deleteHandler = () => {
    dispatch(destroyAccount(user.id));
  };

  let [customDomain, setCustomDomain] = useState("");

  const customDomainChangeHandler = (e) => {
    e.preventDefault();
    setCustomDomain(e.target.value);
  };

  const submitCustomDomain = () => {
    const res = await fetch("/heroku/apps", {
      method: "GET",
      // body: JSON.stringify({
      //   token: googleData.tokenId,
      // }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
  };

  //  https://api.heroku.com/apps/$APP_ID_OR_NAME/domains/$DOMAIN_ID_OR_HOSTNAME
  //    # Store the CNAME value for this custom domain from Heroku in your database
  //   @account.update(:heroku_dns_target => @domain["cname"])
  // # redirect back to the previous form once completed
  //   redirect_back(fallback_location: root_path, notice: 'Custom domain saved.')

  return (
    <>
      <Navbar user={user} />
      <div className="h-full mt-10 p-10 space-y-8">
        <form className="flex flex-col space-y-4" onSubmit={submitHandler}>
          <label htmlFor="name">
            Your full name as it will appear on your site
          </label>
          <div>
            <input
              className="p-1 border-2 w-2/6"
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
        <form
          className="flex flex-col w-full sm:w-3/6  space-y-4"
          onSubmit={updateUsername}
        >
          <labe htmlFor="username" />
          Warning: Change your username only when necessary. You will be logged
          out and will need to log in again with your new username. This will
          change your url so remember to update your records to
          www.selected-work.com/newusername
          <div className="flex flex-row items-baseline">
            <label htmlFor="username">www.selected-work.com/</label>
            <div>
              <input
                className="p-1 border-2 w-full"
                name="username"
                type="text"
                onChange={changeHandlerUsername}
                value={username}
              />
            </div>
          </div>
          <div>
            <button type="submit" className="pill my-2">
              Submit
            </button>
            {invalid
              ? "Invalid username. Only a-z letters are allowed, no spaces or special characters"
              : null}
          </div>
        </form>
        <form onSubmit={submitCustomDomain}>
          <label htmlFor="domain">Use a Custom Domain</label>
          <input
            type="text"
            value={customDomain}
            onChange={(e) => customDomainChangeHandler(e)}
          ></input>
          <button type="submit">Submit</button>
        </form>
        <div>
          <form onSubmit={deleteHandler}>
            <label htmlFor="delete">
              Delete Your Account. This cannot be undone.
            </label>
            <button
              type="submit"
              className="pill hover:bg-red-500 hover:border-red-500"
            >
              Delete Account
            </button>
          </form>
        </div>
      </div>
    </>
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
