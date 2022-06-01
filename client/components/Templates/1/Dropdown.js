import React from "react";
import { useState } from "react";
import { Image } from "cloudinary-react";
import { gsap } from "gsap";
import useQ from "../../../useQ";
import Collections from "./Collections";
import styles from "./styles.module.css";
export default function Dropdown(props) {
  let [preview, setPreview] = useState(props.preview);
  let visible = props.visible;

  const previewHandler = (e) => {
    e.preventDefault();
    setPreview(e.target.id);
  };

  let [q, ref] = useQ();
  const enterPreview = () => {
    gsap.fromTo(
      q(".gsap"),
      { opacity: 0, x: -20 },
      {
        x: 20,
        opacity: 1,
        duration: 1,
        ease: "expo",
      }
    );
  };

  if (!props.showDropdown) {
    return null;
  }
  return (
    <div ref={ref} className={`${styles.dropdown}`}>
      <div className={styles.previewWrapper}>
        <Image
          cloudName={process.env.CLOUDINARY_NAME}
          publicId={preview}
          className={`${styles.preview} gsap`}
        />
      </div>
      <div className={styles.collectionsWrapper}>
        <Collections
          id={"Primary"}
          collections={visible}
          link={props.link}
          previewHandler={previewHandler}
          enterPreview={enterPreview}
          url={props.url}
        />
      </div>
      <div className={styles.collectionsWrapper}>
        <Collections
          id={"Secondary"}
          collections={visible}
          link={props.link}
          previewHandler={previewHandler}
          enterPreview={enterPreview}
          url={props.url}
        />
      </div>
    </div>
  );
}
