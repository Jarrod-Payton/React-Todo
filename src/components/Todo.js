export default function Todo({ todo, completeTodo }) {
  function handleTodoToggle() {
    completeTodo(todo.id);
  }

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={handleTodoToggle}
        />
        {todo.name}
      </label>
    </div>
  );
}
