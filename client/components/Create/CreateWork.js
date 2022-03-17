import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CreateSnapshot from "./CreateSnapshot";
import { DragDropContext } from "react-beautiful-dnd";
import { Navbar } from "../Navbar";
import { fetchUserData } from "../../store/user";
import CreateUploader from "./CreateUploader";
import { useRef } from "react";
import {
  newCollection,
  fetchCollection,
  fetchAllWork,
} from "../../store/create";
import CreateCollections from "./CreateCollections";
export default function CreateWork(props) {
  let username = useSelector((state) => state.auth.username);
  let worksData = useSelector((state) => state.create.collections);
  let collection = useSelector((state) => state.create.collection);
  // Loading user information mainly for props later on. Had difficulty
  // failing to render when using user.id in components, so passed userId as a variable.
  let userId = useSelector((state) => state.auth.id);
  let user = useSelector((state) => state.user);
  let dispatch = useDispatch();
  // Load all of a user's collections from the database to query later

  // Primary and Secondary snapshots - These snapshots are where collections are edited:
  // Snapshots are divs taking up 4/6 and 2/6 of the screen respectively. Users see thumbnails
  // of their works in each snapshot, can click them and edit their information including moving
  // them from one collection to another or deleting them all together. The Primary and Secondary
  // views default to Work and to Hidden so user's can see the works on display, and the works hidden
  // with the option to make more, custom, collections.
  let [primary, setPrimary] = useState("Work");
  let [secondary, setSecondary] = useState("Hidden");
  // Show is the modal state, either true for display and false for display: none
  let [show, setShow] = useState(false);
  // DisplayName is either Edit a Work or Add a Work for the modal to function for both uses.
  let [displayName, setDisplayName] = useState("");
  // imgId for the modal to find one work in the database with that unique imgId to populate
  // the information fields in the modal for Edit a Work.
  let [imgId, setImgId] = useState("");
  // Set modal collection tells the modal what collection the work is from, setting
  // the select option to default to it when Editing a Work. Could be further optimized
  let [modalCollection, setModalCollection] = useState("Work"); // Not loading

  //Modal for editing collections
  let [showCollections, setShowCollections] = useState(false);

  // Load user data at each change.
  useEffect(() => {
    user = dispatch(fetchUserData(username));
  }, [show]);

  useEffect(() => {
    user = dispatch(fetchUserData(username));
  }, []);

  useEffect(() => {
    worksData = dispatch(fetchAllWork(userId));
  }, []);

  useEffect(() => {
    collection = dispatch(fetchCollection(userId, primary));
  }, [primary]);

  // Load collection headings to pass to snapshot views.
  // These allow users to select from a list of their collections.
  let collections = [];
  // Loop through collections, add to the array if not already added. Passed as props to the snapshots
  const loadCollections = () => {
    for (let i = 0; i < worksData.length; i++) {
      if (worksData[i].title !== null) collections.push(worksData[i].title);
    }
  };

  worksData && loadCollections();

  // The following two functions manage opening the same modal component which
  // can either Add or Edit a work depending on the circumstance.
  const addHandler = (e) => {
    e.preventDefault();
    setDisplayName("Add a Work");
    setShow(true);
  };

  const editHandler = (e) => {
    e.preventDefault();
    setDisplayName("Edit Work");
    let imgId = e.target.src.split("/").slice(-1).join();
    setImgId(imgId);
    setModalCollection(e.target.id);
    console.log(modalCollection);
    setShow(true);
  };
  // Optimization needed: ModalCollection and Primary/Secondary are redundant. Replace
  // primary/secondary with objects that associate the collection title with the snapshot id.

  // The changeHandler operates in the snapshot views' select input. Choosing a collection
  // sets primary or secondary to the collection and sets the modal view to the collection
  // thereby associating a collection, say Work, with a snapshot, say Primary.
  // The association of the collection to it's snapshot id will help later on through the
  // redux store to determine which snapshot to update. NB - This could be done with one variable
  // instead of two. For example, setState({collection: 'Title', snapshot: 'Primary'})
  const changeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.id === "primary") {
      setPrimary(evt.target.value);
      setModalCollection(evt.target.value);
      // dispatch(fetchCollection(userId, evt.target.value));
    } else if (evt.target.id === "secondary") {
      setSecondary(evt.target.value);
      setModalCollection(evt.target.value);
    }
  };

  const addCollection = (evt) => {
    evt.preventDefault();
    setModalCollection(primary);
    setPrimary("New Collection");
    dispatch(newCollection(userId));
    dispatch(fetchUserData(username));
  };

  return (
    <section className="flex flex-col sm:items-center overflow-hidden h-screen w-screen bg-neutral-50 p-2 md:flex-row">
      <Navbar user={user} />
      {/* Container */}

      {/* Primary Snapshot. Shows Work collection thumbnails by default. Allows for editing collection data such
          as collection title, description, viisbility status and allows for delete entire collection functionality. */}
      <div className="h-3/6 mt-24 mb-4 sm:h-5/6 sm:mt-10 sm:mb-0 md:w-4/6">
        <CreateSnapshot
          // Id used to identify through props whether the work clicked for example is from the primary or
          // secondary snapshot for triggering a refresh in the redux store.
          id={"primary"}
          // Collection title passed to snapshot to load the works from that collection.
          collectionTitle={primary}
          // ChangeHandler used in the select drop down to reset which collection we are viewing
          changeHandler={changeHandler}
          // All collection titles for the drop down menus
          collections={collections}
          // Title of secondary snapshot to exclude it from the drop down list so we can not view
          // the same collection in both snapshots
          secondary={secondary}
          userId={userId}
          editHandler={editHandler}
          // For setting the imgId when the modal opens which is done from here, not from the snapshot component.
          imgId={imgId}
          setImgId={setImgId}
          // Display name is either Add a Work or Edit a Work depending on how the modal was called
          displayName={displayName}
          setDisplayName={setDisplayName}
          // Boolean value, true is display modal, false is modal display:none
          show={show}
          setShow={setShow}
          primary={primary}
          setPrimary={setPrimary}
          //Snapshot toolbar
          setShowCollections={setShowCollections}
          addHandler={addHandler}
          addCollection={addCollection}
        />
      </div>
      <div className="h-2/6  sm:h-5/6  sm:mt-10 md:w-2/6">
        <CreateSnapshot
          id={"secondary"}
          collectionTitle={secondary}
          changeHandler={changeHandler}
          collections={collections}
          primary={primary}
          userId={userId}
          editHandler={editHandler}
          imgId={imgId}
          setImgId={setImgId}
          setDisplayName={setDisplayName}
          setShow={setShow}
        />
      </div>

      {/* Toolbar */}

      {/* Modal for Adding a Work and Editing a Work */}
      <CreateUploader
        collections={collections}
        // Collection which the Edit Work work is in
        collection={modalCollection}
        primary={primary}
        secondary={secondary}
        // Edit or Add a Work
        displayName={displayName}
        show={show}
        setShow={setShow}
        // imgId for the fetchSingleWork for Edit Work
        imgId={imgId}
        user={user}
        userId={userId}
        // Room for optimization here, if Modal collection is same as primary, id is primary, else it is secondary
        snapshotId={modalCollection === primary ? "primary" : "secondary"}
      />
      {/* Modal for editing Collections */}
      <CreateCollections
        collections={collections}
        primary={primary}
        secondary={secondary}
        // Edit or Add a Work
        displayName={"Collections Navigation"}
        showCollections={showCollections}
        setShowCollections={setShowCollections}
        // imgId for the fetchSingleWork for Edit Work
        user={user}
        userId={userId}
      />
    </section>
  );
}
