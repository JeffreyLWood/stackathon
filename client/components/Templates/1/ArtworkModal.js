import React from "react";
import { Image } from "cloudinary-react";
import Dimensions from "./Dimensions";
import styles from "./styles.module.css";
export default function ArtworkModal(props) {
  if (!props.show) {
    return null;
  }

  return (
    <div className={`${styles.workModal} gsap`}>
      <div className={styles.workModalHeader}></div>
      <span className={styles.workModalClose} onClick={props.fadeOut}>
        <img src="/icons8-close-16.png" className="w-6" />
      </span>
      <div className={styles.workModalBody}>
        <div className={`${styles.workModalImgContainer} artwork`}>
          <Image
            className={styles.artwork}
            cloudName={process.env.CLOUDINARY_NAME}
            publicId={props.data.imgId}
          />
        </div>
        <div className={`${styles.workModalTextContainer} description`}>
          <ul>
            <li className={styles.workModalTitle}>{props.data.title}</li>
            <li className={styles.workModalArtist}>{props.user.siteTitle}</li>
            <li className={styles.workModalYear}>{props.data.year}</li>
            <li className={styles.workModalMedium}>{props.data.medium}</li>
            <li>
              <Dimensions data={props.data} />
            </li>
            <li className={styles.workModalStatus}>{props.data.status}</li>
            <li className={styles.workModalPrice}>{props.data.price}</li>
            {/* <li>
              <button type="button" className="border-2 p-2 ">
                Enquire
              </button> 
            </li>*/}
          </ul>
        </div>
      </div>
    </div>
  );
}
