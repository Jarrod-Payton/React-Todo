import TodoList from "../components/TodoList";
import { useState, useRef, useEffect } from "react";
import { idService } from "../services/IdService";
import { localStorageService } from "../services/LocalStorageService";
import { useNavigate, useParams } from "react-router-dom";

export default function ListPage() {
  const { listId } = useParams();
  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);
  const [list, setList] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const onLoad = async () => {
      const storedTodos = await localStorageService.getTodosByListId(listId);
      if (storedTodos) {
        setTodos(storedTodos);
      }
      const list = await localStorageService.getListById(listId);
      console.log("LIST", list);
      if (list) {
        setList(list);
      } else {
        navigate("/");
      }
    };
    onLoad();
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
    <div>
      <h1 className="text-2xl text-center w-full bg-gray-600 text-white p-5 font-mono">
        {list.name}
      </h1>
      <div className="flex justify-evenly mb-3 p-2 pb-4 bg-gray-600">
        <button
          className="w-3/12 text-md bg-gray-300 p-2 rounded-l-2xl hover:bg-gray-500 hover:text-white"
          onClick={handleAddTodo}
        >
          Add Todo
        </button>
        <input
          className="w-6/12 pl-2 focus:outline-none text-md"
          placeholder="Task..."
          ref={todoNameRef}
          type="text"
        />
        <button
          className="w-3/12 text-md bg-red-200 hover:bg-red-500 hover:text-white p-2 rounded-r-2xl"
          onClick={clearCompletedTodos}
        >
          Clear Completed
        </button>
      </div>
      <TodoList todoList={todos} completeTodo={completeTodo} />
    </div>
  );
}
