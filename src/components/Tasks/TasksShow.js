import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

import { Spinner } from 'react-bootstrap'
import { indexTasks } from '../../api/tasks'
import TaskItem from './TaskItem'
import './TaskItem.css'
import Background from '../Visuals/images/pencil_background.jpg'

const TasksShow = ({ user, msgAlert }) => {
  const [tasks, setTasks] = useState(null)

  if (!user) {
    return <Redirect to='/' />
  }

  const fetchTasks = async () => {
    try {
      const res = await indexTasks(user)
      setTasks(res.data.tasks)
    } catch (error) {
      msgAlert({
        heading: 'Tasks List failed to load',
        message: error.message,
        variant: 'danger'
      })
    }
  }
  useEffect(() => {
    fetchTasks()
  }, [])

  if (!tasks) {
    return (
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    )
  }

  // const tasksList = tasks.map((task) => (
  //   <li className={cross ? crossStyle.strikethrough : ''} key={task._id} onClick={() => setCrossOff(true)}>
  //     <Link to={`/tasks/${task._id}`}>{task.title}</Link>
  //   </li>
  // ))
  const tasksList = tasks.map((task) => (
    <TaskItem
      fetchTasks={fetchTasks}
      key={task._id}
      task={task}
      user={user}
      msgAlert={msgAlert}></TaskItem>
  ))

  return (
    <div className='row'>
      <div className='col-sm-10 col-md-8 mx-auto mt-5'>
        <img className='background-image' src={Background} />
        <h3 className='tasks-text'>My Tasks</h3>
        <ul>{tasksList}</ul>
      </div>
    </div>
  )
}

export default TasksShow
