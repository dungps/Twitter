import { twitter } from "react-native-simple-auth";

import { USER_LOGIN, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS } from "./types";
import { CONSUMER_KEY, CONSUMER_SECRET } from "../config";

export const userLogin = action => {
  return dispatch => {
    dispatch({
      type: USER_LOGIN
    });

    return twitter({
      appId: CONSUMER_KEY,
      appSecret: CONSUMER_SECRET,
      callback: "twitter2://authorize"
    })
      .then(info => {
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: info
        });

        return null;
      })
      .then(() => {
        if (action && typeof action === "function") {
          action.call();
        }
      })
      .catch(err => {
        dispatch({
          type: USER_LOGIN_FAIL,
          payload: err
        });
      });
  };
};
