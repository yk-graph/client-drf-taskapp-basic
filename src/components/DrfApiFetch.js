import React, { useState, useEffect } from 'react'
import axios from 'axios'

const DrfApiFetch = () => {
  const [tasks, setTasks] = useState([])
  const [selectedTask, setSelectedTask] = useState({})
  const [editedTask, setEditedTask] = useState({ id: '', title: '' })
  const [id, setId] = useState(1)

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/tasks/', {
        headers: {
          Authorization: 'Token f028a0c5f45579a45b59b49e2900ac7dbbb3ec04',
        },
      })
      .then((res) => setTasks(res.data))
      .catch((error) => alert(alert))
  }, [])

  const getTask = () => {
    axios
      .get(`http://127.0.0.1:8000/api/tasks/${id}/`, {
        headers: {
          Authorization: 'Token f028a0c5f45579a45b59b49e2900ac7dbbb3ec04',
        },
      })
      .then((res) => setSelectedTask(res.data))
      .catch((error) => alert(alert))
  }
  const deleteTask = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/tasks/${id}/`, {
        headers: {
          Authorization: 'Token f028a0c5f45579a45b59b49e2900ac7dbbb3ec04',
        },
      })
      .then((res) => {
        setTasks(tasks.filter((task) => task.id !== id))
        setSelectedTask({})
      })
      .catch((error) => alert(alert))
  }
  const newTask = (task) => {
    const data = { title: task.title }
    axios
      .post(`http://127.0.0.1:8000/api/tasks/`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token f028a0c5f45579a45b59b49e2900ac7dbbb3ec04',
        },
      })
      .then((res) => setTasks([...tasks, res.data]))
      .catch((error) => alert(alert))
  }
  const handleInputChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    setEditedTask({ ...editedTask, [name]: value })
  }

  return (
    <>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.id} : {task.title}
            <button type="button" onClick={() => deleteTask(task.id)}>
              Delete Task
            </button>
          </li>
        ))}
      </ul>
      Set Id <br />
      <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      <button type="button" onClick={() => getTask()}>
        Get Task
      </button>
      <h3>{selectedTask.title}</h3>
      <input
        type="text"
        name="title"
        value={editedTask.title}
        onChange={(e) => handleInputChange(e)}
        placeholder="New task ?"
        required
      />
      <button type="button" onClick={() => newTask(editedTask)}>
        Create Task
      </button>
    </>
  )
}

export default DrfApiFetch
