import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3000/course/preview");
      console.log(response.data);
      setCourses(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="container flex flex-col items-center justify-center text-center w-full bg-gray-50">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold">
          Our Courses
        </h1>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              description={item.description}
              price={item.price}
              author={item.author}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
