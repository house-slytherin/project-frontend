import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

// Import MovieForm:
import TaskForm from './TaskForm'
import { createTask } from '../../api/tasks'

const TaskCreate = ({ user, msgAlert }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [createdId, setCreatedId] = useState(null)

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const res = await createTask(title, description, date, user)
      setCreatedId(res.data.task._id)

      msgAlert({
        heading: 'Movie Created',
        message: `Created ${title} successfully.`,
        variant: 'success'
      })
    } catch (error) {
      msgAlert({
        heading: 'Failed to create movie',
        message: error.message,
        variant: 'danger'
      })
    }
  }

  // if user is null, redirect to home page
  if (!user) {
    return <Navigate to='/' />
  } else if (createdId) {
    // if movie has been created,Navigate to the 'show' page
    return <Navigate to={`/tasks/${createdId}`} />
  }
  return (
    <div className='row'>
      <div className='col-sm-10 col-md-8 mx-auto mt-5'>
        <h3>Create Movie</h3>
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

export default TaskCreate
