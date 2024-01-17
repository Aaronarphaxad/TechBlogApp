// AdminPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdEdit, MdDelete } from "react-icons/md";
import CustomModal from "../components/CustomModal";

const AdminPage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editedPost, setEditedPost] = useState({
    title: "",
    body: "",
    category: "",
    photoUrl: "",
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/getAllPosts"
        );
        const { data } = response;
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, [posts]);

  // Function to update current edits
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPost((prev) => ({ ...prev, [name]: value }));
  };

  // Function to submit put request to update post
  const handleUpdate = async (e) => {
    e.preventDefault();
    const url = `http://localhost:3001/api/updatePost/${selectedPost?._id}`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedPost),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);

      alert("Updated");
      closeEditModal();
      setEditedPost({});
    } catch (error) {
      console.log(error);
      alert("Unable to update. Try again");
    }
  };

  // Function to delete post
  const handleDelete = (postId) => {
    // Show a confirmation dialog before proceeding with the delete
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (isConfirmed) {
      axios
        .delete(`http://localhost:3001/api/deletePost/${postId}`)
        .then((response) => {
          console.log("Post deleted successfully:", response.data);
          alert("Deleted");
        })
        .catch((error) => {
          console.error("Error deleting post:", error.message);
          alert("Error deleting post, try again");
        });
    }
  };

  const openEditModal = (postId) => {
    const postToEdit = posts.find((post) => post._id === postId);
    setSelectedPost(postToEdit);
    setEditedPost({
      title: postToEdit?.title || "",
      body: postToEdit?.body || "",
      photoUrl: postToEdit?.photoUrl || "",
      category: postToEdit?.category || "",
    });
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 text-center my-3">
        Admin Page
      </h1>
      <h3 className="mx-3">
        Number of items: <strong>{posts.length}</strong>
      </h3>
      <table className="min-w-full border border-gray-300">
        <thead className="border">
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b border-r text-left">Title</th>
            <th className="py-2 px-4 border-b border-r text-left">Category</th>
            <th className="py-2 px-4 border-b border-r text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{post.title}</td>
              <td className="py-2 px-4 border-b">{post.category}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => openEditModal(post._id)}
                  className="text-blue-500 hover:underline mr-2"
                >
                  <MdEdit />
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="text-red-500 hover:underline"
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <CustomModal isOpen={isModalOpen} onClose={closeEditModal}>
        {selectedPost && (
          <form onSubmit={handleUpdate}>
            {/* Title input */}
            <div>
              <label htmlFor="title">Title: </label>
              <input
                type="text"
                id="title"
                name="title"
                value={editedPost?.title}
                onChange={handleInputChange}
                className="border my-2 p-1"
              />
            </div>

            {/* PhotoUrl input */}
            <div>
              <label htmlFor="title">Photo Url: </label>
              <input
                type="text"
                id="photoUrl"
                name="photoUrl"
                value={editedPost?.photoUrl}
                onChange={handleInputChange}
                className="border my-2 p-1"
              />
            </div>

            {/* Body textarea */}
            <div>
              <label htmlFor="body">Body: </label>
              <textarea
                id="body"
                name="body"
                value={editedPost?.body}
                onChange={handleInputChange}
                className="border mt-2 p-1"
              />
            </div>

            {/* Category input */}
            <div>
              <label htmlFor="category">Category: </label>
              <input
                type="text"
                id="category"
                name="category"
                className="border my-2 p-1"
                value={editedPost?.category}
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-2 flex justify-center">
              <button onClick={closeEditModal} className="underline font-bold">
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 ml-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </CustomModal>
    </div>
  );
};

export default AdminPage;
