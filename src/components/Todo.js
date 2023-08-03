export default function Todo({ todo, completeTodo }) {
  function handleTodoToggle() {
    completeTodo(todo.id);
  }

  function nothing() {
    console.log();
  }

  // This is to conditionally render the line-through className
  let todoName = todo.complete ? (
    <h2 className="mx-2 text-md line-through">{todo.name}</h2>
  ) : (
    <h2 className="mx-2 text-md">{todo.name}</h2>
  );

  return (
    <div className="w-full my-3">
      <button
        onClick={handleTodoToggle}
        className="flex items-center justify-start w-fit p-1 rounded-lg px-3 hover:bg-slate-200 hover:cursor-pointer"
      >
        <input type="checkbox" onChange={nothing} checked={todo.complete} />
        {todoName}
      </button>
    </div>
  );
}
