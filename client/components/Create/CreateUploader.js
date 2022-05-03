import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPrimaryCollection,
  fetchSecondaryCollection,
  updateAboutText,
} from "../../store/create";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";
import {
  fetchSingleWork,
  destroyWork,
  fetchCollection,
  upload,
  update,
  switcher,
} from "../../store/create";

export default function CreateUploader(props) {
  let work = useSelector((state) => state?.create.work);
  let user = useSelector((state) => state.user);

  const [fileInputState, setFileInputState] = useState("");
  // Preview source is the thumbnil preview image
  let [previewSource, setPreviewSource] = useState("");

  const dispatch = useDispatch();

  // Initialize state, set defaults to empty except collection
  // Remove hidden, not needed
  let [state, setState] = useState({
    collection: props.collection,
    title: "",
    year: null,
    height: null,
    width: null,
    medium: "",
    depth: null,
    metric: "",
    status: "",
    medium: "",
    price: "",
    description: "",
  });

  // Not needed
  let [hidden, setHidden] = useState(false);

  useEffect(() => {
    async function loadImageData() {
      if (props.displayName === "Add a Work") {
        // Clears state for having empty fields when adding a work. Might be redundant
        await dispatch(fetchSingleWork(null, null, null));
        // Clears preview image in case modal was closed and add a work was opened
        setPreviewSource("");
        setState({
          collection: props.primary,
          title: "",
          year: null,
          height: null,
          width: null,
          medium: "",
          depth: null,
          metric: "",
          status: "",
          medium: "",
          price: "",
          description: "",
        });
      }
      if (props.displayName === "Edit Work") {
        // Fetch single work to populate form and thumbnail image
        work = await dispatch(
          fetchSingleWork(user.id, props.collection, props.imgId)
        );
      }
    }
    loadImageData();
  }, [props.show]);

  useEffect(() => {
    work && work.title
      ? setState({
          collection: props.collection,
          title: work.title,
          year: work.year,
          height: work.height,
          width: work.width,
          medium: work.medium,
          depth: work.depth,
          metric: work.metric,
          status: work.status,
          medium: work.medium,
          price: work.price,
          description: work.description,
        })
      : null;
  }, [work]);

  let changeHandler = (evt) => {
    evt.preventDefault();
    //if evt target is files, we are dealing with the img file
    if (evt.target.name === "image") {
      const file = evt.target.files[0];
      previewFile(file);
    } else {
      setState({ ...state, [evt.target.name]: evt.target.value });
      // work = { ...work, [evt.target.name]: evt.target.value }; // ? needed?
    }
  };

  // Renders an image based on the input file uploaded and sets previewSource to it
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  // For submitting changes or additions to an existing or new work
  let submitHandler = async (evt) => {
    evt.preventDefault();
    if (props.displayName === "Edit Work") {
      // If state.collection is not the same as props.collection then the user has changed the work's
      // collection and switchHandler is invoked. A re render is needed to reflect this.
      if (state.collection !== props.collection) {
        switchHandler(previewSource);
        // Otherwise simply updateHandler is invoked. No re render is needed to reflect this as a
        // user needs to change view to see the changes.
      } else if (state.collection === props.collection) {
        updateHandler(previewSource);
      }
    } else if (!previewSource) return;
    else if (props.displayName === "Add a Work") {
      uploadHandler(previewSource);
    }
    // Then clear state for opening the modal again. needed?
    await dispatch(fetchSingleWork(null, null));
    //Clear input fields. May be redundant with previous clear further above. One or the other.
    setState({
      title: "",
      collection: props.collection,
      year: "",
      height: null,
      width: null,
      depth: null,
      medium: "",
      metric: "",
      status: "",
      medium: "",
      price: "",
      description: "",
    });
    //Closes modal
    props.setShow(false);
  };

  const uploadHandler = async (base64EncodedImage) => {
    try {
      let body = {
        data: base64EncodedImage,
        collection: state.collection,
        userId: user.id,
        title: state.title,
        year: state.year,
        height: state.height,
        width: state.width,
        medium: state.medium,
        depth: state.depth,
        metric: state.metric,
        status: state.status,
        medium: state.medium,
        price: state.price,
        description: state.description,
      };
      let snapshotId =
        props.primary === state.collection
          ? "primary"
          : props.secondary === state.collection
          ? "secondary"
          : null;

      dispatch(upload(body, snapshotId));
    } catch (error) {
      console.log(error);
    }
  };

  const updateHandler = async (base64EncodedImage) => {
    try {
      let body = {
        data: base64EncodedImage,
        newImage: previewSource ? true : false,
        origin: { collection: props.collection },
        collection: state.collection,
        imgId: work.imgId,
        userId: user.id,
        title: state.title,
        year: state.year,
        height: state.height,
        width: state.width,
        medium: state.medium,
        depth: state.depth,
        metric: state.metric,
        status: state.status,
        medium: state.medium,
        price: state.price,
        description: state.description,
        snapshotId:
          props.collection === props.primary ? "primary" : "secondary",
      };
      dispatch(update(body));
      setPreviewSource("");
    } catch (error) {
      console.log(props, error);
    }
  };

  const switchHandler = async (base64EncodedImage) => {
    try {
      let body = {
        newImage: previewSource ? true : false,
        data: base64EncodedImage,
        collection: state.collection,
        // Following keys destination and origin:
        // Used for making the switch. If state.collection is equal to primary, then collection
        // is associated with the string "primary" for future use, same with secondary. If null,
        // then it is associated with a collection not in one of the snapshots and can be null.
        destination: {
          snapshotId:
            state.collection === props.primary
              ? "primary"
              : state.collection === props.secondary
              ? "secondary"
              : null,
          collection: state.collection,
        },
        origin: {
          snapshotId:
            props.collection === props.primary ? "primary" : "secondary",
          collection: props.collection,
        },
        userId: user.id,
        imgId: work.imgId,
        title: state.title,
        year: state.year,
        height: state.height,
        width: state.width,
        medium: state.medium,
        depth: state.depth,
        metric: state.metric,
        status: state.status,
        medium: state.medium,
        price: state.price,
        description: state.description,
      };
      dispatch(switcher(body));
    } catch (error) {
      console.log(error);
    }
  };

  // Deletes a work from a collection
  const destroyHandler = (userId, collection, imgId, snapshotId) => {
    imgId = imgId.split("/").slice(-1).join();
    dispatch(destroyWork(userId, collection, imgId, snapshotId));
    props.setShow(false);
  };

  // Needed incase a user makes changes and then closes the modal without saving and opens another.
  // Should trigger a save changes notifcation or warning.
  const closeHandler = () => {
    props.setShow(false);
    setState({
      title: "",
      collection: props.collection,
      year: "",
      height: null,
      width: null,
      depth: null,
      metric: "",
      status: "",
      medium: "",
      price: "",
      description: "",
    });
    setPreviewSource("");
  };

  if (!props.show) {
    return null;
  }

  return (
    <div className="modal z-40">
      <div className="modal-content">
        <div className="flex justify-between">
          <span className="text-lg">{props.displayName}</span>
          <h2 onClick={closeHandler}>
            <img src="/icons8-close-16.png"></img>
          </h2>
        </div>
        {/* Modal Body */}
        <div className="h-full flex flex-col justify-between items-center md:mt-20 md:flex-row">
          <form
            className="w-full flex flex-col items-center md:flex-row  justify-center"
            onSubmit={submitHandler}
          >
            <div className="sm:w-3/6 flex justify-center">
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={changeHandler}
                value={fileInputState}
                style={{ display: "none" }}
              />

              <label htmlFor="image">
                {previewSource ? (
                  <img
                    src={previewSource}
                    alt="chosen"
                    className="h-56 my-4 sm:m-0 sm:h-72"
                  />
                ) : work ? (
                  <Image
                    cloudName={"jeffreywood"}
                    publicId={work.imgId}
                    className="h-56 my-4 sm:m-0 sm:h-72"
                  />
                ) : (
                  <img src="../../../placeholderadd.png"></img>
                )}
              </label>
            </div>
            <div className="flex flex-col space-y-2 sm:w-3/6 sm:px-10">
              <input
                type="text"
                name="title"
                className="my-1 border-b-2"
                placeholder="Title"
                onChange={changeHandler}
                value={state.title}
              />
              <input
                type="text"
                name="year"
                className="my-1 border-b-2"
                placeholder="Year"
                onChange={changeHandler}
                value={state.year}
              />
              <input
                type="text"
                name="medium"
                className="my-1 border-b-2"
                placeholder="Medium"
                onChange={changeHandler}
                value={state.medium}
              />
              <div className="flex flex-row">
                <input
                  type="number"
                  name="height"
                  className="w-16 my-1 border-b-2"
                  placeholder="H"
                  onChange={changeHandler}
                  value={state.height}
                />
                <input
                  type="number"
                  name="width"
                  className="w-16 m-1 border-b-2"
                  placeholder="W"
                  onChange={changeHandler}
                  value={state.width}
                />
                <input
                  type="number"
                  name="depth"
                  className="w-16 m-1 border-b-2"
                  placeholder="D"
                  onChange={changeHandler}
                  value={state.depth}
                />
                <select
                  type="select"
                  name="metric"
                  className="m-1 border-b-2"
                  placeholder="Inches"
                  onChange={changeHandler}
                  value={state.metric}
                >
                  <option value='"'>Inches</option>
                  <option value="'">Feet</option>
                  <option value="cm">Centimeters</option>
                  <option value="m">Meters</option>
                </select>
              </div>
              <div className="flex flex-row space-x-4">
                <input
                  type="text"
                  name="price"
                  className="w-1/6 my-1 border-b-2"
                  placeholder="Price"
                  onChange={changeHandler}
                  value={state.price}
                />
                <input
                  type="text"
                  name="status"
                  className="w-3/6 my-1 border-b-2"
                  placeholder="Status"
                  onChange={changeHandler}
                  value={state.status}
                />
              </div>
              <label
                htmlFor="collection"
                className="flex m-1 items-center space-x-2"
              >
                Collection:
                <select
                  name="collection"
                  className="p-2"
                  onChange={changeHandler}
                  value={state.collection}
                >
                  {props &&
                    props?.collections.map((heading, idx) => (
                      <option
                        key={idx}
                        name="collection"
                        value={heading}
                        id={props.id}
                      >
                        {heading}
                      </option>
                    ))}
                  {props.id === "secondary" ? (
                    <option value="Hidden">Hidden</option>
                  ) : null}
                </select>
              </label>
              <div className="flex flex-row justify-between py-5">
                <button type="submit" className="pillDark">
                  Submit
                </button>
                {work ? (
                  <button
                    className="pill"
                    type="button"
                    onClick={() =>
                      destroyHandler(
                        user.id,
                        props.collection,
                        work.imgId,
                        props.snapshotId
                      )
                    }
                  >
                    Delete Work
                  </button>
                ) : null}
              </div>
            </div>
          </form>
        </div>
        {/* Modal Footer */}
        <div className="modal-footer"></div>
      </div>
    </div>
  );
}
