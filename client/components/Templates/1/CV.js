import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import CVGroup from "./CVGroup";
import { gsap } from "gsap";
import useQ from "../../../useQ";
import styles from "./styles.module.css";
import { Image } from "cloudinary-react";
export default function CV(props) {
  let user = useSelector((state) => state.user);
  let cv = user?.cv;
  let [q, ref] = useQ();

  let imgId = user?.cvImg;
  // let caption = user?.cvImgCaption;

  return (
    <div ref={ref} className={styles.cvContainer}>
      <div className={styles.cvImgWrapper}>
        <Image
          cloudName={process.env.CLOUDINARY_NAME}
          publicId={imgId}
          className={`${styles.cvImg} stagger`}
        />
        <div className={`${styles.cvMobileHeading}`}>{user?.siteTitle} CV</div>
      </div>

      <div className={styles.cvText}>
        {cv &&
          cv.map((category) => (
            <CVGroup
              key={category.title}
              title={category.title}
              data={category.data}
            />
          ))}
      </div>
    </div>
  );
}
