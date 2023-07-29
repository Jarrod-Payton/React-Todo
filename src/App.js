import "./App.css";
import TodoList from "./components/TodoList";
import { useState, useRef, useEffect } from "react";

function App() {
  const LOCAL_STORAGE_KEY = "JarrodPsTodoApp.todos";

  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) {
      setTodos(storedTodos);
      console.log(storedTodos);
    }
  }, []);
  // We use an empty array here so that it calls it once on load but because there is nothing in the array there is nothing to change so it never calls it again

  useEffect(() => {
    if (todos.length > 1) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos]);

  function completeTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function makeId() {
    let highestId = 0;
    todos.forEach((todo) => {
      if (todo.id > highestId) {
        highestId = todo.id;
      }
    });
    return (highestId += 1);
  }

  function handleAddTodo(e) {
    const todoName = todoNameRef.current.value;
    if (todoName !== "") {
      console.log(todoName);
      setTodos((previousTodos) => {
        return [
          ...previousTodos,
          { id: makeId(), name: todoName, complete: false },
        ];
      });
      todoNameRef.current.value = "";
    }
  }

  return (
    <>
      <TodoList todoList={todos} completeTodo={completeTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button>Clear Completed</button>
      <div>{todos.filter((todo) => !todo.complete).length} left todo</div>
    </>
  );
}

export default App;
