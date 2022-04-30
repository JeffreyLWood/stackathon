import React from "react";

export default function CollectionsMobile(props) {
  const mobileCollectionClickHandler = (e, collection) => {
    e.preventDefault();
    props.link(e, `${props.url}/work/${collection.title}`);
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
