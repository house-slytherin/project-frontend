import React, { useState, useEffect } from 'react'
import { Link, Redirect, useParams } from 'react-router-dom'
import { Spinner, Button } from 'react-bootstrap'

import { deleteTask, showTask } from '../../api/tasks'

import TaskDate from './TaskDate'
import './TaskDelete.css'

import Background from '../Visuals/images/pencil_background.jpg'

const TaskDelete = ({ user, msgAlert }) => {
  const [task, setTask] = useState(null)
  const [deleted, setDeleted] = useState(false)
  const { id } = useParams()

  // if user is null, redirect to home page
  // Note: Must check before useEffect, since it needs user
  if (!user) {
    return <Redirect to='/' />
  }

  useEffect(() => {
    // When using async & await in a `useEffect` function
    // We have to wrap our `async` code in a function:
    // https://stackoverflow.com/a/53572588
    const fetchData = async () => {
      try {
        const res = await showTask(id, user)
        setTask(res.data.task)
      } catch (error) {
        msgAlert({
          heading: 'Task failed to load',
          message: error.message,
          variant: 'danger'
        })
      }
    }
    fetchData()
  }, [])

  const handleDeleteClick = async () => {
    try {
      await deleteTask(id, user)
      setDeleted(true)
    } catch (error) {
      msgAlert({
        heading: 'Failed to delete Task',
        message: error.message,
        variant: 'danger'
      })
    }
  }

  // 3 states:
  // If Task is `null`, we are loading
  if (!task) {
    return (
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    )
  } else if (deleted) {
    return <Redirect to='/tasks' />
  } else {
    // We have a Task, display it!
    return (
      <div className='task-delete'>
        <img className='background-image' src={Background} />
        <div className='row'>
          <div className='col-sm-10 col-md-8 mx-auto mt-5'>
            <div>
              <TaskDate date={task.date}></TaskDate>
            </div>
            <h2 className='task-item-title'>{task.title}</h2>
            <p className='task-delete-description'>{task.description}</p>
            <Button variant='danger' onClick={handleDeleteClick}>Delete Task
            </Button>
            <Link to={`/tasks/${id}/edit`}>
              <Button variant='warning' type='submit'>Update Task
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default TaskDelete
