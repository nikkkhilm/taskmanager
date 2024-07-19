import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home d-flex justify-content-center align-items-center">
      <div className="container d-flex justify-content-center align-items-center flex-column">
        <h1 className="text-center">Organize your work & life, Finally</h1>
        <p className="text-center">
          Become focused, oragnized, and calm with <br />
          To Do app. The World's #1 task manager app
        </p>
        <button className="home-btn">Make ToDo List</button>
      </div>
    </div>
  );
};

export default Home;
