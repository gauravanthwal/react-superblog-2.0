import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const CreateBlog = () => {
  const navigate = useNavigate();

  const { myBlogs } = useSelector((state) => state.blog);

  return (
    <div className="border p-2 rounded-lg">
      {myBlogs.length < 1 && (
        <div className="no-blogs text-center my-4">
          <h2 className="text-gray-800 text-lg">You Don't have any blogs</h2>
          <p className="text-gray-600 text-sm">Start Writing your first blog</p>
        </div>
      )}
      <div className="create-new-blog flex justify-center my-4">
        <Button
          onClick={() => navigate("/create-blog")}
          variant="contained"
          color="secondary"
          startIcon={<AddOutlinedIcon />}
        >
          New Post
        </Button>
      </div>
    </div>
  );
};

export default CreateBlog;
