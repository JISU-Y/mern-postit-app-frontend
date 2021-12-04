import React, { useState, useEffect, useCallback, useRef } from "react"
import { useSelector } from "react-redux"

import Tag from "./Tag/Tag"
import TagMenu from "../ContextMenu/TagMenu"

import styles from "./TagContainer.module.css"

const TagContainer = (props) => {
  const post = useSelector((state) => state.post)
  const [show, setShow] = useState(false)
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 })
  const tagRef = useRef(null)
  const tags = props.isEdit ? post.tag : props.tags // useState로 하면 비동기적이라 렌더되지 않는 이상 업데이트 안됨

  const containerStyle = { pointerEvents: props.isEdit ? "initial" : "none" }

  // 오른쪽 클릭 메뉴 생성
  const handleContextMenu = useCallback(
    (e) => {
      e.preventDefault()
      if (!props.isEdit) {
        setShow(false)
        return
      }

      const rect = e.target.getBoundingClientRect()
      const rectX = e.clientX - rect.left // x position within the element.
      const rectY = e.clientY - rect.top // y position within the element.

      setAnchorPoint({ x: rectX, y: rectY })
      setShow(true)
    },
    [setAnchorPoint, setShow, props.isEdit]
  )

  const handleClick = useCallback(() => {
    setShow(() => (show ? false : null))
  }, [show])

  useEffect(() => {
    const _tagRef = tagRef.current
    document.addEventListener("click", handleClick)
    _tagRef.addEventListener("contextmenu", handleContextMenu)
    return () => {
      document.removeEventListener("click", handleClick)
      _tagRef.removeEventListener("contextmenu", handleContextMenu)
      // context menu는 각각의 todoList에서 event를 생기게 하고
      // context menu를 없앨때는 어디든 클릭하면 없어져야 하므로 document로 한다
      document.removeEventListener("contextmenu", handleClick)
    }
  }, [handleClick, handleContextMenu])

  return (
    <div ref={tagRef} className={styles.container} style={containerStyle}>
      {/* editing warning */}
      {props.isEdit && (
        <div className={styles.editing}>
          <h5>EDITING!</h5>
        </div>
      )}
      {tags.length > 0
        ? tags.map((tag) => {
            return <Tag key={tag._id ?? tag.tempId} tag={tag} />
          })
        : props.isEdit && <p className={styles.notag}>right click to add tags</p>}
      {/* tag context menu */}
      {show && <TagMenu anchorPoint={anchorPoint} handleClick={handleClick} />}
    </div>
  )
}

export default TagContainer
