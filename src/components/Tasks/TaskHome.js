import React from 'react'
import Button from '../Visuals/Home/Button'
import video from '../Visuals/videos/backgroundfootage.mp4'

const TaskHome = (props) => {
  if (props.user) {
    return (<>
      <h1> hey your a user! </h1>
      <p>no button</p>
    </>)
  }
  return (
    <div className='home-container'>
      <video autoPlay loop muted >
        <source src={video} type = 'video/mp4'/>
      </video>
      <h1>Welcome to Jotit</h1>
      <p>The place to JOT-IT down</p>
      <div className='home-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>
      </div>
    </div>
  )
}

export default TaskHome
