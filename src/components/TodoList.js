import React from "react";
import Todo from "./Todo";

export default function TodoList({ todoList, completeTodo }) {
  return todoList.map((todo) => {
    return <Todo key={todo.id} completeTodo={completeTodo} todo={todo} />;
  });
}
