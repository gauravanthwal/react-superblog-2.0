import { Types } from "../types";

const initialState = {
  showAlert: false,
  alerts: [
    // {
    //   id: "",
    //   message: "",
    //   alertType: "",
    //   type: "",
    // },
  ],
  showModal: false,
};

export const alertReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case Types.alert.SET_ALERT:
      return {
        ...state,
        alerts: [...state.alerts, payload],
      };
    case Types.alert.SET_MODAL:
      return {
        ...state,
        showModal: true,
      };
    case Types.alert.REMOVE_MODAL:
      return {
        ...state,
        showModal: false,
      };
    case Types.alert.REMOVE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert.id !== payload),
      };
    default:
      return state;
  }
};
