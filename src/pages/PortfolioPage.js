import React from "react";

export default function PortfolioPage() {
  return (
    <>
      <div
        class="relative h-screen flex items-center justify-center bg-cover bg-center text-center"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/260689/pexels-photo-260689.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)",
        }}
      >
        <div class="absolute top-0 right-0 bottom-0 left-0 bg-gray-900 opacity-75"></div>

        <div class="z-50 flex flex-col justify-center items-center text-white w-full h-screen">
          <span class="text-bold">MyBlog</span>
          <h1 class="text-5xl">
            We are <b>Almost</b> there!
          </h1>
          <p>Stay tuned for something amazing!!!</p>
        </div>
      </div>
    </>
  );
}
