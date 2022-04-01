import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllWork, fetchCollection } from "../../store/create";
import { useSelector } from "react-redux";

export default function Select(props) {
  let worksData = useSelector((state) => state.create.collections);
  let collection = useSelector((state) => state.create.collection);
  let userId = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();

  useEffect(() => {
    worksData = dispatch(fetchAllWork(userId));
  }, []);

  //   useEffect(() => {
  //     collection = dispatch(fetchCollection(userId, props.collectionTitle));
  //   }, []); //?

  useEffect(() => {
    try {
      collection = dispatch(fetchCollection(userId, props.collectionTitle));
    } catch (error) {
      console.log(error, "Select Component");
    }
  }, [props.settings]); //?

  // Load collection headings to pass to snapshot views.
  // These allow users to select from a list of their collections.
  let collections = [];
  // Loop through collections, add to the array if not already added. Passed as props to the snapshots
  const loadCollections = () => {
    for (let i = 0; i < worksData.length; i++) {
      if (worksData[i].title !== null) collections.push(worksData[i].title);
    }
  };

  worksData && loadCollections();
  return (
    <span>
      {props.settings ? (
        <select
          id={props.id}
          className="p-2"
          onChange={props.changeHandler}
          value={props.collectionTitle}
          disabled
        >
          <option>{props.collectionTitle}</option>
        </select>
      ) : (
        <select
          id={props.id}
          className="p-2"
          onChange={props.changeHandler}
          value={props.collectionTitle}
        >
          {collections &&
            collections
              .filter((collection) => {
                if (props.id === "primary") {
                  return (
                    collection !== props.secondary && collection !== "Hidden"
                  );
                } else {
                  return collection !== props.primary;
                }
              })
              .map((heading, idx) => (
                <option
                  key={idx}
                  onChange={props.changeHandler}
                  value={heading}
                  id={props.id}
                >
                  {heading}
                </option>
              ))}
        </select>
      )}
    </span>
  );
}
