import React, { useState, useEffect } from "react";
import BlogSection from "../components/BlogSection";
import NoPage from "./NoPage";
import { useAuth } from "../hooks/AuthContext";
import { PostForm } from "../components/NewPostForm";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState();
  const [newPost, setNewPost] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl =
          process.env.NODE_ENV === "development"
            ? "http://localhost:3001"
            : "https://tech-blog-app-wine.vercel.app/";

        const response = await fetch("http://localhost:3001/api/getAllPosts");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // console.log(data);
        setPosts(data);
      } catch (error) {
        setError(error.message || "An error occurred while fetching data.");
      }
    };

    fetchData();
  }, [newPost, token]);

  if (error) {
    return <NoPage />;
  }
  return (
    <div className="container mx-auto py-2">
      <header className="text-center mb-2">
        <h1 className="text-4xl font-bold text-gray-800">Home</h1>
      </header>
      {token && (
        <button
          onClick={() => setNewPost((prev) => (prev = !prev))}
          disabled={!setNewPost}
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 ml-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {newPost ? "Go back" : "Create New Post"}
        </button>
      )}

      {newPost ? (
        <PostForm newPost={newPost} setNewPost={setNewPost} />
      ) : (
        <>
          <section className="mb-8">
            {/* Featured blog post components */}
            <BlogSection posts={posts} />
          </section>
        </>
      )}
    </div>
  );
}
