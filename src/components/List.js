import { useNavigate } from "react-router-dom";

// React Conditional Rendering Ladies and Gentlmen (I think)
function Edits({ show, deleteList }) {
  if (show) {
    return (
      <div className="flex justify-between px-2 shadow-sm">
        <button className="text-sm font-bold">Edit</button>
        <button className="hover:text-red-500 font-bold" onClick={deleteList}>
          X
        </button>
      </div>
    );
  } else if (!show) {
    return null;
  }
}

export default function List({ list, deleteListById, allowListEditing }) {
  let navigate = useNavigate();

  async function deleteList() {
    deleteListById(list.id);
  }

  async function buttonClicked(e) {
    navigate(`/list/${list.id}`);
  }

  return (
    <div className="my-3 mx-1">
      <button
        onClick={buttonClicked}
        className="p-2 outline outline-1 shadow-lg rounded-md w-full text-lg font-mono hover:bg-gray-100"
      >
        {list.name}
      </button>
      <Edits show={allowListEditing} deleteList={deleteList} />
    </div>
  );
}
