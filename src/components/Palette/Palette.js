import React, { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createPost, deletePost, hidePaletteAction } from "../../redux"
import { MdPostAdd, MdOutlineRemoveFromQueue } from "react-icons/md"
import { IoPerson, IoPeople } from "react-icons/io5"
import { BiHide } from "react-icons/bi"
import ReactTooltip from "react-tooltip"

import styles from "./Palette.module.css"

const initialState = {
  name: "",
  tag: [],
  todos: [],
  position: { x: 0, y: 0 },
}

const Palette = () => {
  const posts = useSelector((state) => state.posts.posts)
  const user = useSelector((state) => state.auth.authData)
  const shouldShow = useSelector((state) => state.palette.shouldShowPal)
  const dispatch = useDispatch()
  const paletteRef = useRef()

  const handleAddPost = () => {
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
    paletteRef.current.style.width = "0"
    paletteRef.current.style.visibility = "hidden"
    dispatch(hidePaletteAction())
  }

  const handleRemovePallete = () => {
    !shouldShow && (paletteRef.current.style.height = "0")
  }

  useEffect(() => {
    shouldShow && (paletteRef.current.style = {})
  }, [shouldShow])

  return (
    <div ref={paletteRef} className={styles.container} onTransitionEnd={handleRemovePallete}>
      {user?.result?.name ? (
        <div className={styles.buttons}>
          <button className={styles.addBtn} data-tip="add a new post on the board" onClick={handleAddPost}>
            <MdPostAdd />
          </button>
          <button className={styles.deleteAllBtn} data-tip="delete all posts of mine on the board" onClick={handleDeleteAll}>
            <MdOutlineRemoveFromQueue />
          </button>
          <button className={styles.mineBtn} data-tip="show all posts I create only (not available)" onClick={handleShowMine}>
            <IoPerson />
          </button>
          <button className={styles.showAllBtn} data-tip="show all posts of all friends' and mine (not available)" onClick={handleShowAll}>
            <IoPeople />
          </button>
          <button className={styles.foldBtn} data-tip="Hide Palette" onClick={handleFold}>
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

export default Palette
