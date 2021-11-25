import React from "react"
import styled, { keyframes } from "styled-components"

import Tag from "./Tag/Tag"

import styles from "./TagContainer.module.css"

const TagContainer = (props) => {
  const containerStyle = { pointerEvents: props.isEdit ? "initial" : "none" }
  return (
    <div className={styles.container} style={containerStyle}>
      {/* editing warning */}
      {props.isEdit && (
        <AnimatedComponent>
          <div className={styles.blinking}>
            <h5>EDITING!</h5>
          </div>
        </AnimatedComponent>
      )}
      {props.tags.length > 0
        ? props.tags.map((tag, index) => {
            return <Tag key={index} tag={tag} handleRemoveTags={props.handleRemoveTags} />
          })
        : props.isEdit && <p className={styles.notag}>right click to add tags</p>}
    </div>
  )
}

// Blinking effect on edit / styled-components
// => props 바깥에 해야 warning(The component styled.div with the id of  has been created dynamically.) 안 생김
const blinkingEffect = () => {
  return keyframes`
        50% {
          opacity: 0;
        }
      `
}

const AnimatedComponent = styled.div`
  animation: ${blinkingEffect} 1s linear infinite;
`

export default TagContainer
