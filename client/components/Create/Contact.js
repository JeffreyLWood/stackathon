import React from "react";
import { updateContactData } from "../../store/create";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Contact(props) {
  let dispatch = useDispatch();
  let contact = useSelector((state) => state.user.contact);
  let [state, setState] = useState(contact);

  useEffect(() => {
    setState(contact);
  }, [contact]);

  console.log(contact);

  let changeHandler = (evt) => {
    evt.preventDefault();
    setState({ ...state, [evt.target.name]: evt.target.value });
  };

  let submitHandler = (evt) => {
    evt.preventDefault();
    dispatch(updateContactData(props.user.id, state));
  };
  if (!state) {
    return null;
  } else {
    return (
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
            value={state.text}
          />
          <label htmlFor="email">Email *</label>
          <input
            required
            className="border-2"
            name="email"
            type="text"
            onChange={changeHandler}
            value={state.email}
          ></input>
          <label htmlFor="email">Phone</label>
          <input
            className="border-2"
            name="phone"
            type="tel"
            onChange={changeHandler}
            value={state.phone}
          ></input>
          <label htmlFor="email">Address</label>
          <input
            className="border-2"
            name="address"
            type="text"
            onChange={changeHandler}
            value={state.address}
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
            value={state.instagram}
          ></input>
          <label htmlFor="facebook">Facebook</label>
          <input
            className="border-2"
            name="facebook"
            type="url"
            onChange={changeHandler}
            value={state.facebook}
          ></input>
          <label htmlFor="twitter">Twitter</label>
          <input
            className="border-2"
            name="twitter"
            type="url"
            onChange={changeHandler}
            value={state.twitter}
          ></input>
          <label htmlFor="youtube">Youtube</label>
          <input
            className="border-2"
            name="youtube"
            type="url"
            onChange={changeHandler}
            value={state.youtube}
          ></input>
          <label htmlFor="linkedin">LinkedIn</label>
          <input
            className="border-2"
            name="linkedin"
            type="url"
            onChange={changeHandler}
            value={state.linkedin}
          ></input>
          <label htmlFor="etsy">Etsy</label>
          <input
            className="border-2"
            name="etsy"
            type="url"
            onChange={changeHandler}
            value={state.etsy}
          ></input>
          <label htmlFor="pinterest">Pinterest</label>
          <input
            className="border-2"
            name="pinterest"
            type="url"
            onChange={changeHandler}
            value={state.pinterest}
          ></input>
          <label htmlFor="tiktok">TikTok</label>
          <input
            className="border-2"
            name="tiktok"
            type="url"
            onChange={changeHandler}
            value={state.tiktok}
          ></input>
          <div>
            <button type="submit" className="pill">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    );
  }
}
