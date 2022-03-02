import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { hiddenCollection, fetchCollection } from "../../store/create";
export default function CollectionHidden(props) {
  let collection = useSelector((state) => state.create.collection);

  const dispatch = useDispatch();

  let [hidden, setHidden] = useState(collection?.hidden);

  useEffect(() => {
    collection = dispatch(fetchCollection(props.userId, props.collectionTitle));
    setHidden(collection.hidden);
  }, [props.primary]);

  const hiddenHandler = (e) => {
    e.preventDefault();
    setHidden(hidden ? false : true);
    dispatch(hiddenCollection(props.userId, props.collectionTitle, hidden));
  };

  return (
    <div>
      <img
        onClick={(e) => hiddenHandler(e)}
        src={
          hidden ? "../../../hiddenactive.png" : "../../../hiddeninactive.png"
        }
        className="w-6  hover:cursor-pointer"
      />
    </div>
  );
}
