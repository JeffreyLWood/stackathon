import axios from "axios";

//action types
const GET_USER_DATA = "GET_USER_DATA";
// const GET_SINGLE_WORK = "GET_SINGLE_WORK";
const GET_COLLECTION = "GET_COLLECTION";
const DELETE_ACCOUNT = "DELETE_ACCOUNT";

const USERNAME = "USERNAME";
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

const updateUsername = (data) => {
  return { type: USERNAME, data };
};

const deleteUser = (data) => {
  return { type: DELETE_ACCOUNT, data };
};
export const fetchUserData = (username) =>
  async function (dispatch) {
    try {
      let { data } = await axios.get(`/api/users/${username}`);
      dispatch(loadUserData(data));
    } catch (err) {
      return err;
    }
  };
export const fetchUserDataDomain = (domain) =>
  async function (dispatch) {
    try {
      let { data } = await axios.get(`/api/users/domain/${domain}`);
      dispatch(loadUserData(data));
    } catch (err) {
      return err;
    }
  };
export const changeUsername = (user, newUsername) => async (dispatch) => {
  let { data } = await axios.put(`/users/${user.id}/username`, {
    newUsername,
  });
  let { authData } = await axios.put(`/auth/${user.id}/username`, {
    newUsername,
  });
  return dispatch(updateUsername(newUsername));
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

export const destroyAccount = (userId) =>
  async function (dispatch) {
    try {
      let { data } = await axios.delete(`/api/users/${userId}/delete`);
      dispatch(deleteUser(data));
      window.localStorage.removeItem("token");
      history.push("/");
    } catch (err) {
      return err;
    }
  };

//reducer
export default function (state = {}, action) {
  switch (action.type) {
    case GET_USER_DATA: {
      let newState = action.userData;
      return newState;
    }
    case GET_COLLECTION: {
      let newState = { ...state, collection: action.data }; //?
      return newState;
    }
    case USERNAME: {
      let newState = state;
      newState.user = { ...state.user, username: action.data };
      return newState;
    }
    case DELETE_ACCOUNT: {
      let newState = [];
      return newState;
    }
    default:
      return state;
  }
}
