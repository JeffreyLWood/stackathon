import React from "react";

export default function Collections(props) {
  console.log("clctins", props.collections);
  let { collections } = props;
  return (
    <ul>
      {collections &&
        collections
          // .filter((collection) => collection.category === props.id)
          .map((collection, idx) => (
            <li
              key={idx}
              className="cursor-pointer text-xl sm:text-sm text-neutral-500"
              // id={collection.works[0]?.imgId}
              // onMouseOver={(e) => props.previewHandler(e)}
              // onMouseEnter={props.enterPreview}
              // onClick={(e) =>
              //   props.link(e, `${props.url}/work/${collection.title}`)
              // }
            >
              test
            </li>
          ))}
    </ul>
  );
}
