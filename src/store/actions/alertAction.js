import { Types } from "../types";

export const setAlert = (alert) => (dispatch) => {
  dispatch({
    type: Types.alert.SET_ALERT,
    payload: alert,
  });
};

export const setModal = () => (dispatch) => {
  dispatch({
    type: Types.alert.SET_MODAL,
  });
};

export const removeAlert = (id) => (dispatch) => {
  dispatch({
    type: Types.alert.REMOVE_ALERT,
    payload: id,
  });
};

export const removeModal = () => (dispatch) => {
  dispatch({
    type: Types.alert.REMOVE_MODAL,
  });
};
