import React from "react";

export default function CollectionModal() {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header flex justify-between">
          <h2>Collections</h2>
          <h2 onClick={closeHandler}>
            <img src="/icons8-close-16.png"></img>
          </h2>
        </div>
        {/* Modal Body */}
        <div className="h-full"></div>
        {/* Modal Footer */}
        <div className="modal-footer">New Collection</div>
      </div>
    </div>
  );
}
