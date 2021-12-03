import React from "react"
import { useDispatch } from "react-redux"

import { deletePost } from "../../redux"

import styles from "./Modal.module.css"

const Modal = ({ modalType, close, post, handleEditDone, clear }) => {
  const dispatch = useDispatch()

  const onClickinModal = () => {
    if (modalType.type === "remove") {
      dispatch(deletePost(post._id))
      clear()
    } else if (modalType.type === "editDone") {
      handleEditDone()
    } else if (modalType.type === "editSelect") {
      console.log("edit done first")
    } else if (modalType.type === "warning") {
      console.log("no input warning")
    } else if (modalType.type === "edit") {
      console.log("edit button")
    }
  }

  return (
    <div className={modalType.open ? `${styles.modal} ${styles.open}` : `${styles.modal}`} onClick={close}>
      <section>
        <header>
          {modalType.type}
          <button className={styles.closeBtn} onClick={close}>
            X
          </button>
        </header>
        <main>{modalType.msg}</main>
        <footer>
          <button className={styles.yesBtn} onClick={onClickinModal}>
            yes
          </button>
        </footer>
      </section>
    </div>
  )
}

export default Modal
