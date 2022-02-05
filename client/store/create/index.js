import axios from "axios";

//action types
const ABOUT = "ABOUT";
const CV = "CV";
const CONTACT = "CONTACT";
const TITLE = "TITLE";
const GET_SINGLE_WORK = "GET_SINGLE_WORK";
const GET_ALL_WORK = "GET_ALL_WORK";
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

const deleteWork = (data) => {
  return { type: DELETE_WORK, data };
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
      let { data } = await axios.get(`/api/users/${userId}`);
      dispatch(getAllWork(data));
    } catch (err) {
      return err;
    }
  };
export const fetchSingleWork = (userId, imgId) =>
  async function (dispatch) {
    try {
      if (userId === null) {
        dispatch(getSingleWork(null));
        return;
      }
      let { data } = await axios.get(`/api/users/${userId}/${imgId}`);
      dispatch(getSingleWork(data));
    } catch (err) {
      return err;
    }
  };

export const destroyWork = (userId, imgId) =>
  async function (dispatch) {
    try {
      let { data } = await axios.delete(`/api/users/${userId}/${imgId}`);
      dispatch(deleteWork(data));
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
    case GET_SINGLE_WORK: {
      let newState = action.data;
      return newState;
    }
    case DELETE_WORK: {
      let newState = action.data;
      return newState;
    }
    default:
      return state;
  }
}
