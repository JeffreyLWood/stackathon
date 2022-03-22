import React from "react";
import { fetchUserData } from "../../store/user";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";

export const Navbar = (props) => {
  const dispatch = useDispatch();
  let user = [];
  useEffect(() => {
    user = dispatch(fetchUserData(props?.user.username));
  }, []);

  let siteTitle = props?.user.siteTitle
    ? `${props?.user.siteTitle}`
    : `${props.user.firstName} ${props.user.lastName}`;

  document.title = siteTitle;

  let collections = props.user && props.user.collections;

  let [preview, setPreview] = useState("");

  useEffect(() => {
    let visible =
      collections &&
      collections
        .filter((collection) => !collection.hidden)
        .sort((a, b) => a.order - b.order);
    props.collection && props.collection?.works
      ? setPreview(props.collection.works[0].imgId)
      : visible && visible[0]?.works && setPreview(visible[0]?.works[0]?.imgId);
  }, [props]);

  let [workDropdown, setWorkDropdown] = useState("hidden");

  const show = () => {
    setWorkDropdown(
      "flex flex-row justify-between dropdown drop-down drop-shadow-xl"
    );
  };

  const hide = () => {
    setWorkDropdown("flex flex-row justify-between dropdown drop-down-up");
  };

  const previewHandler = (e) => {
    e.preventDefault();
    setPreview(e.target.id);
  };

  let [mobileNav, setMobileNav] = useState("hidden");
  let [collectionsMobile, setCollectionsMobile] = useState("hidden");
  return (
    <>
      <nav className="flex flex-row justify-between h-18 items-end mx-2 sm:mx-12 mt-10 tracking-widest">
        <div className="text-sm sm:text-xl">
          <Link to={`/${props.user.userName}`}>{siteTitle}</Link>
        </div>
        {/* Mobile Nav */}
        <div
          className="toggle"
          onClick={() =>
            mobileNav === "hidden"
              ? setMobileNav(
                  "flex justify-center text-center mt-20 w-screen h-screen bg-white"
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
              className="subHeader"
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
                          <Link
                            to={`/${props.user.userName}/work/${collection.title}`}
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
                            to={`/${props.user.userName}/work/${collection.title}`}
                          >
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
                          <Link
                            to={`/${props.user.userName}/work/${collection.title}`}
                          >
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
                          <Link
                            to={`/${props.user.userName}/work/${collection.title}`}
                          >
                            {collection.title}
                          </Link>
                        </li>
                      )
                    )}
              </ul>
            </span>
            {/* Collections Mobile End */}

            <li>
              <Link to={`/${props.user.userName}/about`} className="subHeader">
                <div>About</div>
              </Link>
            </li>
            <li>
              <Link to={`/${props.user.userName}/cv`} className="subHeader">
                <div>CV</div>
              </Link>
            </li>
            <li>
              <Link
                to={`/${props.user.userName}/contact`}
                className="subHeader"
              >
                <div>Contact</div>
              </Link>
            </li>
          </ul>
        </nav>
        {/* Mobile Nav End */}

        <div className="nav flex flex-row space-x-3 text-xs sm:text-sm pe-5">
          <div
            className="subHeader cursor-pointer"
            onMouseOver={() => show()}
            onMouseLeave={() => hide()}
            onClick={hide}
          >
            <Link to={`/${props.user.userName}`} onClick={hide}>
              Selected Work
            </Link>

            <div className={workDropdown}>
              <div className="hidden sm:block w-full flex text-center h-content">
                <ul className="w-full h-full">
                  <span className="w-full h-full">
                    <li className="w-full h-full">
                      <Image
                        cloudName="jeffreywood"
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
                                id={collection.works[0].imgId}
                                onMouseOver={(e) => previewHandler(e)}
                                to={`/${props.user.userName}/work/${collection.title}`}
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
                                id={collection.works[0].imgId}
                                onMouseOver={(e) => previewHandler(e)}
                                to={`/${props.user.userName}/work/${collection.title}`}
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
                                id={collection.works[0].imgId}
                                to={`/${props.user.userName}/work/${collection.title}`}
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
                                id={collection.works[0].imgId}
                                to={`/${props.user.userName}/work/${collection.title}`}
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
          </div>
          <Link to={`/${props.user.userName}/about`} className="subHeader">
            <div>About</div>
          </Link>
          <Link to={`/${props.user.userName}/cv`} className="subHeader">
            <div>CV</div>
          </Link>
          <Link to={`/${props.user.userName}/contact`} className="subHeader">
            <div>Contact</div>
          </Link>
        </div>
      </nav>
    </>
  );
};

// import React from "react";
