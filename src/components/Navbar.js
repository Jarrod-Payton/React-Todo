import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <button>
        <Link to="/">Home</Link>
      </button>
      <button>
        <Link to="/list/new">Create a New List</Link>
      </button>
    </>
  );
}
