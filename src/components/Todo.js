import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { RiEdit2Fill } from "react-icons/ri";

const Todo = ({
  todos,
  completeTodo,
  removeTodo,
  updateTodo,
  isEdit,
  post,
}) => {
  const [edit, setEdit] = useState({
    todoText: "",
    todoDone: false,
  });

  const submitUpdate = (value) => {
    // updateTodo(edit.id, value); // edit 하려는 post의 id와 value를 넘겨줘야함
    setEdit({
      todoText: "",
      todoDone: false,
    });
  };

  return todos.map((todo, index) => {
    return (
      <div
        className={todo.isComplete ? "todo-row complete" : "todo-row"}
        key={index}
      >
        <div key={todo._id} onClick={() => completeTodo(todo._id)}>
          {todo.todoText}
        </div>
        <div className="icons">
          <RiCloseCircleLine
            onClick={() => removeTodo(todo._id)}
            className="delete-icon"
          />
          <RiEdit2Fill
            onClick={() =>
              setEdit({
                todoText: todo.todoText,
                todoDone: false,
              })
            }
            className="edit-icon"
          />
        </div>
      </div>
    );
  });
};

export default Todo;
