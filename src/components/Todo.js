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
  todoList,
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

  // if (edit.id) {
  //   return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  // }

  return todos.map((todo, index) => {
    // todo의 text 중에 빈 text가 있으면 null을 return 해서 아예 목록 보이지 않도록 한다
    if (todo.todoText === "") return null;
    return (
      <div
        className={todo.isComplete ? "todo-row complete" : "todo-row"}
        key={index}
      >
        <div key={todo._id} onClick={() => completeTodo(todo._id)}>
          {todo.todoText}
        </div>
        {/* edit 중일 때만 icons 보이기 */}
        {isEdit && (
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
        )}
      </div>
    );
  });
};

export default Todo;
