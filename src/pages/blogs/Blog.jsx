import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBlogById } from "../../store/actions/blogAction";
import AddComments from "../../components/comments/AddComments";

const Blog = () => {
  const { blogId } = useParams();
  const dispatch = useDispatch();

  const { blog, blogLoading } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getBlogById(blogId));
  }, []);

  return (
    <div className="p-5 max-w-[800px] mx-auto">
      {blogLoading && <Skeleton />}
      <h1 className="text-2xl text-gray-700 font-bold text-center my-3">
        {blog?.title}
      </h1>

      {blog.coverImageURL && (
        <div className="flex justify-center max-h-[300px] my-4">
          <img src={blog.coverImageURL} alt={blog.title} />
        </div>
      )}

      <div dangerouslySetInnerHTML={{ __html: blog?.body }}></div>

      <div className="my-8">
        <p className="text-gray-500 text-sm text-right font-semibold underline">Created by <span className="font-bold">{blog?.createdBy?.fullName}</span></p>
      </div>
      <div className="border border-gray-300 my-4"></div>
      <AddComments />
    </div>
  );
};

export default Blog;

const Skeleton = () => {
  return (
    <div role="status" className="max-w-[800px] animate-pulse">
      <div className="h-6 bg-gray-200 rounded-full w-48 mb-6"></div>
      <div className="h-2 bg-gray-200 rounded-full max-w-[660px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full max-w-[520px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full max-w-[630px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full max-w-[500px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full max-w-[560px]"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
