import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BlogCard from "../blogs/BlogCard";

const MyBlogs = () => {
  const navigate = useNavigate();

  const { myBlogs } = useSelector((state) => state.blog);

  return (
    <>
      <div className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center items-center">
        {myBlogs.length > 0 && (
          myBlogs.map((blog) => <BlogCard key={blog._id} blog={blog} isAdmin={true} />)
        )}
      </div>
    </>
  );
};

export default MyBlogs;
