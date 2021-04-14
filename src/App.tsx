import "./App.css";
import { useState } from "react";
import Todo from "./Todo";

interface List {
  listId: number;
  task: string;
  isComplete: boolean;
}

function App() {
  // hooks are type coerced
  const [userInput, setUserInput] = useState<string>("");
  const [todos, setTodos] = useState<List[]>([]);
  const [filterVal, setFilterVal] = useState<string>("");

  const generateId = () => {
    let id = Math.ceil(Math.random() * Math.pow(10, 6));
    return id;
  };

  // helper function so users can add tasks with key press and button click
  const addTodo = (e: any) => {
    e.preventDefault();
    if (userInput === "") return;
    const newTodo: List = {
      listId: generateId(),
      task: userInput,
      isComplete: false,
    };

    setTodos([...todos, newTodo]);
    setUserInput("");
  };

  const handleEnter = (e: any) => {
    const code = e.keyCode || e.charCode;
    if (e.key === "Enter" || code === 13) {
      addTodo(e);
    }
  };

  // task features
  const handleComplete = (id: number) => {
    const newList = todos.map((todo) => {
      if (todo.listId === id) {
        todo = { ...todo, isComplete: !todo.isComplete };
      }
      return todo;
    });
    setTodos(newList);
  };

  const deleteTodo = (id: number) => {
    const newList = todos.filter(({ listId }) => id !== listId);
    setTodos(newList);
  };

  const editTodo = (id: number, task: string) => {
    const newList = todos.map((todo) => {
      if (todo.listId === id) {
        if (todo.task !== task) {
          if (todo.isComplete === true) todo.isComplete = false;
          if (task === "") task = todo.task;
          todo = { ...todo, task, isComplete: false };
        }
      }
      return todo;
    });
    setTodos(newList);
  };

  let filteredResult = todos
    .filter((todo) => {
      if (filterVal === "incomplete") return todo.isComplete === false;
      if (filterVal === "complete") return todo.isComplete === true;
      return todo;
    })
    .map(({ listId, task, isComplete }) => {
      return (
        <Todo
          key={listId}
          listId={listId}
          task={task}
          isComplete={isComplete}
          handleComplete={handleComplete}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      );
    });

  return (
    <div className="app">
      <div className="app__todo-container">
        <header>TO DO LIST</header>
        {/* user actions */}
        <section className="app__todo-feature">
          <div className="app__todo-input">
            <form name="add-todo" onSubmit={(e) => addTodo(e)}>
              <input
                placeholder="Add Item"
                value={userInput}
                onKeyUp={(e) => handleEnter(e)}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <button type="submit" value="submit">
                Add task
              </button>
            </form>
          </div>
          <div className="app__todo-filter">
            <label htmlFor="filter-list">Filter list by completion:</label>
            <select onChange={(e) => setFilterVal(e.target.value)}>
              <option value="" disabled>
                Filter by:
              </option>
              <option value="all">View All</option>
              <option value="incomplete">View Incomplete</option>
              <option value="complete">View Complete</option>
            </select>
          </div>
        </section>
        {/* end user actions */}
        <main className="app__todo-content">{filteredResult}</main>
      </div>
    </div>
  );
}

export default App;
