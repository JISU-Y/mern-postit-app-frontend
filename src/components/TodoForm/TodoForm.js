import React, { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTodoAction, updateTodoAction } from "../../redux"

import styles from "./TodoForm.module.css"

// todo form
const TodoForm = (props) => {
  const post = useSelector((state) => state.post)
  const dispatch = useDispatch()
  const [postTodo, setPostTodo] = useState({
    todoText: props.isTodoEdit ? props.editTodo.todoText : "",
    todoDone: false,
  })

  const inputRef = useRef(null)

  const handleAddSubmit = (e) => {
    e.preventDefault()

    // 알림
    if (postTodo.todoText === "") {
      if (props.isEdit || props.post.id === 0) {
        props.openNoInputModal()
      }
    }

    // 지금 state에 있는 post의 todos 수정해달라는 요청(여기서 사용자에게 입력받은 todo 전달)
    dispatch(addTodoAction(postTodo))
    console.log(postTodo, post.todos)

    // Input 초기화
    setPostTodo({
      todoText: "",
      todoDone: false,
    })
  }

  const handleUpdateSubmit = (e) => {
    e.preventDefault()

    // 알림
    if (postTodo.todoText === "") {
      if (props.isEdit || props.post.id === 0) {
        props.openNoInputModal()
      }
    }

    dispatch(
      updateTodoAction(props.editTodo._id, {
        ...props.editTodo,
        todoText: postTodo.todoText,
      })
    )

    // props.onUpdateSubmit(props.todo._id, {
    //   todoText: postTodo.todoText,
    //   todoDone: false,
    // })

    // Input 초기화
    setPostTodo({
      todoText: "",
      todoDone: false,
    })
  }

  // edit / add input 합치기..!
  return props.isTodoEdit ? (
    <form autoComplete="off" className={styles.todoForm} onSubmit={handleUpdateSubmit}>
      <input
        className={`${styles.todoInput} ${styles.edit}`}
        type="text"
        placeholder="Update your item"
        value={postTodo.todoText}
        name="text"
        onChange={(e) => setPostTodo({ ...postTodo, todoText: e.target.value })}
        ref={inputRef}
      />
      <button className={`${styles.todoBtn} ${styles.edit}`} type="submit">
        Update
      </button>
    </form>
  ) : (
    <form autoComplete="off" className={styles.todoForm} onSubmit={handleAddSubmit}>
      <input
        className={styles.todoInput}
        type="text"
        placeholder="Add a todo"
        value={postTodo.todoText}
        name="text"
        onChange={(e) => setPostTodo({ ...postTodo, todoText: e.target.value })}
        ref={inputRef}
      />
      <button className={styles.todoBtn} type="submit">
        Add todo
      </button>
    </form>
  )
}

export default TodoForm
