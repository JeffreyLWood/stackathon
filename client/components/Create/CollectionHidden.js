import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { hiddenCollection, fetchCollection } from "../../store/create";
export default function CollectionHidden(props) {
  let collection = useSelector((state) => state.create.collection);

  const dispatch = useDispatch();

  let [hidden, setHidden] = useState(false);

  useEffect(() => {
    const load = async () => {
      collection = await dispatch(fetchCollection(props.userId, props.primary));
    };
    load();
    console.log("fire");
  }, [props.primary]);

  useEffect(() => {
    setHidden(collection?.hidden);
  }, [collection]);

  const hiddenHandler = async (e) => {
    e.preventDefault();
    hidden ? setHidden(false) : setHidden(true);
    console.log("hiddenhandler", hidden);
    dispatch(
      hiddenCollection(props.userId, props.primary, hidden ? false : true)
    );
  };
  console.log("collection?.hidden", collection?.hidden);
  return (
    <div>
      {hidden ? (
        <img
          onClick={(e) => hiddenHandler(e)}
          src={"../../../hiddenactive.png"}
          className="w-6  hover:cursor-pointer"
        />
      ) : (
        <img
          onClick={(e) => hiddenHandler(e)}
          src={"../../../hiddeninactive.png"}
          className="w-6  hover:cursor-pointer"
        />
      )}
    </div>
  );
}
