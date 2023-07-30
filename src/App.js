import "./App.css";
import TodoList from "./components/TodoList";
import { useState, useRef, useEffect } from "react";
import { idService } from "./services/IdService";
import { todoService } from "./services/TodoService";

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

  async function handleAddTodo(e) {
    const todoName = todoNameRef.current.value;
    const todoId = await idService.makeId(todos);
    if (todoName !== "") {
      console.log(todoName);
      setTodos((previousTodos) => {
        const newTodos = [
          ...previousTodos,
          { id: todoId, name: todoName, complete: false },
        ];
        return newTodos;
      });
      todoNameRef.current.value = "";
    }
  }

  function clearCompletedTodos(e) {
    const filteredTodos = todos.filter((todo) => !todo.complete);
    setTodos(filteredTodos);
  }

  return (
    <>
      <TodoList todoList={todos} completeTodo={completeTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={clearCompletedTodos}>Clear Completed</button>
      <div>{todos.filter((todo) => !todo.complete).length} left todo</div>
    </>
  );
}

export default App;
