import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

const CommentsList = () => {
  const { comments } = useSelector((state) => state.blog);

  return (
    <div className="my-4">
      <h1>Comments</h1>
      {comments.length > 0 ? (
        comments.reverse().map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))
      ) : (
        <h1 className="text-sm text-gray-500">No Comments yet</h1>
      )}
    </div>
  );
};

const Comment = ({ comment }) => {
  const date = new Date(comment.createdAt);
  const formatedDAte = date.toLocaleString();
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={comment.createdBy.profileImageURL} />
        </ListItemAvatar>
        <ListItemText
          primary={comment.createdBy.fullName}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {comment.content}
              </Typography>
              <Typography fontSize={12}>{formatedDAte}</Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default CommentsList;
