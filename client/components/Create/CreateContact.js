import React from "react";
import { updateContactData } from "../../store/create";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar } from "../Navbar";
export default function Contact(props) {
  let contact = useSelector((state) => state.user.contact);
  let user = props.user;
  let contactData = user && user.contact;

  let dispatch = useDispatch();
  let [state, setState] = useState({});

  useEffect(() => {
    setState(contact);
  }, [contact]);

  let changeHandler = (evt) => {
    evt.preventDefault();
    setState({ ...state, [evt.target.name]: evt.target.value });
  };

  let submitHandler = (evt) => {
    evt.preventDefault();
    dispatch(updateContactData(props.user.id, state));
  };

  return (
    <>
      <Navbar user={user} />
      <div className="pb-10  w-full pr-10">
        <form
          className="contact flex flex-col  justify-start md:w-3/6"
          onSubmit={submitHandler}
        >
          <label htmlFor="text">Text:</label>
          <textarea
            className="border-2"
            rows="5"
            className="w-full"
            style={{ resize: "none" }}
            name="text"
            type="text"
            onChange={changeHandler}
            value={state ? state.text : ""}
          />
          <label htmlFor="email">Email *</label>
          <input
            required
            className="border-2"
            name="email"
            type="text"
            onChange={changeHandler}
            value={state ? state.email : ""}
          ></input>
          <label htmlFor="email">Phone</label>
          <input
            className="border-2"
            name="phone"
            type="tel"
            onChange={changeHandler}
            value={state ? state.phone : ""}
            placeholder={"000 123 4567"}
          ></input>
          <label htmlFor="email">Location</label>
          <input
            className="border-2"
            name="address"
            type="text"
            onChange={changeHandler}
            value={state ? state.address : ""}
          ></input>
          <label htmlFor="socialMedia" className="mb-1">
            Social Media Links
          </label>
          <label htmlFor="instagram">Instagram</label>
          <input
            className="border-2"
            name="instagram"
            type="url"
            onChange={changeHandler}
            value={state ? state.instagram : ""}
            placeholder="https://wwww.instagram.com/"
          ></input>
          <label htmlFor="facebook">Facebook</label>
          <input
            className="border-2"
            name="facebook"
            type="url"
            onChange={changeHandler}
            placeholder="https://wwww.facebook.com/"
            value={state ? state.facebook : ""}
          ></input>
          <label htmlFor="twitter">Twitter</label>
          <input
            className="border-2"
            name="twitter"
            type="url"
            onChange={changeHandler}
            placeholder="https://wwww.twitter.com/"
            value={state ? state.twitter : ""}
          ></input>
          <label htmlFor="youtube">Youtube</label>
          <input
            className="border-2"
            name="youtube"
            type="url"
            onChange={changeHandler}
            placeholder="https://wwww.youtube.com/"
            value={state ? state.youtube : ""}
          ></input>
          <label htmlFor="linkedin">LinkedIn</label>
          <input
            className="border-2"
            name="linkedin"
            type="url"
            onChange={changeHandler}
            placeholder="https://wwww.linkedin.com/"
            value={state ? state.linkedin : ""}
          ></input>
          <label htmlFor="etsy">Etsy</label>
          <input
            className="border-2"
            name="etsy"
            type="url"
            onChange={changeHandler}
            placeholder="https://wwww.etsy.com/"
            value={state ? state.etsy : ""}
          ></input>
          <label htmlFor="pinterest">Pinterest</label>
          <input
            className="border-2"
            name="pinterest"
            type="url"
            onChange={changeHandler}
            placeholder="https://wwww.pinterest.com/"
            value={state ? state.pinterest : ""}
          ></input>
          <label htmlFor="tiktok">TikTok</label>
          <input
            className="border-2"
            name="tiktok"
            type="url"
            onChange={changeHandler}
            placeholder="https://wwww.tiktok.com/"
            value={state ? state.tiktok : ""}
          ></input>
          <div>
            <button type="submit" className="pill">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
