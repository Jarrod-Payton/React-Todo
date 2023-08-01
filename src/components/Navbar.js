import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <button>
        <Link to="/">Home</Link>
      </button>
      {/* <button>
        <Link to="/list/1">List</Link>
      </button>
      <button>
        <Link to="/list/3">List 3</Link>
      </button> */}
      <button>
        <Link to="/list/new">New List</Link>
      </button>
    </>
  );
}
