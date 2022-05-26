import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import emailjs from "emailjs-com";
import { gsap } from "gsap";
import { useRef } from "react";
import useQ from "../../../useQ";
import styles from "./styles.module.css";
import { Image } from "cloudinary-react";
export default function Contact() {
  let user = useSelector((state) => state.user);

  let defaultEmail = user.email;

  let text = user.contact && user.contact.text;
  let email = user.contact && user.contact.email;
  let instagram = user.contact && user.contact.instagram;
  let address = user.contact && user.contact.address;
  let phone = user.contact && user.contact.phone;
  let facebook = user.contact && user.contact.facebook;
  let youtube = user.contact && user.contact.youtube;
  let twitter = user.contact && user.contact.twitter;
  let pinterest = user.contact && user.contact.pinterest;
  let linkedin = user.contact && user.contact.linkedin;
  let etsy = user.contact && user.contact.etsy;
  let tiktok = user.contact && user.contact.tiktok;
  let [confirmed, setConfirmed] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .send(
        process.env.MAILJS_SERVICE_ID,
        process.env.MAILJS_TEMPLATE_ID,
        {
          from_name: e.target.from_name.value,
          reply_to: e.target.reply_to.value,
          message: e.target.message.value,
          to_email: email,
        },
        process.env.MAILJS_USER_ID
      )
      .then(
        (result) => {
          console.log(result.text);
          setConfirmed(true);
        },
        (error) => {
          console.log(error.text, e.target);
        }
      );
    e.target.reset();
  };

  let [q, ref] = useQ();

  let caption = user.contact && user.contact.caption;
  let imgId = user.contact && user.contact.imgId;

  return (
    // <div
    //   ref={ref}
    //   className="w-screen font-light text-sm leading-8 h-80vh my-14 mx-2 md:m-20 md:mb-0 flex flex-col items-start justify-center sm:px-10 sm:py-5 sm:flex-row md:py-24 md:px-10 md:justify-start"
    // >
    <div ref={ref} className={styles.contactContainer}>
      <section className={`${styles.contactImage} stagger`}>
        <Image
          cloudName={process.env.CLOUDINARY_NAME}
          publicId={imgId}
          className="h-full object-cover"
        />

        {caption}
      </section>
      <section className={`${styles.contactInfo} stagger`}>
        <span className={styles.h2}>Contact</span>
        {text ? <span>{text}</span> : null}

        <span className={styles.contactInfoHeading}>
          Email{" "}
          {email ? (
            <a href={{ mailto: { email } }}>{email}</a>
          ) : (
            <a href={{ mailto: { defaultEmail } }}>{defaultEmail}</a>
          )}
        </span>
        {phone ? (
          <span className={styles.contactInfoHeading}>Tel {phone}</span>
        ) : null}
        {address ? (
          <span className={styles.contactInfoHeading}>{address}</span>
        ) : null}

        <div className={styles.socialIcons}>
          {instagram ? (
            <a href={instagram} target="_blank">
              <img
                src="../social/instagram.png"
                label="instagram"
                alt="instagrram"
              />
            </a>
          ) : null}
          {facebook ? (
            <a href={facebook} target="_blank">
              <img
                src="../social/facebook.png"
                label="facebook"
                alt="faceboook"
              />
            </a>
          ) : null}
          {twitter ? (
            <a href={twitter} target="_blank">
              <img src="../social/twitter.png" label="twitter" alt="twitter" />
            </a>
          ) : null}
          {email ? (
            <a href={`mailto:${email} `}>
              <img src="../social/email.png" alt="email" />
            </a>
          ) : null}
          {youtube ? (
            <a href={youtube} target="_blank">
              <img src="../social/youtube.png" label="youtube" alt="youtube" />
            </a>
          ) : null}
          {linkedin ? (
            <a href={linkedin} target="_blank">
              <img
                src="../social/linkedin.png"
                label="linkedin"
                alt="linkedin"
              />
            </a>
          ) : null}
          {etsy ? (
            <a href={etsy} target="_blank">
              <img src="../social/etsy.png" alt="etsy" />
            </a>
          ) : null}
          {pinterest ? (
            <a href={pinterest} target="_blank">
              <img
                src="../social/pinterest.png"
                alt="pinterest"
                label="pinterest"
              />
            </a>
          ) : null}
          {tiktok ? (
            <a href={tiktok} target="_blank">
              <img src="../social/tiktok.png" alt="tiktok" label="tiktok" />
            </a>
          ) : null}
        </div>
        <section className={`${styles.contactForm} stagger`}>
          <form onSubmit={sendEmail}>
            <div>
              <span>
                <label htmlFor="name">Name: *</label>
                <input required name="from_name" type="text" />
              </span>
              <span>
                <label htmlFor="email">Email: *</label>
                <input required name="reply_to" type="email" />
              </span>
            </div>

            <label htmlFor="message" name="message">
              Message: *
            </label>
            <textarea
              rows="5"
              style={{ resize: "none" }}
              name="message"
              type="text"
            />

            {/* <label htmlFor="emailList">Subscribe to Email List:</label>
            <input name="emailList" type="checkbox" /> */}
            {/* <input className="w-3/6" name="to_email" type="text"></input> */}
            <span>
              <button type="submit" className={styles.button} value="Submit">
                Submit
              </button>
              {confirmed ? <span>Your message has been sent.</span> : null}
            </span>
          </form>
        </section>
      </section>
    </div>
  );
}
