import React from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
export default function Collections(props) {
  let collections =
    props.collections &&
    props.collections.filter((collection) => collection.category === props.id);

  return (
    <div className={styles.collectionsList}>
      {collections &&
        collections.map((collection) => (
          <Link
            key={collection.id}
            to={`${props.url}/work/${collection.title}`}
          >
            <span
              className={styles.link}
              id={collection.works[0]?.imgId}
              onMouseOver={(e) => props.previewHandler(e)}
              onMouseEnter={props.enterPreview}
            >
              {collection.title}
            </span>
          </Link>
        ))}
    </div>
  );
}
