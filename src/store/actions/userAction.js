import { v4 as uuidv4 } from "uuid";
import { Types } from "../types";
import {
  GetUserDetails,
  LoginUser,
  RegisterUser,
  UpdateUserProfile,
} from "../../services/users/userServices";
import { setAlert } from "./alertAction";
import { removeFromStorage, setStorage } from "../../utils/storage";

export const loginUser = (user) => async (dispatch) => {
  try {
    const res = await LoginUser(user);
    if (res?.data?.success) {
      dispatch({
        type: Types.user.LOGIN_USER_SUCCESS,
        payload: res.data.user,
      });
      setStorage("auth", true);
      setStorage("token", res.data.user.token);
    }
    if (res.error) {
      dispatch(
        setAlert({
          id: uuidv4(),
          type: "error",
          message: res.message,
          alertType: "error",
        })
      );
    }
  } catch (err) {
    dispatch({
      type: Types.user.LOGIN_USER_FAILED,
    });
    dispatch(
      setAlert({
        id: uuidv4(),
        type: "error",
        message: "Error while login",
        alertType: "error",
      })
    );
  }
};

export const registerUser = (user) => async (dispatch) => {
  try {
    const res = await RegisterUser(user);
    if (res?.data?.success) {
      dispatch({
        type: Types.user.SIGNUP_USER_SUCCESS,
        // payload: res.data.user,
      });
      dispatch(
        setAlert({
          id: uuidv4(),
          type: "success",
          message: "Registration Completed, Please Sign in.",
          alertType: "success",
        })
      );
    }
    if (res.error) {
      dispatch(
        setAlert({
          id: uuidv4(),
          type: "error",
          message: res.message,
          alertType: "error",
        })
      );
    }
  } catch (err) {
    console.log("err", err);
    dispatch({
      type: Types.user.SIGNUP_USER_FAILED,
    });
    dispatch(
      setAlert({
        id: uuidv4(),
        type: "error",
        message: "Error while SingnUp",
        alertType: "error",
      })
    );
  }
};

export const getUserDetails = () => async (dispatch) => {
  try {
    const res = await GetUserDetails();
    if (res?.data?.success) {
      let payloadResponse = { profileImageURL: { url: "" } };
      payloadResponse.profileImageURL.url =
        res.data.userDetails.profileImageURL;
      dispatch({
        type: Types.user.GET_USER_SUCCESS,
        payload: { ...res.data.userDetails, ...payloadResponse },
      });
    }
    if (res.error) {
      dispatch(
        setAlert({
          id: uuidv4(),
          type: "error",
          message: res.message,
          alertType: "error",
        })
      );
    }
  } catch (err) {
    console.log("err", err);
    dispatch({
      type: Types.user.GET_USER_FAILED,
    });
    dispatch(
      setAlert({
        id: uuidv4(),
        type: "error",
        message: "Error while fetching details",
        alertType: "error",
      })
    );
  }
};
export const updateUserProfile = (user) => async (dispatch) => {
  try {
    const res = await UpdateUserProfile(user);
    if (res?.data?.success) {
      dispatch({
        type: Types.user.UPDATE_USER_SUCCESS,
      });
      dispatch(getUserDetails());
    }
    if (res.error) {
      dispatch(
        setAlert({
          id: uuidv4(),
          type: "error",
          message: res.message,
          alertType: "error",
        })
      );
    }
  } catch (err) {
    console.log("err", err);
    dispatch({
      type: Types.user.UPDATE_USER_FAILED,
    });
    dispatch(
      setAlert({
        id: uuidv4(),
        type: "error",
        message: "Error while Updating Profile",
        alertType: "error",
      })
    );
  }
};

export const updateUserFromStorage = () => async (dispatch) => {
  dispatch({
    type: Types.user.UPDATE_USER_SUCCESS,
  });
};

export const logoutUser = () => async (dispatch) => {
  dispatch({
    type: Types.user.LOGOUT_USER,
  });
  removeFromStorage("auth");
  removeFromStorage("token");
};
