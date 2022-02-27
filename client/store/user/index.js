import axios from "axios";

//action types
const GET_USER_DATA = "GET_USER_DATA";
// const GET_SINGLE_WORK = "GET_SINGLE_WORK";
const GET_COLLECTION = "GET_COLLECTION";

//action creators
const loadUserData = (userData) => {
  return { type: GET_USER_DATA, userData };
};

const getCollection = (data) => {
  return { type: GET_COLLECTION, data };
};

// const getSingleWork = (data) => {
//   return { type: GET_SINGLE_WORK, data };
// };
//thunk creators
export const fetchUserData = (username) =>
  async function (dispatch) {
    try {
      let { data } = await axios.get(`/api/users/${username}`);

      dispatch(loadUserData(data));
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

// export const fetchSingleWork = (userId, imgId) =>
//   async function (dispatch) {
//     try {
//       let { data } = await axios.get(`/api/users/${userId}/${imgId}`);
//       dispatch(getSingleWork(data));
//     } catch (err) {
//       return err;
//     }
//   };

//reducer
export default function (state = {}, action) {
  switch (action.type) {
    case GET_USER_DATA: {
      let newState = action.userData;

      return newState;
    }
    // case GET_SINGLE_WORK: {
    //   let newState = action.data;
    //   console.log("newstate store", newState);
    //   return newState;
    // }
    case GET_COLLECTION: {
      let newState = { ...state, collection: action.data }; //?
      return newState;
    }
    default:
      return state;
  }
}
