import Todo from "./Todo";

function LoopedTodos({ todoList, completeTodo }) {
  return todoList.map((todo) => {
    return <Todo key={todo.id} completeTodo={completeTodo} todo={todo} />;
  });
}

export default function TodoList({ todoList, completeTodo }) {
  return (
    <div className="mx-3">
      {/* <div className="text-lg mb-2 underline font-bold">
        {todoList.filter((todo) => !todo.complete).length} tasks left to
        complete!
      </div> */}
      <LoopedTodos todoList={todoList} completeTodo={completeTodo} />
    </div>
  );
}
