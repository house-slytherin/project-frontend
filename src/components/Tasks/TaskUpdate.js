import React, { useState, useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'

import TaskForm from './TaskForm'
import { showTask, updateTask } from '../../api/tasks'

const TaskUpdate = ({ user, msgAlert }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [completed, setCompleted] = useState(false)
  const [updated, setUpdated] = useState(false)
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
        setTitle(res.data.task.title)
        setDescription(res.data.task.description)
        setDate(res.data.task.date)
        setCompleted(res.data.task.completed)
      } catch (error) {
        msgAlert({
          heading: 'Failed to load task',
          message: error.message,
          variant: 'danger'
        })
      }
    }
    fetchData()
  }, [])

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      await updateTask(id, title, description, date, completed, user)
      setUpdated(true)
    } catch (error) {
      msgAlert({
        heading: 'Failed to update task',
        message: error.message,
        variant: 'danger'
      })
    }
  }

  if (updated) {
    // Redirect to the 'show' page
    return <Redirect to={`/tasks/${id}`} />
  }

  return (
    <div className='row'>
      <div className='col-sm-10 col-md-8 mx-auto mt-5'>
        <h3>Edit Task</h3>
        <TaskForm
          handleSubmit={handleSubmit}
          title={title}
          description={description}
          date={date}
          setTitle={setTitle}
          setDescription={setDescription}
          setDate={setDate}
        />
      </div>
    </div>
  )
}

export default TaskUpdate
