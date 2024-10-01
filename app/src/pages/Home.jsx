import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Courses from "../components/Courses";

const Home = () => {
  return (
    <main className=" container h-screen w-screen bggray-50 ">
      <section className=" flex flex-col items-center justify-center space-y-40 ">
        <Navbar />
        <Hero />
        <Courses />
      </section>
    </main>
  );
};

export default Home;
