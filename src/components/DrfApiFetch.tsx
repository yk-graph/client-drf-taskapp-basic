import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { TaskType } from '../types/Task'
import { EditedTaskType } from '../types/EditedTask'

const DrfApiFetch: React.FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [selectedTask, setSelectedTask] = useState<TaskType | null>()
  const [editedTask, setEditedTask] = useState<EditedTaskType>()

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/tasks/', {
        headers: {
          Authorization: 'Token f028a0c5f45579a45b59b49e2900ac7dbbb3ec04',
        },
      })
      .then((res) => setTasks(res.data))
      .catch((error) => alert(error.message))
  }, [])

  const getTask = async (id: number) => {
    await axios
      .get(`http://127.0.0.1:8000/api/tasks/${id}/`, {
        headers: {
          Authorization: 'Token f028a0c5f45579a45b59b49e2900ac7dbbb3ec04',
        },
      })
      .then((res) => setSelectedTask(res.data))
      .catch((error) => alert(error.message))
  }

  const deleteTask = async (id: number) => {
    await axios
      .delete(`http://127.0.0.1:8000/api/tasks/${id}/`, {
        headers: {
          Authorization: 'Token f028a0c5f45579a45b59b49e2900ac7dbbb3ec04',
        },
      })
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id))
        setSelectedTask(null)
      })
      .catch((error) => alert(error.message))
  }

  const createTask = async () => {
    await axios
      .post(`http://127.0.0.1:8000/api/tasks/`, editedTask, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token f028a0c5f45579a45b59b49e2900ac7dbbb3ec04',
        },
      })
      .then((res) => setTasks([...tasks, res.data]))
      .catch((error) => alert(error.message))
      .finally(() => setEditedTask({ id: undefined, title: '' }))
  }

  return (
    <>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => getTask(task.id)}>Show</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h5>Selected Task</h5>
      {selectedTask ? (
        <div>
          <span>{selectedTask.id} : </span>
          <span>{selectedTask.title}</span>
          <br />
          <span>{selectedTask.created_at}</span>
        </div>
      ) : (
        <p>Taskの詳細は選択されていません</p>
      )}
      <h5>Create Task</h5>
      <input
        type="text"
        value={editedTask?.title}
        onChange={(e) =>
          setEditedTask({ id: undefined, title: e.target.value })
        }
      />
      <button onClick={() => createTask()}>Create</button>
    </>
  )
}

export default DrfApiFetch
