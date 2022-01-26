import React from 'react'
import './TaskDate.css'

const TaskDate = (props) => {
  const newDate = new Date(props.date)
  const month = newDate.toLocaleString('en-US', { month: 'long' })
  const year = newDate.getFullYear()
  const day = newDate.toLocaleString('en-US', { day: '2-digit' })
  return (
    <div className='task-date'>
      <div className='task-date__month'>{month}</div>
      <div className='task-date__year'>{year}</div>
      <div className='task-date__day'>{day}</div>
    </div>
  )
}

export default TaskDate
