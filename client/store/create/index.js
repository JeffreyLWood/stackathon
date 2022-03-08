import axios from "axios";

//action types
const ABOUT = "ABOUT";
const CV = "CV";
const CONTACT = "CONTACT";
const TITLE = "TITLE";
const GET_SINGLE_WORK = "GET_SINGLE_WORK";
const GET_ALL_WORK = "GET_ALL_WORK";
const GET_COLLECTION = "GET_COLLECTION";
const GET_PRIMARY_COLLECTION = "GET_PRIMARY_COLLECTION";
const GET_SECONDARY_COLLECTION = "GET_SECONDARY_COLLECTION";
const UPLOAD_WORK = "UPLOAD_WORK";
const UPDATE_WORK = "UPDATE_WORK";
const UPDATE_COLLECTION = "UPDATE_COLLECTION";
const SWITCH_COLLECTION = "SWITCH_COLLECTION";
//Used for Reordering works in a collection
const REORDER_COLLECTION = "REORDER_COLLECTION";
//Used for reordering collections themselves
const REORDER_COLLECTIONS = "REORDER_COLLECTIONS";
const ADD_COLLECTION = "ADD_COLLECTION";
const HIDDEN_COLLECTION = "HIDDEN_COLLECTION";
const DELETE_WORK = "DELETE_WORK";
const DELETE_COLLECTION = "DELETE_COLLECTION";

//action creators
const updateAbout = (aboutData) => {
  return { type: ABOUT, aboutData };
};

const updateCV = (cvData) => {
  return { type: CV, cvData };
};

const updateContact = (contactData) => {
  return { type: CONTACT, contactData };
};

const updateTitle = (titleData) => {
  return { type: TITLE, titleData };
};

const getAllWork = (data) => {
  return { type: GET_ALL_WORK, data };
};

const getSingleWork = (data) => {
  return { type: GET_SINGLE_WORK, data };
};

const getCollection = (data) => {
  return { type: GET_COLLECTION, data };
};

const getPrimaryCollection = (data) => {
  return { type: GET_PRIMARY_COLLECTION, data };
};

const getSecondaryCollection = (data) => {
  return { type: GET_SECONDARY_COLLECTION, data };
};

const updateCollection = (data) => {
  return { type: UPDATE_COLLECTION, data };
};

const uploadWork = (data, snapshotId) => {
  return { type: UPLOAD_WORK, data, snapshotId };
};

const updateWork = (data) => {
  return { type: UPDATE_WORK, data };
};

const switchCollection = (data, origin, destination) => {
  return { type: SWITCH_COLLECTION, data, origin, destination };
};

const reorderCollection = (data, snapshotId) => {
  return { type: REORDER_COLLECTION, data, snapshotId };
};

const reorderCollections = (data) => {
  return { type: REORDER_COLLECTION, data };
};

const addCollection = (data) => {
  return { type: ADD_COLLECTION, data };
};

const deleteWork = (snapshotId, data) => {
  return { type: DELETE_WORK, data, snapshotId };
};

const hideCollection = (data) => {
  return { type: HIDDEN_COLLECTION, data };
};

const deleteCollection = (data) => {
  return { type: DELETE_COLLECTION, data };
};

//thunk creators
export const updateTitleData = (userId, titleData) =>
  async function (dispatch) {
    try {
      let { data } = await axios.put(`/api/users/${userId}/title`, titleData);
      dispatch(updateTitle(data));
    } catch (err) {
      return err;
    }
  };
export const updateAboutText = (userId, textData) =>
  async function (dispatch) {
    try {
      let { data } = await axios.post(`/api/users/${userId}/about`, textData);
      dispatch(updateAbout(data));
    } catch (err) {
      return err;
    }
  };
export const updateCVText = (userId, header, text) =>
  async function (dispatch) {
    let putBody = {
      header,
      text,
    };
    try {
      let { data } = await axios.put(`/api/users/${userId}/cv`, putBody);
      dispatch(updateCV(data));
    } catch (err) {
      return err;
    }
  };
export const updateContactData = (userId, contactData) =>
  async function (dispatch) {
    try {
      let { data } = await axios.post(
        `/api/users/${userId}/contact`,
        contactData
      );
      dispatch(updateContact(data));
    } catch (err) {
      return err;
    }
  };
export const fetchAllWork = (userId) =>
  async function (dispatch) {
    try {
      let { data } = await axios.get(`/api/users/${userId}/work`);
      dispatch(getAllWork(data));
    } catch (err) {
      return err;
    }
  };

