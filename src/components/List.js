import { Link } from "react-router-dom";

// React Conditional Rendering Ladies and Gentlmen (I think)
function DeleteButton({ show, deleteList }) {
  if (show) {
    return <button onClick={deleteList}>X</button>;
  } else if (!show) {
    return null;
  }
}

export default function List({ list, deleteListById, allowListEditing }) {
  async function deleteList() {
    deleteListById(list.id);
  }
  return (
    <div>
      <label>
        <Link to={`/list/${list.id}`}>{list.name}</Link>
      </label>
      <DeleteButton show={allowListEditing} deleteList={deleteList} />
    </div>
  );
}
