import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

const categoriesList = [
  "Frontend",
  "Backend",
  "FullStack",
  "Testing",
  "AI",
  "Cybersecurity",
  "Data Science",
  "Web Dev",
  "Cloud",
  "Programming Language",
  "Other",
];

export function PostForm({ newPost, setNewPost }) {
  const { userId, fullName } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    photoUrl: "",
    body: "",
    category: "",
  });

  // console.log("Fullname: ", fullName);
  // console.log("UserId: ", userId);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const dataToSend = {
      title: formData.title,
      photoUrl: formData.photoUrl,
      body: formData.body,
      category: formData.category,
      userId: userId,
      author: {
        name: fullName,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/api/newPost",
        dataToSend
      );

      console.log("Post created successfully:", response.data);
      alert("Post created successfully");
      setNewPost((prev) => (prev = !prev));
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Error: ", error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Title */}
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-5 ">
          <h2 className="text-base font-semibold leading-7 text-gray-900 mt-5">
            Create New Post
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-900"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>

        {/* Photo URL */}
        <div className="my-4">
          <label
            htmlFor="photoUrl"
            className="block text-sm font-medium text-gray-900"
          >
            Photo URL
          </label>
          <input
            type="text"
            id="photoUrl"
            name="photoUrl"
            placeholder="https://sampleimage.com"
            value={formData.photoUrl}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Body */}
        <div className="mb-4">
          <label
            htmlFor="body"
            className="block text-sm font-medium text-gray-900"
          >
            Body
          </label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            rows="4"
            className="mt-1 p-2 border rounded-md w-full"
            required
          ></textarea>
        </div>

        {/* Categories */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900">
            Category
          </label>
          <div className="flex space-x-4">
            {categoriesList.map((category) => (
              <div key={category} className="flex items-center">
                <input
                  type="radio"
                  id={category}
                  name="category"
                  value={category}
                  checked={formData.category === category}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor={category} className="text-sm text-gray-900">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={() => setNewPost((prev) => (prev = !prev))}
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Post
          </button>
        </div>
      </div>
    </form>
  );
}
