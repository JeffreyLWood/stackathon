import axios from "axios";
import history from "../history";

const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";
// const TITLE = "TITLE";
const DELETE_ACCOUNT = "DELETE_ACCOUNT";
const USE_CUSTOM_DOMAIN = "USE_CUSTOM_DOMAIN";
const DELETE_CUSTOM_DOMAIN = "USE_CUSTOM_DOMAIN";
/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

const deleteUser = (data) => {
  return { type: DELETE_ACCOUNT, data };
};

const customDomain = (data) => {
  return { type: USE_CUSTOM_DOMAIN, data };
};

const deleteDomain = (data) => {
  return { type: USE_CUSTOM_DOMAIN, data };
};

/**
 * THUNK CREATORS
 */
export const oauth = () => async (dispatch) => {
  const token = window.localStorage.getItem("TOKEN");

  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    history.push("/");
    return dispatch(setAuth(res.data));
  }
};
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem("token");

  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    history.push("/");
    return dispatch(setAuth(res.data));
  }
};

export const authenticate = (userInfo, method) => async (dispatch) => {
  try {
    let { username, password, email, firstName, lastName } = userInfo;
    const res = await axios.post(`/auth/${method}`, {
      username,
      password,
      email,
      firstName,
      lastName,
    });
    window.localStorage.setItem(TOKEN, res.data.token);
    dispatch(me());
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};

export const logout = () => {
  window.localStorage.removeItem("token");
  history.push("/");
  return {
    type: SET_AUTH,
    auth: {},
  };
};
export const useCustomDomain = (user, domain) =>
  async function (dispatch) {
    try {
      let { data } = await axios.post(`/heroku`, { user, domain });

      dispatch(customDomain(data));
    } catch (err) {
      return err;
    }
  };

export const deleteCustomDomain = (user) =>
  async function (dispatch) {
    try {
      let { data } = await axios.put(`/heroku`, user);

      dispatch(deleteDomain(data));
    } catch (err) {
      return err;
    }
  };
export const destroyAccount = (userId) =>
  async function (dispatch) {
    try {
      let token = window.localStorage("TOKEN");
      await axios
        .delete(`/api/users/${userId}/delete`, { token })
        .then(dispatch(logout()));
    } catch (err) {
      return err;
    }
  };
/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH: {
      return action.auth;
    }

    case USE_CUSTOM_DOMAIN: {
      return { ...state, cname: action.data.cname, domain: action.data.domain };
    }
    case DELETE_CUSTOM_DOMAIN: {
      return { ...state, cname: "", domain: "" };
    }

    case DELETE_ACCOUNT: {
      let newState = [];
      return newState;
    }
    default:
      return state;
  }
}
