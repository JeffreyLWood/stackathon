import React from "react";
import styles from "./styles.module.css";

export default function Collections(props) {
  let collections =
    props.collections &&
    props.collections.filter((collection) => collection.category === props.id);

  return (
    <div className={styles.collectionsList}>
      {collections &&
        collections.map((collection) => (
          <span
            key={collection.id}
            //    className="cursor-pointer text-xl sm:text-sm z-50"
            id={collection.works[0]?.imgId}
            onMouseOver={(e) => props.previewHandler(e)}
            onMouseEnter={props.enterPreview}
            onClick={(e) =>
              props.link(e, `${props.url}/work/${collection.title}`)
            }
          >
            {collection.title}
          </span>
        ))}
    </div>
  );
}
