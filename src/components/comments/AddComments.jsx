import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { addComment } from "../../store/actions/commentAction";
import CommentsList from "./CommentsList";
import { setAlert } from "../../store/actions/alertAction";

const Comments = () => {
  const [input, setInput] = useState("");
  const { blogId } = useParams();

  const { isAuth } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const postComment = (e) => {
    e.preventDefault();
    if (!input) {
      dispatch(
        setAlert({
          id: uuidv4(),
          type: "warning",
          message: "Comment can not be empty",
          alertType: "warning",
        })
      );
      return;
    }
    const payload = { comment: input, blogId };
    dispatch(addComment(payload));
    setInput("");
  };
  return (
    <div>
      <div>
        {isAuth ? (
          <form className="flex justify-between" onSubmit={postComment}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              className="w-[calc(100%-50px)] border rounded-md px-2 py-1 outline-none hover:border-gray-300"
              placeholder="write your first comment"
            />
            <Button variant="text" color="secondary" type="submit">
              Add
            </Button>
          </form>
        ) : (
          <h1></h1>
        )}
      </div>
      <CommentsList />
    </div>
  );
};

export default Comments;
