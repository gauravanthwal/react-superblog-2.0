import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewBlog } from "../../store/actions/blogAction";
import { useNavigate } from "react-router-dom";
import RichTextEditor from "react-rte";
import TextEditor from "./TextEditor";

const CreateBlog = () => {
  const [postImage, setPostImage] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState(RichTextEditor.createEmptyValue());

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createNewBlog({ title, body, coverImageURL: postImage }));
    navigate("/");
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64);
    setPostImage(base64);
  };

  return (
    <div className="mt-4 p-4">
      <form className="max-w-[800px] mx-auto" onSubmit={onSubmit}>
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Cover Image
          </label>
          <input
            className="block p-1 w-full mb-3 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-200 focus:outline-none "
            id="small_size"
            type="file"
            onChange={(e) => handleFileUpload(e)}
          />
        </div>
        <div className="mb-6">
          <TextEditor onChange={setBody} />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
