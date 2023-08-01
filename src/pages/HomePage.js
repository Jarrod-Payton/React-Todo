import { Link } from "react-router-dom";
export default function HomePage() {
  return (
    <>
      <h1>Hello There Welcome To Jarrod P's Todos</h1>
      <h2>This is a react project</h2>
      <button>
        <Link to="/list/1">List</Link>
      </button>
      <button>
        <Link to="/list/3">List 3</Link>
      </button>
    </>
  );
}
