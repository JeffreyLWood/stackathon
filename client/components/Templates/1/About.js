import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Image } from "cloudinary-react";
import { gsap } from "gsap";
import useQ from "../../../useQ";
import styles from "./styles.module.css";
export default function About() {
  let user = useSelector((state) => state.user);

  let text = user.about && user.about.text;

  const newText =
    text &&
    text.split("\n").map((str, idx) => (
      <p key={idx}>
        {str}
        <br />
      </p>
    ));

  let header = user.about && user.about.header;

  const newHeader =
    header &&
    header
      .split("--")
      .map((str, idx) =>
        idx === 0 ? <p key={idx}>{str}</p> : <span key={idx}>-{str}</span>
      );

  let caption = user.about && user.about.caption;
  let imgId = user.about && user.about.imgId;

  // GSAP
  let [q, ref] = useQ();

  return (
    <div ref={ref} className={styles.aboutContent}>
      <div className={`${styles.aboutImageWrapper} stagger`}>
        <figure>
          <Image
            cloudName={process.env.CLOUDINARY_NAME}
            publicId={imgId}
            className={styles.aboutImage}
          />
          <figcaption className="text-sm mt-2 italic text-neutral-400 text-center">
            {caption}
          </figcaption>
        </figure>
      </div>

      <div className={`${styles.aboutTextWrapper} stagger`}>
        {newHeader ? (
          <span className={styles.aboutHeader}>{newHeader}</span>
        ) : null}
        <div className="stagger">{newText}</div>
      </div>
    </div>
  );
}
