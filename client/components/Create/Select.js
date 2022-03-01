import React from "react";

export default function Select(props) {
  return (
    <>
      <span className="text-gray-400">Collection: </span>
      {props.settings ? (
        <select
          id={props.id}
          className="p-2"
          onChange={props.changeHandler}
          value={props.collectionTitle}
          disabled
        >
          {props &&
            props?.collections
              .filter((collection) => {
                if (props.id === "primary") {
                  return collection !== props.secondary;
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
      ) : (
        <select
          id={props.id}
          className="p-2"
          onChange={props.changeHandler}
          value={props.collectionTitle}
        >
          {props &&
            props?.collections
              .filter((collection) => {
                if (props.id === "primary") {
                  return collection !== props.secondary;
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
    </>
  );
}
