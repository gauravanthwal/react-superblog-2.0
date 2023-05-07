import { BaseUrl } from "../config";
import axios from "axios";
import { getStorage } from "../../utils/storage";

export const AddComment = async (comment) => {
  try {
    const res = await axios.post(BaseUrl + `blog/comment/${comment.blogId}`, comment, {
      headers: {
        Authorization: `Bearer ${getStorage("token")}`,
      },
    });
    return res;
  } catch (err) {
    console.log("error : ", err?.response?.data);
    return err?.response?.data;
  }
};
