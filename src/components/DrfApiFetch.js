import React, { useState, useEffect } from 'react'
import axios from 'axios'

const DrfApiFetch = () => {
  // タスク全件を保持する配列
  const [tasks, setTasks] = useState([])
  // 選択されたタスクのIDを保持
  const [id, setId] = useState(null)
  // 選択されたタスクのIDから取得したデータを保持するオブジェクト
  const [selectedTask, setSelectedTask] = useState(null)
  // 新規追加・更新用のタスクを保持するオブジェクト
  const [editedTask, setEditedTask] = useState({ id: '', title: '' })

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
    id
      ? axios
          .get(`http://127.0.0.1:8000/api/tasks/${id}/`, {
            headers: {
              Authorization: 'Token f028a0c5f45579a45b59b49e2900ac7dbbb3ec04',
            },
          })
          .then((res) => {
            setSelectedTask(res.data)
          })
          .catch((error) => alert(alert))
      : setSelectedTask(null)
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

  const createTask = () => {
    const data = { title: editedTask.title }
    axios
      .post(`http://127.0.0.1:8000/api/tasks/`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token f028a0c5f45579a45b59b49e2900ac7dbbb3ec04',
        },
      })
      .then((res) => {
        setTasks([...tasks, res.data])
        setEditedTask({ id: '', title: '' })
      })
      .catch((error) => alert(alert))
  }

  const updateTask = () => {
    const updateData = { id: editedTask.id, title: editedTask.title }
    axios
      .put(`http://127.0.0.1:8000/api/tasks/${editedTask.id}/`, updateData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token f028a0c5f45579a45b59b49e2900ac7dbbb3ec04',
        },
      })
      .then((res) => {
        setTasks(
          tasks.map((task) => (task.id === editedTask.id ? res.data : task))
        )
        setEditedTask({ id: '', title: '' })
      })
      .catch((error) => alert(error.message))
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
              Delete
            </button>
            <button
              type="button"
              onClick={() =>
                setEditedTask({ ...editedTask, id: task.id, title: task.title })
              }
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
      <div style={{ margin: '24px' }}>
        <select onChange={(e) => setId(e.target.value)}>
          <option value="" selected>
            タスクのID番号を選択してください
          </option>
          {tasks.map((task) => (
            <option key={task.id} value={task.id}>
              {task.id}
            </option>
          ))}
        </select>
        <button type="button" onClick={() => getTask()}>
          Get Task
        </button>
        {selectedTask ? (
          <div>
            <h5>
              {selectedTask.title}
              <br />
              <span>created_{selectedTask.created_at}</span>
            </h5>
          </div>
        ) : (
          ''
        )}
      </div>
      <div>
        <input
          type="text"
          name="title"
          value={editedTask.title}
          onChange={(e) => handleInputChange(e)}
          placeholder="Please Type task"
          required
        />
        {editedTask.id ? (
          <button type="button" onClick={() => updateTask()}>
            Update Task
          </button>
        ) : (
          <button type="button" onClick={() => createTask()}>
            Create Task
          </button>
        )}
      </div>
    </>
  )
}

export default DrfApiFetch
