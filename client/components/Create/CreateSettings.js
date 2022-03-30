import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTitleData } from "../../store/create";
import { useEffect, useState } from "react";
import { fetchUserData, changeUsername } from "../../store/user";

import {
  destroyAccount,
  useCustomDomain,
  deleteCustomDomain,
} from "../../store/auth";
import { Navbar } from "../Navbar";
import { logout } from "../../store";
export default function CreateSettings(props) {
  let user = useSelector((state) => state.auth);

  let dispatch = useDispatch();

  useEffect(() => {
    // user = dispatch(fetchUserData(props.match.params.username));
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
    if (/[^a-z0-9]/.test(username)) {
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
    : "Enter your custom domain eg. www.yourname.com";

  let [cname, setCname] = useState("");

  useEffect(() => {
    user.domain ? setCustomDomain(user.domain) : null;
    user.cname ? setCustomDomain(user.cname) : null;
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
      user.domain
        ? dispatch(deleteCustomDomain(user))
        : dispatch(useCustomDomain(user, customDomain));
    } catch (error) {
      console.log(error);
    }
  };
  let submitDomainButton = user.domain
    ? "pill text-white border-red-600 bg-red-600 my-4"
    : "pill my-4";
  let submitDomainButtonText = user.domain ? "Delete Record" : "Add Domain";
  return (
    <>
      <Navbar user={user} />
      <div className="h-full mt-20">
        <section className="w-full bg-neutral-50 space-y-4 flex flex-col p-10">
          <span>
            <label htmlFor="title" className="text-xl">
              Site Title
            </label>
          </span>
          <form
            name="title"
            className="flex flex-col w-full sm:w-3/6  space-y-4"
            onSubmit={submitHandler}
          >
            <label htmlFor="name" className="">
              Your full name as it will appear on your site
            </label>

            <input
              className="p-1 border-2"
              name="name"
              type="text"
              onChange={changeHandler}
              value={title}
            />
            <div>
              <button type="submit" className="pill my-4">
                Submit
              </button>
            </div>
          </form>
        </section>

        <section className="w-full space-y-4 flex-col  p-10 flex">
          <span>
            <label htmlFor="url" className="mb-2 text-xl">
              URL
            </label>
          </span>
          <form
            name="url"
            className="flex flex-col w-full sm:w-3/6  space-y-4"
            onSubmit={updateUsername}
          >
            <label htmlFor="urlinput" />
            Warning: Change your url path only when necessary. You will be
            logged out and need to log in again. Remember to update your records
            to www.selected-work.com/newusername
            <div className="flex flex-row items-baseline">
              <label htmlFor="username">www.selected-work.com/</label>
              <div>
                <input
                  className="p-1 border-2 w-full"
                  name="urlinput"
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
        </section>

        <section className="w-full bg-neutral-50 flex-col space-y-4 p-10 flex">
          <span>
            <label htmlFor="customdomains" className="mb-2 text-xl">
              Custom Domains
            </label>
          </span>
          <form
            name="customdomains"
            onSubmit={submitCustomDomain}
            className="flex flex-row space-x-6 "
          >
            <span>
              <label htmlFor="domain" className="my-4">
                {message}
              </label>

              <input
                type="text"
                className="w-full my-4"
                value={customDomain}
                onChange={(e) => customDomainChangeHandler(e)}
                required={true}
              ></input>

              <button type="submit" className={submitDomainButton}>
                {submitDomainButtonText}
              </button>
            </span>
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
                  6. Select TTL or Time To Live if it is displayed of your
                  desired time until the domain name points to your
                  Selected-Work site.
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
        </section>

        <section className="w-full flex-col space-y-4 p-10 flex">
          <span>
            <label htmlFor="delete" className="mb-2 text-xl">
              Delete Account
            </label>
          </span>

          <form
            onSubmit={deleteHandler}
            className="flex-col w-full sm:w-3/6 min-h-72 space-y-4"
          >
            <label htmlFor="delete">
              Delete Your Account. This cannot be undone.
            </label>
            <div>
              <button
                type="submit"
                className="pill hover:bg-red-500 hover:border-red-500"
              >
                Delete Account
              </button>
            </div>
          </form>
        </section>
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
