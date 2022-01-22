import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TaskDate from './TaskDate'
import styles from './TasksShow.module.css'

const TaskItem = (props) => {
  const [cross, setCrossOff] = useState(false)

  return (
    <div className={styles.spreadItems}>

      <div className={styles.divbb}>
        <input type='checkbox' onClick={() => {
          const trigger = !cross
          return setCrossOff(trigger)
        }}/>
        <p className={cross ? styles.strikethrough : ''} key={props.task._id}>
          <Link to={`/tasks/${props.task._id}`}>{props.task.title}</Link>
        </p>
      </div>
      <div>
        <div>
          <TaskDate date={props.task.date}></TaskDate>
        </div>
      </div>
    </div>
  )
}
export default TaskItem
