import React, { useState, useEffect, useRef } from "react";

// todo form
const TodoForm = (props) => {
  const [postTodo, setPostTodo] = useState({
    todoText: "",
    todoDone: false,
  });

  const inputRef = useRef(null);

  // focus 용
  // useEffect(() => {
  //   inputRef.current.focus();
  // }, [postTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (postTodo.todoText === "") {
      if (props.isEdit || props.todoList.id === 0) {
        props.openNoInputModal();
      } else {
        props.openPleaseEditModal();
      }
    }

    // id는 랜덤생성, text는 input에서 전달받은 value
    // props.onSubmit({
    //   id: Math.floor(Math.random() * 10000),
    //   text: postTodo.todoText,
    // });

    props.onSubmit({
      todoText: postTodo.todoText,
      todoDone: false,
    });

    // Input 초기화
    setPostTodo({
      todoText: "",
      todoDone: false,
    });
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <pre>{JSON.stringify(postTodo)}</pre>
      {props.edit ? (
        <>
          <input
            type="text"
            placeholder="Update your item"
            value={postTodo.todoText}
            name="text"
            className="todo-input edit"
            onChange={(e) =>
              setPostTodo({ ...postTodo, todoText: e.target.value })
            }
            ref={inputRef}
          />
          <button className="todo-btn edit" type="submit">
            Update
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Add a todo"
            value={postTodo.todoText}
            name="text"
            className="todo-input"
            onChange={(e) =>
              setPostTodo({ ...postTodo, todoText: e.target.value })
            }
            ref={inputRef}
          />
          <button className="todo-btn" type="submit">
            Add todo
          </button>
        </>
      )}
    </form>
  );
};

export default TodoForm;
