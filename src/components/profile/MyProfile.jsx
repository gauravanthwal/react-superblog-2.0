import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cameraIcons, cancelIcon } from "../../assets/icons/icons";
import { updateUserProfile } from "../../store/actions/userAction";

const defaultImg =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";

const MyProfile = () => {
  const { userDetails } = useSelector((state) => state.user);

  const { fullName, email, profileImageURL, role } = userDetails;

  const dispatch = useDispatch();

  const [isEditImage, setIsEditImage] = useState(false);
  const [postImage, setPostImage] = useState({ myFile: "" });

  const [editEmail, setEditEmail] = useState(false);
  const [editFullName, setEditFullName] = useState(false);

  const [inputs, setInputs] = useState({
    fullName: fullName || "",
    email: email || "",
  });

  const handleSubmit = (type) => {
    let payload = {};
    if (type === 1) {
      payload.email = inputs.email;
    } else if (type === 2) {
      payload.fullName = inputs.fullName;
    } else if (type === 3) {
      payload.profileImageURL = postImage;
    }
    payload.type = type;

    dispatch(updateUserProfile(payload));

    closeAllForms();
  };

  const handleOnChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    // console.log(base64);
    setPostImage(base64);
  };

  const closeAllForms = () =>{
    setIsEditImage(false);
    setEditEmail(false);
    setEditFullName(false);
  }

  useEffect(() => {
    setInputs({ fullName, email });
  }, [userDetails]);

  return (
    <div className="border p-2 rounded-lg ">
      <div className="flex justify-center">
        <div className="image rounded-full inline-block items-center  relative bg-red-400">
          <img
            src={`${profileImageURL?.url}`}
            alt=""
            className="w-40 h-40 rounded-full border-4 border-gray-200"
          />
          {!isEditImage && (
            <div className="flex flex-col items-center gap-2 mx-1  bg-gray-200 rounded-full absolute bottom-[10px] right-[8px] hover:bg-white hover:border-2 hover:text-white">
              <button onClick={() => setIsEditImage(!isEditImage)}>
                {isEditImage ? cancelIcon() : cameraIcons()}
              </button>
            </div>
          )}
        </div>
      </div>
      {/* form  */}
      <div className="details flex mt-1 items-center flex-col relative">
        {
          isEditImage && (
            <div className="text-gray-600 flex">
              <input
                className="block p-1 w-full mb-3 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="small_size"
                type="file"
                onChange={(e) => handleFileUpload(e)}
              />
              <div className="flex flex-col items-center gap-2 mx-1">
                <button onClick={() => setIsEditImage(!isEditImage)}>
                  {isEditImage ? cancelIcon() : cameraIcons()}
                </button>
              </div>
              <div>
                <button
                  onClick={() => handleSubmit(3)}
                  className="bg-green-500 rounded-md px-2 py-1 text-white hover:bg-green-400"
                >
                  Save
                </button>
              </div>
            </div>
          )}

        {/* Full Name */}
        <div className="text-gray-600">
          {editFullName ? (
            <div className="flex items-center">
              <label> Name: </label>
              <input
                type="text"
                name="fullName"
                value={inputs?.fullName}
                onChange={handleOnChange}
                className="border rounded-lg p-1 px-3 my-1"
              />
              <div className="flex flex-col items-center gap-2 mx-1">
                <button onClick={() => setEditFullName(!editFullName)}>
                  {editFullName ? cancelIcon() : cameraIcons()}
                </button>
              </div>
              <div>
                <button
                  onClick={() => handleSubmit(2)}
                  className="bg-green-500 rounded-md px-2 py-1 text-white hover:bg-green-400"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <span className="my-3 inline-block">
                {" "}
                Name: <span> {fullName}</span>
              </span>
              <div className="flex flex-col items-center gap-2 mt-2">
                <button onClick={() => setEditFullName(!editFullName)}>
                  {editFullName ? cancelIcon() : cameraIcons()}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Email Address */}
        <div className="text-gray-600">
          {editEmail ? (
            <div className="flex justify-center items-center">
              <label>Email: </label>
              <input
                type="text"
                value={inputs?.email}
                name="email"
                onChange={handleOnChange}
                className="border p-1 px-3 rounded-lg my-1"
              />
              <div className="flex flex-col items-center gap-2 mx-1">
                <button onClick={() => setEditEmail(!editEmail)}>
                  {editEmail ? cancelIcon() : cameraIcons()}
                </button>
              </div>
              <div>
                <button
                  onClick={()=>handleSubmit(1)}
                  className="bg-green-500 rounded-md px-2 py-1 text-white hover:bg-green-400"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <span>
                {" "}
                Email: <span> {email}</span>
              </span>
              <div className="flex flex-col items-center gap-2 mt-2">
                <button onClick={() => setEditEmail(!editEmail)}>
                  {editEmail ? cancelIcon() : cameraIcons()}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

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
