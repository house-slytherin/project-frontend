import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

import { Card, Spinner } from 'react-bootstrap'
import { indexTasks } from '../../api/tasks'
import TaskItem from './TaskItem'

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
    <TaskItem fetchTasks={fetchTasks} key={task._id} task={task} user={user} msgAlert={msgAlert}>
    </TaskItem>
  ))

  return (
    <div className='row'>
      <div className='col-sm-10 col-md-8 mx-auto mt-5'>
        <h3>Tasks</h3>
        <Card>
          <Card.Body>
            <ul>{tasksList}</ul>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default TasksShow
