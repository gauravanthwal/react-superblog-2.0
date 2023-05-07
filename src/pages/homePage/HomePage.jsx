import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "../../components/blogs/BlogCard";
import { getAllBlogs } from "../../store/actions/blogAction";

const HomePage = () => {
  const { blogs } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);
  return (
    <div className="container p-4">
      <div className="flex flex-wrap justify-center items-center">
        {blogs.length > 0 &&
          blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)}
      </div>
    </div>
  );
};

export default HomePage;
