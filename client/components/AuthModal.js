import React from "react";
import { Login, Signup } from "./Authform";
export default function AuthModal(props) {
  const closeHandler = () => {
    props.setShow(false);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header flex justify-between">
          <h2>{props.displayName}</h2>
          <h2 onClick={closeHandler}>
            <img src="/icons8-close-16.png"></img>
          </h2>
        </div>
        {/* Modal Body */}
        <div className="h-full">
          {props.displayName === "Signup" ? <Signup /> : <Login />}
        </div>
        {/* Modal Footer */}
        <div className="modal-footer">New Collection</div>
      </div>
    </div>
  );
}
