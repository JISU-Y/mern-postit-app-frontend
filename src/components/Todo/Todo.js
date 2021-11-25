import React, { useState } from "react"
import { RiCloseCircleLine } from "react-icons/ri"
import { RiEdit2Fill } from "react-icons/ri"

import TodoForm from "../TodoForm/TodoForm"

import styles from "./Todo.module.css"

const Todo = ({ todos, completeTodo, removeTodo, updateTodo, isEdit, post }) => {
  const [currTodoId, setCurrTodoId] = useState(0)
  const [edit, setEdit] = useState({
    todoText: null,
    todoDone: false,
  })

  const submitUpdate = (value) => {
    updateTodo(currTodoId, value) // edit 하려는 post의 id와 value를 넘겨줘야함
    setEdit({
      todoText: null,
      todoDone: false,
    })
  }

  //todoText가 원래 null인데 setEdit해서 뭐라도 들어가면 그때 TodoForm 열음
  if (edit.todoText) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />
  }

  const handleEditTodo = (todo) => {
    setCurrTodoId(todo._id)
    setEdit({
      todoText: todo.todoText,
      todoDone: false,
    })
  }

  const rowStyle = {
    pointerEvents: isEdit ? "initial" : "none",
  }

  return todos.map((todo, index) => {
    return (
      <div className={todo.todoDone ? `${styles.row} ${styles.complete}` : `${styles.row}`} key={index} style={rowStyle}>
        <div key={todo._id} onClick={() => completeTodo(todo._id)}>
          {todo.todoText}
        </div>
        {isEdit && (
          <div className={styles.icons}>
            <RiCloseCircleLine onClick={() => removeTodo(todo._id)} className={styles.delete} />
            <RiEdit2Fill onClick={() => handleEditTodo(todo)} className={styles.edit} />
          </div>
        )}
      </div>
    )
  })
}

export default Todo
