import NavigationBar from "@components/NavigationBar";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@auth/stores/AuthContext";
import { MdOutlineEdit } from "react-icons/md";
import InputField from "@components/InputField";
import { getUserById, updateUser } from "../services/fetchUserUtils";

function ProfilePage() {
  const { user, setUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [userToEdit, setUserToEdit] = useState(user);

  const editUser = async () => {
    try {
      const updatedUser = await updateUser(userToEdit._id, userToEdit);
      console.log(updatedUser.status);
      if (updatedUser.status === 200) {
        const res = await getUserById(updatedUser.updatedUser._id);
        if (res) {
          setUser(res);
        }
        setUserToEdit(updatedUser.updatedUser);
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };

  return (
    <div className="bg-white text-black min-h-screen pt-20">
      <NavigationBar />
      <div className="m-8 max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-end">
          <button
            className="cursor-pointer"
            onClick={() => {
              setIsEditing(!isEditing);
              setUserToEdit(user);
            }}
          >
            <MdOutlineEdit size={20} />
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-center">My Profile</h1>

        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-neutral text-neutral-content rounded-full flex items-center justify-center text-4xl font-bold">
            {userToEdit?.fullName[0].toUpperCase() ||
              user.fullName[0].toUpperCase()}
          </div>
        </div>

        <div className="space-y-4 pl-4">
          {!isEditing && (
            <p className="text-lg font-semibold">
              Full Name: <span className="font-normal">{user.fullName}</span>
            </p>
          )}
          {isEditing && (
            <InputField
              type="text"
              label="Full Name"
              value={userToEdit.fullName}
              handleInput={(val) =>
                setUserToEdit({ ...userToEdit, fullName: val })
              }
              labelTextColor="blue-500"
              outlineColor="blue-500"
              labelText="lg"
            />
          )}

          <p className="text-lg font-semibold">
            Email: <span className="font-normal">{user.email}</span>
          </p>

          <p className="text-lg font-semibold">
            DOB: <span className="font-normal">{user.dob.split("T")[0]}</span>
          </p>
        </div>

        {isEditing && (
          <div className="flex gap-5 w-full mt-8">
            <button className="btn btn-primary w-1/2" onClick={editUser}>
              Save
            </button>
            <button
              className="btn btn-error w-1/2"
              onClick={() => {
                setUserToEdit(user);
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
