import TodoList from "../components/TodoList";
import { useState, useRef, useEffect } from "react";
import { idService } from "../services/IdService";
import { localStorageService } from "../services/LocalStorageService";
import { useParams } from "react-router-dom";

export default function ListPage() {
  const { listId } = useParams();

  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const grabTodos = async () => {
      const storedTodos = await localStorageService.getTodosByListId(listId);
      if (storedTodos) {
        setTodos(storedTodos);
        console.log(storedTodos);
        console.log(listId);
      }
    };
    grabTodos();
  }, []);
  // We use an empty array here so that it calls it once on load but because there is nothing in the array there is nothing to change so it never calls it again

  useEffect(() => {
    const updateTodos = async () => {
      await localStorageService.updateTodosByListId(listId, todos);
      // console.log("Use Effect Completed");
    };
    updateTodos();
  }, [todos]);

  async function completeTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  async function handleAddTodo(e) {
    const todoName = todoNameRef.current.value;
    const todoId = await idService.makeId(todos);
    if (todoName !== "") {
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

  async function clearCompletedTodos(e) {
    const filteredTodos = todos.filter((todo) => !todo.complete);
    setTodos(filteredTodos);
    if (filteredTodos.length < 1) {
      await localStorageService.clearTodosByListId(listId);
    }
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
