import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import axios from "axios";

export default function BlogDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Fetch blog post details using the id parameter
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:3001/api/post/${id}`);
      const data = response.data;
      setPost(data);
    };
    try {
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [id]);
  return (
    <>
      <main className="mt-10 px-10">
        <div className="mb-4 md:mb-0 w-full mx-auto relative">
          <div className="px-4 lg:px-0">
            <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
              {post?.title}
            </h2>
            <a
              href={`${post?.category}`}
              className="py-2 text-green-700 inline-flex items-center justify-center mb-2"
            >
              {post?.category}
            </a>
          </div>

          <img
            src={
              post?.photoUrl
                ? post?.photoUrl
                : "https://www.mckinsey.com/spContent/bespoke/tech-trends-2023-hero-nav/techtrends-hero-desktop.jpg"
            }
            className="w-full object-cover lg:rounded"
            style={{ height: "28em" }}
            alt="img"
          />
        </div>

        <div className="flex flex-col lg:flex-row lg:space-x-12">
          <div className="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">
            <p className="pb-6 text-justify">{post?.body}</p>
          </div>

          <div className="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
            <div className="p-4 border-t border-b md:border md:rounded">
              <p className="font-bold">Author</p>
              <div className="flex py-2">
                <FaCircleUser className="h-5 w-5 p-1" />
                <div>
                  <p className="font-semibold text-gray-700 text-sm">
                    {" "}
                    {post?.author.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
