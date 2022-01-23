import apiUrl from '../apiConfig'
import axios from 'axios'

export const indexTasks = (user) => {
  return axios.get(apiUrl + '/tasks', {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const showTask = (id, user) => {
  return axios.get(`${apiUrl}/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const deleteTask = (id, user) => {
  return axios.delete(`${apiUrl}/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const updateTask = (id, title, description, date, completed, user) => {
  return axios.patch(
    `${apiUrl}/tasks/${id}`,
    { task: { title, description, date, completed } },
    {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }
  )
}

export const createTask = (title, description, date, user) => {
  return axios.post(
    `${apiUrl}/tasks`,
    { task: { title, description, date } },
    {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }
  )
}
