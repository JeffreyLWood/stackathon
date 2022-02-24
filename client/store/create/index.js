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
const SWITCH_COLLECTION = "SWITCH_COLLECTION";
const DELETE_WORK = "DELETE_WORK";

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

const uploadWork = (data, snapshotId) => {
  return { type: UPLOAD_WORK, data, snapshotId };
};

const updateWork = (data) => {
  return { type: UPDATE_WORK, data };
};

const switchCollection = (data, origin, destination) => {
  return { type: SWITCH_COLLECTION, data, origin, destination };
};

const deleteWork = (snapshotId, data) => {
  return { type: DELETE_WORK, data, snapshotId };
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
      let { data } = await axios.get(`/api/users/work/${userId}`);
      dispatch(getAllWork(data));
    } catch (err) {
      return err;
    }
  };
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

//reducer
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
      let newState = { ...state, works: action.data };
      return newState;
    }
    case GET_COLLECTION: {
      let newState = { ...state, collection: action.data }; //?
      return newState;
    }
    case GET_PRIMARY_COLLECTION: {
      let newState = { ...state, primaryCollection: action.data }; //?
      return newState;
    }
    case GET_SECONDARY_COLLECTION: {
      let newState = { ...state, secondaryCollection: action.data }; //?
      return newState;
    }
    case GET_SINGLE_WORK: {
      let newState = { ...state, work: action.data };
      return newState;
    }
    case UPLOAD_WORK: {
      let primary = `${action.primary}Collection`;
      let secondary = `${action.secondary}Collection`;
      let newState = {
        ...state,
        [primary]: action.data[0].works,
        [secondary]: action.data[1].works,
      };
      return newState;
    }
    //Caught inbetween updating work and updating collection. Need:
    //Update_Work, Switch_Collection, Reorder_Collection
    case UPDATE_WORK: {
      let newState = {
        ...state,
      };
      return newState;
    }

    case SWITCH_COLLECTION: {
      let origin = `${action.origin.snapshotId}Collection`;
      let destination = `${action.destination.snapshotId}Collection`;
      let data = {
        ...action.data,
        origin: JSON.parse(action.data.origin),
        destination: JSON.parse(action.data.destination),
      };

      let newState = {
        ...state,
        [origin]: data.origin[0].works.filter(
          (work) => work.imgId !== data.work.imgId
        ),
        [destination]: [...state[destination], data.work],
      };
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
    default:
      return state;
  }
}