// State.create.collection, used primarily
// for collectionSettings.
export const fetchCollection = (userId, title) =>
  async function (dispatch) {
    try {
      let { data } = await axios.get(`/api/users/${userId}/${title}/work/`);
      dispatch(getCollection(data));
    } catch (err) {
      return err;
    }
  };

export const fetchPrimaryCollection = (userId, title) =>
  async function (dispatch) {
    try {
      let { data } = await axios.get(`/api/users/${userId}/${title}/work/`);
      dispatch(getPrimaryCollection(data));
    } catch (err) {
      return err;
    }
  };
export const fetchSecondaryCollection = (userId, title) =>
  async function (dispatch) {
    try {
      let { data } = await axios.get(`/api/users/${userId}/${title}/work/`);
      dispatch(getSecondaryCollection(data));
    } catch (err) {
      return err;
    }
  };

export const updateCollectionData = (userId, collection, body) =>
  async function (dispatch) {
    try {
      let { data } = await axios.put(
        `/api/collections/${userId}/${collection}`,
        body
      );
      dispatch(updateCollection(data));
    } catch (err) {
      return err;
    }
  };
export const hiddenCollection = (userId, collection, toggle) =>
  async function (dispatch) {
    try {
      console.log("store", toggle);
      let { data } = await axios.put(
        `/api/collections/${userId}/hide/${collection}`,
        { toggle }
      );
      dispatch(hideCollection(data));
    } catch (err) {
      return err;
    }
  };
export const fetchSingleWork = (userId, collection, imgId) =>
  async function (dispatch) {
    try {
      if (userId === null) {
        dispatch(getSingleWork(null));
        return;
      }
      let { data } = await axios.get(
        `/api/users/${userId}/${collection}/${imgId}`
      );
      dispatch(getSingleWork(data));
    } catch (err) {
      return err;
    }
  };

export const upload = (body, snapshotId) =>
  async function (dispatch) {
    try {
      let { data } = await axios.post(`/api/upload`, body);

      dispatch(uploadWork(data, snapshotId));
    } catch (err) {
      return err;
    }
  };

export const update = (body) =>
  async function (dispatch) {
    try {
      let { data } = await axios.post(`/api/update`, body);
      dispatch(updateWork(data));
    } catch (err) {
      return err;
    }
  };

export const switcher = (body) =>
  async function (dispatch) {
    try {
      let { data } = await axios.post(`/api/update`, body);
      dispatch(switchCollection(data, body.origin, body.destination));
    } catch (err) {
      return err;
    }
  };

export const reorder = (userId, collection, list, snapshotId) =>
  async function (dispatch) {
    let body = { reorder: true, userId, collection, list };
    try {
      let { data } = await axios.post(`/api/reorder`, body);
      dispatch(reorderCollection(data, snapshotId));
    } catch (err) {
      return err;
    }
  };

export const reorderWholeCollections = (userId, collection) =>
  async function (dispatch) {
    try {
      let { data } = await axios.put(
        `/api/collections/${userId}/${collection}/reorder`,
        collection
      );
      dispatch(reorderCollections(data));
    } catch (err) {
      return err;
    }
  };

export const newCollection = (userId) =>
  async function (dispatch) {
    try {
      let { data } = await axios.post(`/api/collections`, { userId });
      dispatch(addCollection(data));
    } catch (err) {
      return err;
    }
  };

export const destroyWork = (userId, collection, imgId, snapshotId) =>
  async function (dispatch) {
    try {
      let { data } = await axios.delete(
        `/api/users/${userId}/${collection}/${imgId}`
      );
      dispatch(deleteWork(snapshotId, data));
    } catch (err) {
      return err;
    }
  };

export const destroyCollection = (userId, collection) =>
  async function (dispatch) {
    try {
      let { data } = await axios.delete(
        `/api/collections/${userId}/${collection}`
      );
      dispatch(deleteCollection(data));
    } catch (err) {
      return err;
    }
  };

