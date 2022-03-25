import axios from "axios";
import history from "../history";

const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";
// const TITLE = "TITLE";

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

// const updateTitle = (titleData) => {
//   return { type: TITLE, titleData };
// };
/**
 * THUNK CREATORS
 */
export const oauth = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  const res = await axios.get("/auth/oauth", {
    headers: {
      authorization: token,
    },
  });

  // history.push("/create/in");
  return dispatch(setAuth(res.data));
};
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    // history.push("/create/in");
    return dispatch(setAuth(res.data));
  }
};

export const authenticate = (userInfo, method) => async (dispatch) => {
  try {
    const res = await axios.post(`/auth/${method}`, {
      userInfo,
    });
    window.localStorage.setItem(TOKEN, res.data.token);
    // history.push(`/create/in/${username}`);
    history.push(`/`);
    dispatch(me());
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push("/");
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    // case TITLE: {
    //   let newState = state;
    //   newState.username = action.titleData;
    //   return newState;
    // }
    default:
      return state;
  }
}
