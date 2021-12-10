import React, { useState } from "react"
import PostFooter from "../../PostFooter/PostFooter"
import TagContainer from "../../TagContainer/TagContainer"
import TodoContainer from "../../Todo/Todo"
import TodoForm from "../../TodoForm/TodoForm"

import styles from "./Spinner.module.css"

const Spinner = () => {
  const [isEdit, setIsEdit] = useState(false)
  const dummytags = [{ tempId: 1, tagName: "Important" }]
  const dummyTodos = [
    { tempId: 1, todoText: "할 일1", todoDone: false },
    { tempId: 2, todoText: "할 일2", todoDone: true },
  ]
  const dummyPost = { creator: undefined, createdAt: new Date() }

  return (
    <div className={styles.box} onDoubleClick={() => setIsEdit((prev) => !prev)}>
      <TagContainer isEdit={isEdit} tags={dummytags} />
      <hr />
      <TodoForm isEdit={isEdit} openNoInputModal={null} editTodo={""} isTodoEdit={false} handleEditTodoDone={null} />
      <hr />
      <TodoContainer isEdit={isEdit} todos={dummyTodos} openEditDoneModal={null} openRemoveModal={null} onEditTodo={null} />
      <hr />
      <PostFooter isEdit={isEdit} post={dummyPost} openRemoveModal={null} openEditDoneModal={null} />
    </div>
  )
}

export default Spinner

{
  /* <p className={styles.loading}>로딩 중입니다.</p>
<p>튜토리얼을 먼저 확인해보세요!</p>
<p>Hover me!</p>
<div className="tagContainer">tag container</div> */
}
// 튜토리얼을 만들어서
// 코드의 재사용성을 높여보자
