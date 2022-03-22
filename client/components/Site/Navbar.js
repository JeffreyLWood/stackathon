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
  console.log("collections", collections);

  let [preview, setPreview] = useState("");

  useEffect(() => {
    let visible =
      collections &&
      collections
        .filter((collection) => !collection.hidden)
        .sort((a, b) => a.order - b.order);
    visible && visible[0]?.works
      ? setPreview(visible[0]?.works[0]?.imgId)
      : setPreview("");
  }, [collections]);

  let [workDropdown, setWorkDropdown] = useState("hidden");

  const show = () => {
    setWorkDropdown("flex flex-row justify-between dropdown");
  };

  const hide = () => {
    setWorkDropdown("hidden");
  };

  const previewHandler = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setPreview(e.target.value?.works[0]?.imgId);
  };

  console.log(props);
  return (
    <>
      <nav className="flex flex-row justify-between h-18 items-end mx-2 sm:mx-12 mt-10 tracking-widest">
        <div className="text-sm sm:text-xl">
          <Link to={`/${props.user.userName}`}>{siteTitle}</Link>
        </div>
        <div className="flex flex-row space-x-3 text-xs sm:text-sm pe-5">
          <div
            className="subHeader cursor-pointer"
            onMouseOver={show}
            onMouseLeave={hide}
            onClick={hide}
          >
            <Link to={`/${props.user.userName}`} onClick={hide}>
              Selected Work
            </Link>
            <div className={workDropdown}>
              <div className="hidden sm:block w-full flex justify-center h-content m-20">
                <Image
                  cloudName="jeffreywood"
                  publicId={preview}
                  className="hover:cursor-pointer h-64"
                  // onClick={(e) => props.editHandler(e)}
                />
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
                              value={collection}
                              key={idx}
                              className="cursor-pointer text-xl sm:text-sm text-neutral-500"
                              onMouseOver={(e) => previewHandler(e)}
                              onClick={() => {
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
                              value={collection}
                              className="cursor-pointer text-xl sm:text-sm"
                              onMouseOver={(e) => previewHandler(e)}
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
                              value={collection}
                              key={idx}
                              className="cursor-pointer text-xl sm:text-sm text-neutral-400 tracking-widest"
                              onMouseOver={(e) => previewHandler(e)}
                              onClick={() => {
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
                              value={collection}
                              key={idx}
                              className="cursor-pointer text-xl sm:text-sm  text-neutral-400 tracking-widest"
                              onMouseOver={(e) => previewHandler(e)}
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
