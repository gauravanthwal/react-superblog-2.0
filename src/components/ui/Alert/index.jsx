import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeAlert } from "../../../store/actions/alertAction";
import Alert from "@mui/material/Alert";

const BasicAlert = ({ alert, timer = true, closable = true }) => {
  const { message, type } = alert;
  const dispatch = useDispatch();

  useEffect(() => {
    if (timer) {
      setTimeout(() => {
        dispatch(removeAlert(alert.id));
      }, 7000);
    }
  }, []);

  const closeAlert = () => {
    dispatch(removeAlert(alert.id));
  };
  return (
    <div className="p-2">
      <Alert severity={type} onClose={closeAlert}>{message}</Alert>
    </div>
  );
};

export default BasicAlert;
