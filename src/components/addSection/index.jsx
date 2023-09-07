import React from 'react'
import styles from "./index.module.css"


function AddSection({setIsVisible}) {
  return (
    <div className={styles.add} onClick={() => setIsVisible(true)}>+</div>
  )
}

export default AddSection