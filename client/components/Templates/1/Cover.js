import React from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";
export default function Cover() {
  const user = useSelector((state) => state.user);

  return (
    <div className={styles.cover}>
      {/* <div>{user?.cover.title1}</div>
      <div>{user?.cover.siteTitle}</div>
      <div>{user?.cover.subTitle}</div> */}
      <div>Enter</div>
      <div>Social Links</div>
    </div>
  );
}
