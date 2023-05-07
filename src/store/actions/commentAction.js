import { v4 as uuidv4 } from "uuid";
import {
  AddComment
} from "../../services/comments/commentServices";
import { Types } from "../types";
import { setAlert } from "./alertAction";

export const addComment = (comment) => async (dispatch) => {
  try {
    const res = await AddComment(comment);
    console.log(res);
    if (res?.data?.success) {
      dispatch({
        type: Types.comment.POST_COMMENT_SUCCESS,
        payload: res.data.comment,
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
    dispatch({
      type: Types.comment.POST_COMMENT_FAILED,
    });
    dispatch(
      setAlert({
        id: uuidv4(),
        type: "error",
        message: "Error while fectching data",
        alertType: "error",
      })
    );
  }
};
