import axios from "axios";

//action types
const GET_USER_DATA = "GET_USER_DATA";

//action creators
const loadUserData = (userData) => {
  return { type: GET_USER_DATA, userData };
};

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

//reducer
export default function (state = {}, action) {
  switch (action.type) {
    case GET_USER_DATA: {
      let newState = action.userData;

      return newState;
    }
    default:
      return state;
  }
}
