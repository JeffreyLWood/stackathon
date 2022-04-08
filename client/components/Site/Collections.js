import React from "react";

export default function Collections(props) {
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
              id={collection.works[0]?.imgId}
              onMouseOver={(e) => props.previewHandler(e)}
              onMouseEnter={props.enterPreview}
              onClick={(e) =>
                props.link(e, `${props.url}/work/${collection.title}`)
              }
            >
              {collection.title}
            </li>
          ))}
    </ul>
  );
}
