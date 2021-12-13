import React, { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createPost, deletePost } from "../../redux"
import { MdPostAdd, MdOutlineRemoveFromQueue } from "react-icons/md"
import { IoPerson, IoPeople } from "react-icons/io5"
import { BiHide } from "react-icons/bi"
import ReactTooltip from "react-tooltip"

import styles from "./Pallette.module.css"

const initialState = {
  name: "",
  tag: [],
  todos: [],
  position: { x: 0, y: 0 },
}

const Pallette = () => {
  const posts = useSelector((state) => state.posts.posts)
  const user = useSelector((state) => state.auth.authData)
  const [isFolded, setIsFolded] = useState(false)
  const dispatch = useDispatch()
  const palletteRef = useRef()

  const handleAddPost = () => {
    console.log({ x: window.pageXOffset, y: window.pageYOffset })
    dispatch(
      createPost({
        ...initialState,
        name: user?.result?.name,
        position: { x: `${window.pageXOffset}px`, y: `${window.pageYOffset}px` },
      })
    )
  }

  const handleDeleteAll = () => {
    const userName = user?.result?.name
    posts.forEach((post) => {
      if (post.name === userName) {
        dispatch(deletePost(post._id))
      }
    })
  }

  const handleShowMine = () => {
    console.log("show mine")
  }

  const handleShowAll = () => {
    console.log("show all")
  }

  const handleFold = () => {
    palletteRef.current.style.width = "0"
    palletteRef.current.style.visibility = "hidden"

    setIsFolded(true)
    // palletteRef.current.style.visibility = "hidden"
    // palletteRef.current.style.display = "none"
  }

  const handleRemovePallete = () => {
    console.log(isFolded)
    isFolded && (palletteRef.current.style.height = "0")
    setIsFolded(false)
    // palletteRef.current.style.visibility = "hidden"
  }

  return (
    <div ref={palletteRef} className={styles.container} onTransitionEnd={handleRemovePallete}>
      {user?.result?.name ? (
        <div className={styles.buttons}>
          <button className={styles.addBtn} data-tip="add a new post on the board" onClick={handleAddPost}>
            <MdPostAdd />
          </button>
          <button className={styles.deleteAllBtn} data-tip="delete all posts of mine on the board" onClick={handleDeleteAll}>
            <MdOutlineRemoveFromQueue />
          </button>
          <button className={styles.mineBtn} data-tip="show all posts I create only" onClick={handleShowMine}>
            <IoPerson />
          </button>
          <button className={styles.showAllBtn} data-tip="show all posts of all friends' and mine" onClick={handleShowAll}>
            <IoPeople />
          </button>
          <button className={styles.foldBtn} onClick={handleFold}>
            <BiHide />
          </button>
          <ReactTooltip place="bottom" />
        </div>
      ) : (
        <p className={styles.admin}>Please Sign in or Sign up to create your own posts</p>
      )}
    </div>
  )
}

export default Pallette
