import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTitleData } from "../../store/create";
import { useEffect, useState } from "react";
import { fetchUserData, changeUsername } from "../../store/user";

import { destroyAccount, useCustomDomain } from "../../store/auth";
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

  let [customDomain, setCustomDomain] = useState(user.cname || "");
  let message = user.cname
    ? `Your Cname record for ${user.domain} is:`
    : "Enter your custom domain eg. yourname.com";

  let [cname, setCname] = useState("");
  let [disabled, setDisabled] = useState("false");
  useEffect(() => {
    user.domain ? setCustomDomain(user.domain) : null;
    user.cname ? setCname(user.cname) : null;
    user.cname ? setDisabled("true") : setDisabled("false");
  }, []);

  const customDomainChangeHandler = (e) => {
    e.preventDefault();
    if (user.cname) {
      return;
    }
    setCustomDomain(e.target.value);
  };

  const submitCustomDomain = async () => {
    try {
      dispatch(useCustomDomain(user, customDomain));
    } catch (error) {
      console.log(error);
    }
  };

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
          <label htmlFor="username" />
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

        <form
          name="customdomains"
          onSubmit={submitCustomDomain}
          className="w-3/6 bg-neutral-50 p-5 flex flex-col space-y-4"
        >
          <label htmlFor="customdomains" className="text-2xl" />
          Custom Domains
          <span>
            <label htmlFor="domain">{message}</label>
          </span>
          <span>
            <input
              type="text"
              className="w-full"
              value={customDomain}
              onChange={(e) => customDomainChangeHandler(e)}
              required="true"
            ></input>
          </span>
          <button type="submit" disabled={disabled}>
            Submit
          </button>
          <div className="space-y-4">
            <p> Using Custom Domains:</p>
            <ul className="mb-4">
              <li>
                1. Go to your web hosting service settings (eg. Bluehost,
                Godaddy)
              </li>
              <li>2. Go to DNS settings</li>
              <li>
                3. Enter or edit your CNAME record associated with your domain
                name
              </li>
              <li> 4. Copy and paste your Cname record from above.</li>
              <li> 5. Enter a host record of "www" (no quotes).</li>
              <li>
                {" "}
                6. Select TTL or Time To Live if it is displayed of your desired
                time until the domain name points to your Selected-Work site.
              </li>
              <li> 7. Save </li>
            </ul>
            <p>
              Changing a Cname record can take between a few minutes and a few
              hours. Check back again by entering your domain url in your
              browser and refresh the page.
            </p>
          </div>
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
