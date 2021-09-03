import React, { useState, useEffect, useRef } from "react";

// todo form
const TodoForm = (props) => {
  const [input, setInput] = useState(props.edit ? props.edit.value : ""); // 입력값
  // 입력값이 원래 있으면(edit하려고 했을 떄는 value가 있으니까) 입력값을 set하고
  // 없으면 추가하는 것으로 간주하고 빈 string으로 set

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [input]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (input === "") {
    //   if (props.isEdit || props.todoList.id === 0) {
    //     props.openNoInputModal();
    //   } else {
    //     props.openPleaseEditModal();
    //   }
    // }

    // 다른 component로 data 전달
    // id는 랜덤생성, text는 input에서 전달받은 value
    // 근데 이건 뭐지 .onSubmit은 뭐야
    // 여기서 TodoList.js에 있는 addTodo로 todo를 넘겨주어서 항목 생성
    // props.onSubmit({
    //   id: Math.floor(Math.random() * 10000),
    //   text: input,
    // });

    // // Input 초기화
    // setInput("");

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: props.postTodo.todoText,
    });

    props.setPostTodo({
      todoText: "",
      todoDone: false,
    });
  };

  // useEffect(() => {
  //   console.log(props.postTodo);
  // }, [props.postTodo]);

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <pre>{JSON.stringify(props.postTodo)}</pre>
      {props.edit ? (
        <>
          <input
            type="text"
            placeholder="Update your item"
            value={input}
            name="text"
            className="todo-input edit"
            onChange={handleChange}
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
            // value={input} // 이렇게 하면 한 글자만 입력됨
            value={props.postTodo.todoText}
            name="text"
            className="todo-input"
            // onChange={handleChange}
            onChange={(e) =>
              props.setPostTodo({ ...props.postTodo, todoText: e.target.value })
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
