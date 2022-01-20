import React from 'react'
import { Form, Button } from 'react-bootstrap'

const TaskForm = ({ handleSubmit, title, description, date, setTitle, setDescription, setDate }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId='title'>
      <Form.Label>Title</Form.Label>
      <Form.Control
        placeholder='what do you have to do?'
        name='title'
        value={title}
        onChange={event => setTitle(event.target.value)}
      />
    </Form.Group>

    <Form.Group controlId='description'>
      <Form.Label>Description</Form.Label>
      <Form.Control
        placeholder='A Description'
        name='description'
        value={description}
        onChange={event => setDescription(event.target.value)}
      />
    </Form.Group>

    <Form.Group controlId='date'>
      <Form.Label>Date</Form.Label>
      <Form.Control
        placeholder='Pick a Date'
        name='date'
        value={date}
        onChange={event => setDate(event.target.value)}
      />
    </Form.Group>
    <Button className='mt-2' variant='primary' type='submit'>Submit</Button>
  </Form>
)

export default TaskForm
