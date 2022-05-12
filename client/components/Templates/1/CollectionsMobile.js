import React from "react";
import history from "../../../history";
export default function CollectionsMobile(props) {
  const mobileCollectionClickHandler = (e, collection) => {
    e.preventDefault();

    let destination = `${props.url}/work/${collection.title}`;
    props.toggleMenu();
    props.fadeOut();

    setTimeout(() => {
      history.push(destination);
    }, 1000);
  };
  return (
    <ul>
      {props.collections &&
        props.collections
          .filter((collection) => collection.category === props.id)
          .sort(function (a, b) {
            return a.order - b.order;
          })
          .map((collection, idx) => (
            <li
              key={idx}
              className="cursor-pointer text-xl sm:text-sm text-neutral-500"
              onClick={(e) => mobileCollectionClickHandler(e, collection)}
            >
              {collection.title}
            </li>
          ))}
    </ul>
  );
}
