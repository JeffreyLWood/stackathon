import React from "react";
import { fetchUserData } from "../../store/user";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";
import history from "../../history";
import { gsap } from "gsap";
import { useRef } from "react";
export const Navbar = (props) => {
  const dispatch = useDispatch();
  let user = useSelector((state) => state.user);

  let siteTitle = props?.user.siteTitle
    ? `${props?.user.siteTitle}`
    : `${props.user.firstName} ${props.user.lastName}`;

  document.title = siteTitle;

  let collections = props.user && props.user.collections;

  let [preview, setPreview] = useState("");
  let visible = [];

  useEffect(() => {
    visible =
      collections &&
      collections
        .filter((collection) => !collection.hidden)
        .sort((a, b) => a.order - b.order);
    props.collection && props.collection?.works
      ? setPreview(props.collection.works[0]?.imgId)
      : visible && visible[0]?.works && setPreview(visible[0]?.works[0]?.imgId);
  }, [props]);

  let [workDropdown, setWorkDropdown] = useState(
    "flex flex-row justify-between dropdown drop-shadow-xl"
  );

  const show = () => {
    let visible =
      collections && collections.filter((collection) => !collection.hidden);
    visible.length > 1 ? dropDown() : null;
  };

  const hide = () => {
    let visible =
      collections && collections.filter((collection) => !collection.hidden);
    visible.length > 1 ? dropDownUp() : null;
  };

  const previewHandler = (e) => {
    e.preventDefault();
    setPreview(e.target.id);
  };

  let [mobileNav, setMobileNav] = useState("hidden");
  let [collectionsMobile, setCollectionsMobile] = useState("hidden");

  //Disable scrolling when menu is open
  let [body, setBody] = useState("");
  useEffect(() => {
    mobileNav !== "hidden" ? setBody("fixed") : setBody("");
  }, [mobileNav]);
  document.body.style.position = body;

  let url = user.domain ? `` : `/${user.userName}`;

  // GSAP
  const link = (e, destination) => {
    e.preventDefault();
    if (destination === window.location.pathname) {
      return;
    }
    props.fadeOut();
    setTimeout(() => {
      history.push(destination);
    }, 1000);
  };
  let nav = useRef();
  const el = gsap.utils.selector(nav);
  const fade = () => {
    gsap.to(el(".nav"), { opacity: 1, duration: 1, ease: "expo" }, 0.5);
  };
  const dropDown = () =>
    gsap.to(el(".dropdown"), { yPercent: 120, duration: 2, ease: "expo" });
  const dropDownUp = () =>
    gsap.to(el(".dropdown"), { yPercent: -120, duration: 2, ease: "expo" });
  useEffect(() => {
    fade();
  });
  return (
    <div ref={nav}>
      <nav className="nav fixed flex flex-row justify-between items-end px-4 tracking-widest">
        <div className="text-xl">
          <Link to={`${url}`}>{siteTitle}</Link>
        </div>
        {/* Mobile Nav Hamburger*/}
        <div
          className="toggle"
          onClick={() =>
            mobileNav === "hidden"
              ? setMobileNav(
                  "fixed top-8 h-screen flex justify-center text-center mt-20 w-screen bg-white"
                )
              : setMobileNav("hidden")
          }
        ></div>
        {/* Mobile Nav */}
        <nav className={mobileNav}>
          <ul className="text-xl space-y-4 ">
            <li
              onClick={() =>
                collectionsMobile === "hidden"
                  ? setCollectionsMobile("flex flex-col")
                  : setCollectionsMobile("hidden")
              }
              className="subHeader cursor-pointer"
            >
              Selected Work
            </li>

            {/* Collections Mobile */}
            <span className={collectionsMobile}>
              <ul>
                {collections &&
                  collections
                    .filter(
                      (collection) =>
                        collection.hidden === false &&
                        collection.category === "Primary"
                    )
                    .sort(function (a, b) {
                      return a.order - b.order;
                    })
                    .map((collection, idx) =>
                      props.setCollection ? (
                        <li
                          key={idx}
                          className="cursor-pointer text-xl sm:text-sm text-neutral-500"
                          onClick={() => {
                            setMobileNav("hidden"),
                              setCollectionsMobile("hidden"),
                              props.setCollection(collection);
                          }}
                        >
                          <Link to={`${url}/work/${collection.title}`}>
                            {collection.title}
                          </Link>
                        </li>
                      ) : (
                        <li
                          key={idx}
                          className="cursor-pointer text-xl sm:text-sm"
                        >
                          <Link to={`${url}/work/${collection.title}`}>
                            {collection.title}
                          </Link>
                        </li>
                      )
                    )}
              </ul>
              <ul>
                {collections &&
                  collections
                    .filter(
                      (collection) =>
                        collection.hidden === false &&
                        collection.category === "Secondary"
                    )
                    .sort(function (a, b) {
                      return a.order - b.order;
                    })
                    .map((collection, idx) =>
                      props.setCollection ? (
                        <li
                          key={idx}
                          className="cursor-pointer text-xl sm:text-sm text-neutral-400 tracking-widest"
                          onClick={() => {
                            setMobileNav("hidden"),
                              setCollectionsMobile("hidden"),
                              props.setCollection(collection);
                          }}
                        >
                          <Link to={`${url}/work/${collection.title}`}>
                            {collection.title}
                          </Link>
                        </li>
                      ) : (
                        <li
                          key={idx}
                          onClick={() => {
                            setCollectionsMobile("hidden");
                          }}
                          className="cursor-pointer text-xl sm:text-sm  text-neutral-400 tracking-widest"
                        >
                          <Link to={`${url}/work/${collection.title}`}>
                            {collection.title}
                          </Link>
                        </li>
                      )
                    )}
              </ul>
            </span>
            {/* Collections Mobile End */}

            <li>
              <Link to={`${url}/about`} className="subHeader cursor-pointer">
                <div>About</div>
              </Link>
            </li>
            <li>
              <Link to={`${url}/cv`} className="subHeader cursor-pointer">
                <div>CV</div>
              </Link>
            </li>
            <li>
              <div
                onClick={(e) => link(e, `${url}/contact`)}
                className="subHeader cursor-pointer"
              >
                Contact
              </div>
            </li>
          </ul>
        </nav>
        {/* Mobile Nav End */}

        <span className="flex flex-row space-x-3 text-xs sm:text-sm pe-5">
          <span
            className="subHeader cursor-pointer"
            onMouseOver={() => show()}
            onMouseLeave={() => hide()}
            onClick={(e) => link(e, `${url}/`)}
          >
            Selected Work
          </span>

          <span
            className="subHeader cursor-pointer"
            onClick={(e) => link(e, `${url}/about`)}
          >
            About
          </span>

          <span
            className="subHeader cursor-pointer"
            onClick={(e) => link(e, `${url}/cv`)}
          >
            CV
          </span>

          <span
            onClick={(e) => link(e, `${url}/contact`)}
            className="subHeader cursor-pointer"
          >
            Contact
          </span>
        </span>
      </nav>
      {/* Drop Down Nav */}
      <div
        className="flex flex-row justify-between dropdown drop-shadow-xl"
        onMouseOver={() => show()}
        onMouseLeave={() => hide()}
        onClick={() => hide()}
      >
        <div className="hidden sm:block w-full flex text-center h-content">
          <ul className="w-full h-full">
            <span className="w-full h-full">
              <li className="w-full h-full">
                <Image
                  cloudName={process.env.CLOUDINARY_NAME}
                  publicId={preview}
                  className="hover:cursor-pointer h-72 mx-auto "
                  // onClick={(e) => props.editHandler(e)}
                />
              </li>
            </span>
          </ul>
        </div>
        <div className="flex flex-col justify-center items-start h-full w-screen sm:justify-start sm:w-2/6 md:flex-row">
          <span className="w-full flex justify-center sm:justify-start sm:w-3/6">
            <ul>
              {collections &&
                collections
                  .filter(
                    (collection) =>
                      collection.hidden === false &&
                      collection.category === "Primary"
                  )
                  .sort(function (a, b) {
                    return a.order - b.order;
                  })
                  .map((collection, idx) =>
                    props.setCollection ? (
                      <li
                        key={idx}
                        className="cursor-pointer text-xl sm:text-sm text-neutral-500"
                        onClick={() => {
                          props.setCollection(collection);
                        }}
                      >
                        <Link
                          id={collection.works[0]?.imgId}
                          onMouseOver={(e) => previewHandler(e)}
                          to={`${url}/work/${collection.title}`}
                        >
                          {collection.title}
                        </Link>
                      </li>
                    ) : (
                      <li
                        key={idx}
                        className="cursor-pointer text-xl sm:text-sm"
                      >
                        <Link
                          id={collection.works[0]?.imgId}
                          onMouseOver={(e) => previewHandler(e)}
                          to={`${url}/work/${collection.title}`}
                        >
                          {collection.title}
                        </Link>
                      </li>
                    )
                  )}
            </ul>
          </span>
          <span className="w-full flex justify-center sm:justify-start sm:w-3/6 mr-4">
            <ul>
              {collections &&
                collections
                  .filter(
                    (collection) =>
                      collection.hidden === false &&
                      collection.category === "Secondary"
                  )
                  .sort(function (a, b) {
                    return a.order - b.order;
                  })
                  .map((collection, idx) =>
                    props.setCollection ? (
                      <li
                        key={idx}
                        className="cursor-pointer text-xl sm:text-sm text-neutral-400 tracking-widest"
                        onClick={() => {
                          props.setCollection(collection);
                        }}
                      >
                        <Link
                          onMouseOver={(e) => previewHandler(e)}
                          id={collection.works[0]?.imgId}
                          to={`${url}/work/${collection.title}`}
                        >
                          {collection.title}
                        </Link>
                      </li>
                    ) : (
                      <li
                        key={idx}
                        className="cursor-pointer text-xl sm:text-sm  text-neutral-400 tracking-widest"
                      >
                        <Link
                          onMouseOver={(e) => previewHandler(e)}
                          id={collection.works[0]?.imgId}
                          to={`${url}/work/${collection.title}`}
                        >
                          {collection.title}
                        </Link>
                      </li>
                    )
                  )}
            </ul>
          </span>
        </div>
      </div>
      {/* Drop Down Nav End */}
    </div>
  );
};

// import React from "react";
