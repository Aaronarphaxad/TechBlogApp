import React from "react";
import { Link } from "react-router-dom";

export default function Blog({ post }) {
  return (
    <article
      key={post._id}
      className="flex max-w-lg flex-col items-start justify-between bg-neutral-50 p-3 rounded shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
    >
      <div className="flex justify-center mx-auto">
        {post.photoUrl ? (
          <img
            src={post.photoUrl}
            alt="Article img"
            className="h-40 w-40 rounded bg-gray-50"
          />
        ) : (
          // <MdOutlineInsertPhoto className="h-20 w-20" />
          <img
            src="https://www.mckinsey.com/spContent/bespoke/tech-trends-2023-hero-nav/techtrends-hero-desktop.jpg"
            className="h-40 w-40 rounded"
            alt="img"
          />
        )}
      </div>

      <div className="group relative">
        <h3 className="mt-3 text-lg text-center font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <a href={`/blog/${post._id}`}>
            <span className="absolute inset-0" />
            {post.title}
          </a>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
          {post.body}
        </p>
        <Link className="underline text-indigo-500" to={`/blog/${post._id}`}>
          Read More
        </Link>
      </div>
      <div className="relative mt-8 flex items-center gap-x-4">
        <div className="text-sm leading-6">
          <p className="font-semibold text-gray-900">
            <small>By </small>
            <span className="absolute inset-0" />
            {post.author.name}
          </p>
          <time dateTime={post.createdAt} className="text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </time>
        </div>
      </div>
    </article>
  );
}
