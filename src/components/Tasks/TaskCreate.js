import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

// Import MovieForm:
import TaskForm from './TaskForm'
import { createTask } from '../../api/tasks'
import Background from '../Visuals/images/pencil_background.jpg'

const TaskCreate = ({ user, msgAlert }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [createdId, setCreatedId] = useState(null)

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const res = await createTask(title, description, new Date(date), user)
      setCreatedId(res.data.task._id)
      console.log(res.data.task._id)

      msgAlert({
        heading: 'Task Created',
        message: `Created ${title} successfully.`,
        variant: 'success'
      })
    } catch (error) {
      msgAlert({
        heading: 'Failed to create task',
        message: error.message,
        variant: 'danger'
      })
    }
  }

  // if user is null, redirect to home page
  if (!user) {
    return <Redirect to='/' />
  } else if (createdId) {
    // if movie has been created,Redirect to the 'show' page
    return <Redirect to={`/tasks/${createdId}`} />
  }
  return (
    <div className='row'>
      <div className='col-sm-10 col-md-8 mx-auto mt-5'>
        <img className='background-image' src={Background} />
        <h3 className='tasks-text'>Create Task</h3>
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
