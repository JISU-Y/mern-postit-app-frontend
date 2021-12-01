import React, { useState, useEffect, useCallback, useRef } from "react"

import Tag from "./Tag/Tag"
import TagMenu from "../ContextMenu/TagMenu"

import styles from "./TagContainer.module.css"

const TagContainer = (props) => {
  const [show, setShow] = useState(false)
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 })
  const tagRef = useRef(null)

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
        <div className={styles.blinking}>
          <h5>EDITING!</h5>
        </div>
      )}
      {props.tags.length > 0
        ? props.tags.map((tag, index) => {
            return <Tag key={index} tag={tag} />
          })
        : props.isEdit && <p className={styles.notag}>right click to add tags</p>}
      {/* tag context menu */}
      {show && <TagMenu anchorPoint={anchorPoint} handleAddTags={props.handleAddTags} handleClick={handleClick} />}
    </div>
  )
}

export default TagContainer
