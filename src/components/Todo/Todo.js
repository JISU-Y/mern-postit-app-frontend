import React, { useRef } from "react"
import { RiCloseCircleLine, RiEdit2Fill } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"

import { deleteTodoAction, updateTodoAction } from "../../redux"

import styles from "./Todo.module.css"

const Todo = (props) => {
  const post = useSelector((state) => state.post)
  const dispatch = useDispatch()
  // 기본적으로 edit 상태인 post를 전역 state에 올린다.
  const todos = props.isEdit ? post.todos : props.todos // edit 상태일 경우만 props로 받아온 거 말고 실시간으로 store에서 받아옴
  const todoRef = useRef(null)

  const rowStyle = {
    pointerEvents: props.isEdit ? "initial" : "none",
  }

  const handleEditTodo = (todo) => {
    props.onEditTodo(todo)
  }

  const handleCompTodo = (todo) => {
    dispatch(
      updateTodoAction(todo._id ?? todo.tempId, {
        ...todo,
        todoDone: !todo.todoDone,
      })
    )
  }

  const handleDelTodo = (todo) => {
    const id = todo._id ?? todo.tempId
    dispatch(deleteTodoAction(id))
  }

  return (
    <div ref={todoRef} className={styles.container}>
      {todos.map((todo) => {
        return (
          <div className={todo.todoDone ? `${styles.row} ${styles.complete}` : `${styles.row}`} key={todo._id ?? todo.tempId} style={rowStyle}>
            <div className={styles.text} onClick={() => handleCompTodo(todo)}>
              {todo.todoText}
            </div>
            {props.isEdit && (
              <div className={styles.icons}>
                <RiCloseCircleLine onClick={() => handleDelTodo(todo)} className={styles.delete} />
                <RiEdit2Fill onClick={() => handleEditTodo(todo)} className={styles.edit} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Todo
