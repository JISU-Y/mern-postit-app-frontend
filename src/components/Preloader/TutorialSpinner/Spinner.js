import React, { useState } from "react"
import PostFooter from "../../PostFooter/PostFooter"
import TagContainer from "../../TagContainer/TagContainer"
import TodoContainer from "../../Todo/Todo"
import TodoForm from "../../TodoForm/TodoForm"

import styles from "./Spinner.module.css"

const Spinner = () => {
  const [isEdit, setIsEdit] = useState(false)
  const dummytags = [{ tempId: 1, tagName: "Loading..." }]
  const dummyTodos = [
    { tempId: 1, todoText: "Wait for a second please.", todoDone: false },
    { tempId: 2, todoText: "your todo", todoDone: true },
  ]
  const dummyPost = { creator: undefined, createdAt: new Date() }

  return (
    <div className={styles.wrap}>
      <div className={styles.box} onDoubleClick={() => setIsEdit((prev) => !prev)}>
        <TagContainer isEdit={isEdit} tags={dummytags} />
        <TodoForm isEdit={isEdit} openNoInputModal={null} editTodo={""} isTodoEdit={false} handleEditTodoDone={null} />
        <TodoContainer isEdit={isEdit} todos={dummyTodos} openEditDoneModal={null} openRemoveModal={null} onEditTodo={null} />
        <PostFooter isEdit={isEdit} post={dummyPost} openRemoveModal={null} openEditDoneModal={null} />
      </div>
    </div>
  )
}

export default Spinner