//Reducer
export default function (state = {}, action) {
  switch (action.type) {
    case TITLE: {
      let newState = state;
      newState.siteTitle = action.titleData;
      return newState;
    }
    case ABOUT: {
      let newState = state;
      newState.about = action.aboutData;
      return newState;
    }
    case CV: {
      let newState = state;
      newState.cv = action.cvData;
      return newState;
    }
    case CONTACT: {
      let newState = state;
      newState.contact = action.contactData;
      return newState;
    }

    case GET_ALL_WORK: {
      let newState = { ...state, collections: action.data };
      return newState;
    }

    case GET_COLLECTION: {
      let newState = { ...state, collection: action.data.collection }; //?
      return newState;
    }

    case GET_PRIMARY_COLLECTION: {
      //Ideally the collections should be entire collection object not just works
      let newState = {
        ...state,
        primaryCollection: action.data.newCollectionWork
          ? action.data.newCollectionWork
          : action.data.workData,
      }; //?
      return newState;
    }

    case GET_SECONDARY_COLLECTION: {
      let newState = { ...state, secondaryCollection: action.data.workData }; //?
      return newState;
    }

    case GET_SINGLE_WORK: {
      let newState = { ...state, work: action.data };
      return newState;
    }

    case UPLOAD_WORK: {
      let snapshotId = `${action.snapshotId}Collection`;
      // If snapshotId is null then we are uploading to a collection not currently viewed
      // by either snapshot and we can just return the state. Otherwise we need to refresh
      // the correct snapshot view with the new work.
      let newState =
        action.snapshotId === null
          ? { ...state }
          : {
              ...state,
              [snapshotId]: action.data[0].works,
            };
      return newState;
    }

    case UPDATE_WORK: {
      let newState = {
        ...state,
      };
      return newState;
    }

    case SWITCH_COLLECTION: {
      /* What:
        action.origin/destination: primary, secondary or null
        action.data.origin/destination: array of works from a Collection

        This reducer handles sending works to other collections. It logs snapshot Ids and the 
        works associated with that collection through action.origin/destination and 
        action.data.origin/destination respectively.

       Snapshot Ids are passed through our Thunk Creator's request body. Orign and Destination can be
       primary or secondary interchangeably, or null. If the destination is not to a snapshot, it renders it
       as nullCollection. Origin can not be null because it is accessed through a snapshot.

       Why:
       This way a user can click on a work from a snapshot and send it to another collection which may
       or may not be in the other snapshot. If it is, it will re render both, if it isn't, it will only
       re render the origin. */
      let origin = `${action.origin.snapshotId}Collection`;
      let destination = `${action.destination.snapshotId}Collection`;
      let data = {
        ...action.data,
        origin: JSON.parse(action.data.origin),
        destination: JSON.parse(action.data.destination),
      };

      /* The Following Ternary Operator Explained:
      If destination is nullCollection then our destination is NOT a primary or secondary snapshot and we should
      not add it to one of them, but only filter it from our origin. Otherwise, it IS primary or secondary
      and we should add it to the correct snapshot. */
      let newState =
        destination === "nullCollection"
          ? {
              ...state,
              [origin]: data.origin[0].works.filter(
                (work) => work.imgId !== data.work.imgId
              ),
            }
          : {
              ...state,
              [origin]: data.origin[0].works.filter(
                (work) => work.imgId !== data.work.imgId
              ),
              [destination]: [...state[destination], data.work],
            };
      return newState;
    }

    case REORDER_COLLECTION: {
      let snapshotId = `${action.snapshotId}Collection`;
      let newState = {
        ...state,
        [snapshotId]: action.data,
      };
      return newState;
    }

    case ADD_COLLECTION: {
      let newState = {
        ...state,
        primaryCollection: [],
        collections: [...state.collections, action.data.newCollection],
      };
      return newState;
    }

    case UPDATE_COLLECTION: {
      let newState = {
        ...state,
        primaryCollection: action.data.newCollection[0].works,
        collection: action.data.newCollection,
        collections: action.data.collections,
      };
      return newState;
    }

    case HIDDEN_COLLECTION: {
      let collection = action.data;
      let newState = {
        ...state,
        // collection: { ...collection, hidden: collection.hidden ? false : true },
      };
      return newState;
    }

    case REORDER_COLLECTIONS: {
      let newState = {
        ...state,
        collections: state.collections.filter(
          (collection) => collection.id !== action.data.id
        ),
      };
      newState.collections.push(action.data);
      return newState;
    }

    case DELETE_WORK: {
      let snapshotId = `${action.snapshotId}Collection`;
      let newState = {
        ...state,
        [snapshotId]: action.data.filter((work) => work.imgId !== action.imgId),
      };
      return newState;
    }

    case DELETE_COLLECTION: {
      let newState = {
        ...state,
        collections: action.data.collections.filter(
          (collection) => collection !== action.data.collection.title
        ),
        primaryCollection: action.data.collections[1].works,
      };
      return newState;
    }
    default:
      return state;
  }
}
