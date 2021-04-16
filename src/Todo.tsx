import React from "react";
import { useState } from "react";

export default function Todo({
  listId,
  task,
  isComplete,
  handleComplete,
  deleteTodo,
  editTodo,
}: {
  listId: number;
  task: string;
  isComplete: boolean;
  handleComplete: any;
  deleteTodo: any;
  editTodo: any;
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [editTodoInput, setEditTodoInput] = useState(task);

  return (
    <div className="todo-container" data-testid="todo-container">
      <div
        className="todo__is-complete"
        onClick={() => {
          handleComplete(listId);
        }}
      >
        {isComplete ? "☑" : "◻"}
      </div>
      <div
        className="todo__todo-display"
        style={
          isComplete
            ? { textDecoration: "line-through" }
            : { textDecoration: "none" }
        }
      >
        {isEdit ? (
          <input
            value={editTodoInput}
            onChange={(e) => setEditTodoInput(e.target.value)}
          />
        ) : (
          <span>{task}</span>
        )}
      </div>
      <div className="todo__edit-delete">
        {isEdit ? (
          <button
            onClick={() => {
              setIsEdit(!isEdit);
              editTodo(listId, editTodoInput);
            }}
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => {
              setIsEdit(!isEdit);
            }}
          >
            Edit
          </button>
        )}
        <button onClick={() => deleteTodo(listId)}>Delete</button>
      </div>
    </div>
  );
}
