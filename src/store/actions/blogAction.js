import { v4 as uuidv4 } from "uuid";
import {
  CreateNewBlog,
  DeleteBlogById,
  GetAllBlogs,
  GetBlogById,
  GetMyBlogs,
} from "../../services/blogs/blogServices";
import { Types } from "../types";
import { setAlert } from "./alertAction";

export const getAllBlogs = () => async (dispatch) => {
  try {
    const res = await GetAllBlogs();
    console.log(res);
    if (res?.data?.success) {
      dispatch({
        type: Types.blog.GET_ALL_BLOGS_SUCCESS,
        payload: res.data.blogs,
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
      type: Types.blog.GET_ALL_BLOGS_FAILED,
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

export const getMyBlogs = () => async (dispatch) => {
  try {
    const res = await GetMyBlogs();
    if (res?.data?.success) {
      dispatch({
        type: Types.blog.GET_MY_BLOGS_SUCCESS,
        payload: res.data.myBlogs,
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
      type: Types.blog.GET_MY_BLOGS_FAILED,
    });
    dispatch(
      setAlert({
        id: uuidv4(),
        type: "error",
        message: "Unable to fetch details",
        alertType: "error",
      })
    );
  }
};

export const getBlogById = (blogId) => async (dispatch) => {
  try {
    dispatch({
      type: Types.blog.GET_BLOG_CLEAR,
    });
    dispatch(setLoadingBlog(true));
    const res = await GetBlogById(blogId);
    if (res?.data?.success) {
      dispatch({
        type: Types.blog.GET_BLOG_SUCCESS,
        payload: res.data,
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
    dispatch(setLoadingBlog(false));
  } catch (err) {
    console.log("err", err);
    dispatch({
      type: Types.blog.GET_MY_BLOGS_FAILED,
    });
    dispatch(
      setAlert({
        id: uuidv4(),
        type: "error",
        message: "Unable to fetch blog",
        alertType: "error",
      })
    );
    dispatch(setLoadingBlog(false));
  }
};

export const deleteBlogById = (blogId) => async (dispatch) => {
  try {
    dispatch(setLoadingBlog(true));
    const res = await DeleteBlogById(blogId);
    if (res?.data?.success) {
      dispatch({
        type: Types.blog.DELETE_BLOG_SUCCESS,
        payload: blogId,
      });
      dispatch(
        setAlert({
          id: uuidv4(),
          type: "success",
          message: res.data.message,
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
    dispatch(setLoadingBlog(false));
  } catch (err) {
    console.log("err", err);
    dispatch({
      type: Types.blog.DELETE_BLOG_FAILED,
    });
    dispatch(
      setAlert({
        id: uuidv4(),
        type: "error",
        message: "Unable to Delete blog",
        alertType: "error",
      })
    );
    dispatch(setLoadingBlog(false));
  }
};

export const createNewBlog = (blog) => async (dispatch) => {
  try {
    const res = await CreateNewBlog(blog);
    console.log(res);
    if (res?.data?.success) {
      dispatch({
        type: Types.blog.POST_BLOG_SUCCESS,
        payload: res.data.blog,
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
      type: Types.blog.POST_BLOG_FAILED,
    });
    dispatch(
      setAlert({
        id: uuidv4(),
        type: "error",
        message: err.message,
        alertType: "error",
      })
    );
  }
};

export const setLoadingBlog = (flag) => (dispatch) => {
  dispatch({
    type: Types.blog.GET_BLOG_LOADING,
    payload: flag,
  });
};
