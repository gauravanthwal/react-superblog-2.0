import React from "react";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useDispatch } from "react-redux";
import { deleteBlogById } from "../../store/actions/blogAction";

const defaultImage =
  "https://images.unsplash.com/34/BA1yLjNnQCI1yisIZGEi_2013-07-16_1922_IMG_9873.jpg?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8&w=1000&q=80";
const BlogCard = ({
  blog: { title, body, coverImageURL, createdAt, createdBy, _id },
  isAdmin = false,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const formatedDate = new Date(createdAt).toLocaleString();

  const removeBlog = (id) => {
    dispatch(deleteBlogById(id));
  };
  return (
    <div className="shadow-card flex flex-col rounded-xl bg-white bg-clip-border mt-12 max-w-[300px] justify-self-center">
      <div className="mx-4 -mt-6 translate-y-0 flex justify-center">
        <Link to={`/blog/${_id}`}>
          <img
            className="w-auto rounded-lg max-h-52"
            src={coverImageURL ? coverImageURL : defaultImage}
            alt="card image"
          />
        </Link>
      </div>
      <div className="text-secondary flex-1 p-6 flex flex-col justify-between">
        <Link to={`/blog/${_id}`}>
          <h4 className="font-medium">{title}</h4>
        </Link>
        <p
          className="opcacity-60"
          dangerouslySetInnerHTML={{
            __html: body.length > 80 ? body.substring(0, 80) + "..." : body,
          }}
        ></p>
        <div className="">
          <p className="mb-3 text-gray-400">
            <small>{`Posted on ${formatedDate}`}</small>
          </p>
          <div className="flex justify-between">
            <Link
              to={`/blog/${_id}`}
              className="middle none center rounded-lg bg-rose-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Read More
            </Link>
            {isAdmin && (
              <div className="">
                {/* <IconButton aria-label="update">
                  <ModeEditOutlineOutlinedIcon />
                </IconButton> */}
                <IconButton aria-label="delete" onClick={handleClickOpen}>
                  <DeleteIcon />
                </IconButton>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Dialog box */}

      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Delete blog confirmation"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure? you want to delete this post, you will not be able
              to restore it later.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={() => removeBlog(_id)}>Delete</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default BlogCard;
