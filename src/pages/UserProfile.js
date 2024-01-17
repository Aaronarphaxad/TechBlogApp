import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate } from "react-router-dom";

const UserProfileForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullName: "",
    bio: "",
    avatarUrl: "",
    createdAt: "",
  });

  const [isEditable, setIsEditable] = useState(false);
  const [userId, setUserid] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFormData(response.data);
      setUserid(response.data._id);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          // Unauthorized (expired or invalid token)
          alert("Your session has expired. Please log in again.");
          navigate("/");
        } else {
          // Handle other HTTP errors
          alert(
            "An error occurred while fetching user profile. Please try again later."
          );
        }
      }
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []); // Fetch user profile on component mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/user/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("User profile updated successfully");
      setIsEditable(false);
      fetchUserProfile(); // Fetch updated user profile after successful update
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:3001/api/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log("Account deleted successfully");
        logout();
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    }
  };

  return (
    <div className="p-5 flex flex-col justify-center">
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-col justify-center items-center mx-auto"
      >
        <img
          src={formData.avatarUrl}
          alt="avatar"
          className="rounded-full mb-2 bg-orange-50 mx-auto"
          style={{ height: "150px", width: "150px" }}
        />
        {isEditable && (
          <>
            <p className="block mb-2 items-center">Avatar URL</p>
            <input
              type="text"
              name="avatarUrl"
              value={formData.avatarUrl}
              onChange={handleChange}
              className={`bg-gray-100 p-2 mb-2 rounded w-80 ${
                isEditable ? "" : "disabled"
              }`}
              disabled={!isEditable}
            />
          </>
        )}

        <p className="block mb-2 mx-auto">Username</p>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className={`bg-gray-100 p-2 mb-2 rounded w-80 ${
            isEditable ? "" : "disabled"
          }`}
          disabled={!isEditable}
        />
        <p className="block mb-2 mx-auto">Email</p>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`bg-gray-100 p-2 mb-2 rounded w-80`}
          disabled={true}
        />
        <p className="block mb-2 mx-auto">Fullname</p>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="bg-gray-100 p-2 mb-2 rounded w-80"
          disabled={!isEditable}
        />
        <p className="block mb-2 mx-auto">Bio</p>
        <textarea
          type="text"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="bg-gray-100 p-2 mb-2 rounded w-80"
          disabled={!isEditable}
        />

        <p className="block mb-2 mx-auto">User since</p>
        <input
          type="text"
          name="createdAt"
          value={new Date(formData.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZoneName: "short",
          })}
          onChange={handleChange}
          className="bg-gray-100 p-2 mb-2 rounded w-80"
          disabled={true}
        />
        <br />
        <button
          className="btn rounded text-white p-2 bg-indigo-600 font-bold my-2 w-60 mx-auto"
          type="submit"
        >
          Update Profile
        </button>
      </form>
      <button
        className={`btn rounded text-white p-2 font-bold mt-4 w-60 mx-auto ${
          isEditable ? "bg-red-500" : "bg-lime-600"
        }`}
        onClick={() => setIsEditable(!isEditable)}
      >
        {isEditable ? "Cancel" : "Enable edit"}
      </button>
      <button className="m-2 underline font-bold my-3" onClick={handleDelete}>
        Delete account
      </button>
    </div>
  );
};

export default UserProfileForm;
