import React from "react";

const Hero = () => {
  return (
    <div className=" container  w-full bg-white shadow-sm mx-auto lg:w-[70vw]  ">
      <div className=" flex flex-col  items-center justify-center text-center space-y-3 m-4  ">
        <h1 className="text-3xl md:text-4xl  font-bold lg:text-6xl  ">
          Welcome to our course platform
        </h1>
        <p className=" text-gray-400 text-lg  text-center m-auto md:text-xl lg:text-2xl ">
          Expand your knowledge and skills with our expert-led courses. Start
          your learning journey today!
        </p>
        <span>
          <button className=" h-10 bg-black text-white w-36 rounded-lg m-2 font-medium cursor-pointer lg:h-14  ">
            Browse Courses
          </button>
          <button className=" h-10 text-black border-2  w-28 rounded-lg m-2 font-medium cursor-pointer hover:bg-black hover:text-white  lg:h-14   ">
            Learn More
          </button>
        </span>
      </div>
    </div>
  );
};

export default Hero;
