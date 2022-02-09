import React from "react";
import { updateContactData } from "../../store/create";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar } from "../Navbar";
import { fetchUserData } from "../../store/user";
export default function CreateContact(props) {
  let user = useSelector((state) => state.user);

  let dispatch = useDispatch();
  let [state, setState] = useState({});

  useEffect(() => {
    user = dispatch(fetchUserData(props.match.params.username));
  }, []);

  useEffect(() => {
    setState(user?.contact || {});
  }, [user]);

  let changeHandler = (evt) => {
    evt.preventDefault();
    setState({ ...state, [evt.target.name]: evt.target.value });
  };

  let submitHandler = (evt) => {
    evt.preventDefault();

    dispatch(updateContactData(user.id, state));
  };

  return (
    <>
      <Navbar user={user} />

      <form
        className="contact w-full flex p-10 space-x-5"
        onSubmit={submitHandler}
      >
        <div className="w-full">
          <label htmlFor="text">Text:</label>
          <textarea
            className="border-2"
            rows="5"
            className="w-full"
            style={{ resize: "none" }}
            name="text"
            type="text"
            onChange={changeHandler}
            value={state?.text || ""}
          />
          <label htmlFor="email">Email *</label>
          <input
            required
            className="border-2"
            name="email"
            type="text"
            onChange={changeHandler}
            value={state?.email || ""}
          ></input>
          <label htmlFor="email">Phone</label>
          <input
            className="border-2"
            name="phone"
            type="tel"
            onChange={changeHandler}
            value={state?.phone || ""}
            placeholder={"000 123 4567"}
          ></input>
          <label htmlFor="email">Location</label>
          <input
            className="border-2"
            name="address"
            type="text"
            onChange={changeHandler}
            value={state?.address || ""}
          ></input>
        </div>
        <div className="w-full">
          <label htmlFor="socialMedia" className="mb-1">
            Social Media Links
          </label>
          <label htmlFor="instagram">Instagram</label>
          <input
            className="border-2"
            name="instagram"
            type="url"
            onChange={changeHandler}
            value={state?.instagram || ""}
            placeholder="https://wwww.instagram.com/"
          ></input>
          <label htmlFor="facebook">Facebook</label>
          <input
            className="border-2"
            name="facebook"
            type="url"
            onChange={changeHandler}
            placeholder="https://wwww.facebook.com/"
            value={state?.facebook || ""}
          ></input>
          <label htmlFor="twitter">Twitter</label>
          <input
            className="border-2"
            name="twitter"
            type="url"
            onChange={changeHandler}
            placeholder="https://wwww.twitter.com/"
            value={state?.twitter || ""}
          ></input>
          <label htmlFor="youtube">Youtube</label>
          <input
            className="border-2"
            name="youtube"
            type="url"
            onChange={changeHandler}
            placeholder="https://wwww.youtube.com/"
            value={state?.youtube || ""}
          ></input>
          <label htmlFor="linkedin">LinkedIn</label>
          <input
            className="border-2"
            name="linkedin"
            type="url"
            onChange={changeHandler}
            placeholder="https://wwww.linkedin.com/"
            value={state?.linkedin || ""}
          ></input>
          <label htmlFor="etsy">Etsy</label>
          <input
            className="border-2"
            name="etsy"
            type="url"
            onChange={changeHandler}
            placeholder="https://wwww.etsy.com/"
            value={state?.etsy || ""}
          ></input>
          <label htmlFor="pinterest">Pinterest</label>
          <input
            className="border-2"
            name="pinterest"
            type="url"
            onChange={changeHandler}
            placeholder="https://wwww.pinterest.com/"
            value={state?.pinterest || ""}
          ></input>
          <label htmlFor="tiktok">TikTok</label>
          <input
            className="border-2"
            name="tiktok"
            type="url"
            onChange={changeHandler}
            placeholder="https://wwww.tiktok.com/"
            value={state?.tiktok || ""}
          ></input>
          <div>
            <button type="submit" className="pill">
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
