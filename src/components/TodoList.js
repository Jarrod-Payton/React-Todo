import Todo from "./Todo";

function LoopedTodos({ todoList, completeTodo }) {
  return todoList.map((todo) => {
    return <Todo key={todo.id} completeTodo={completeTodo} todo={todo} />;
  });
}

export default function TodoList({ todoList, completeTodo }) {
  return (
    <div>
      <div>{todoList.filter((todo) => !todo.complete).length} left todo</div>
      <LoopedTodos todoList={todoList} completeTodo={completeTodo} />
    </div>
  );
}
