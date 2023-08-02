import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  let navigate = useNavigate();

  async function routeHome(e) {
    navigate("/");
  }

  async function routeNewList(e) {
    navigate("/list/new");
  }

  return (
    <div className="flex justify-evenly p-5">
      <button
        onClick={routeHome}
        className="mx-2 bg-gray-400 p-2 text-lg rounded-full w-40 shadow-md text-white hover:bg-gray-600"
      >
        Home
      </button>
      <button
        onClick={routeNewList}
        className="mx-2 bg-gray-400 p-2 text-lg rounded-full w-40 shadow-md text-white hover:bg-gray-600"
      >
        Create a List
      </button>
    </div>
  );
}
