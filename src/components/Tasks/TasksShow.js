import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

import { Spinner } from 'react-bootstrap'
import { indexTasks } from '../../api/tasks'

const TasksShow = ({ user, msgAlert }) => {
  const [tasks, setTasks] = useState(null)

  if (!user) {
    return <Redirect to='/' />
  }

  useEffect(() => {
    const fetchData = async () => {
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
    fetchData()
  }, [])

  if (!tasks) {
    return (
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    )
  }

  const tasksList = tasks.map((task) => (
    <li key={task._id}>
      <Link to={`/tasks/${task._id}`}>{task.title}</Link>
    </li>
  ))

  return (
    <div className='row'>
      <div className='col-sm-10 col-md-8 mx-auto mt-5'>
        <h3>Tasks</h3>
        <ul>{tasksList}</ul>
      </div>
    </div>
  )
}

export default TasksShow
