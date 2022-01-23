import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { updateTask } from '../../api/tasks'
import TaskDate from './TaskDate'
import styles from './TasksShow.module.css'

const TaskItem = (props) => {
  const [cross, setCrossOff] = useState(false)

  return (
    <div className={styles.spreadItems}>

      <div className={styles.divbb}>
        <input
          type='checkbox'
          checked={props.task.completed}
          onClick={async () => {
            const trigger = !cross
            setCrossOff(trigger)
            try {
              await updateTask(props.task._id, props.task.title, props.task.description, props.task.date, trigger, props.user)
            } catch (error) {
              props.msgAlert({
                heading: 'Failed to update task',
                message: error.message,
                variant: 'danger'
              })
            }
            props.fetchTasks()
          }} />
        <p className={props.task.completed ? styles.strikethrough : ''} key={props.task._id}>
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
