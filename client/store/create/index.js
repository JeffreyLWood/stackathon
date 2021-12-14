import axios from "axios";

//action types
const ABOUT = "ABOUT";
const CV = "CV";
const CONTACT = "CONTACT";
// const TITLE = "TITLE";

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

// const updateTitle = (titleData) => {
//   return { type: TITLE, titleData };
// };

//thunk creators
export const updateAboutText = (userId, textData) =>
  async function (dispatch) {
    try {
      console.log("text store", textData);
      let { data } = await axios.post(`/api/users/${userId}/about`, textData);
      dispatch(updateAbout(data));
    } catch (err) {
      return err;
    }
  };

export const updateCVText = (userId, cvData) =>
  async function (dispatch) {
    try {
      let { data } = await axios.post(`/api/users/${userId}/cv`, cvData);
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

// export const updateTitleData = (userId, titleData) =>
//   async function (dispatch) {
//     try {
//       console.log("title store", titleData);
//       let { data } = await axios.put(`/api/users/${userId}`, titleData);
//       dispatch(updateTitle(data));
//     } catch (err) {
//       return err;
//     }
//   };

//reducer
export default function (state = {}, action) {
  switch (action.type) {
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

    default:
      return state;
  }
}
