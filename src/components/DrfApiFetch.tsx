import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { TaskType } from '../types/TaskType'
import { EditedTaskType } from '../types/EditedTaskType'
import styles from './DrfApiFetch.module.css'

const DrfApiFetch: React.FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [selectedId, setSelectedId] = useState<number>()
  const [selectedTask, setSelectedTask] = useState<TaskType | null>()
  const [editedTask, setEditedTask] = useState<EditedTaskType>({
    id: undefined,
    title: '',
  })

  useEffect(() => {
    axios
      .get<TaskType[]>('http://127.0.0.1:8000/api/tasks/', {
        headers: {
          Authorization: 'Token f028a0c5f45579a45b59b49e2900ac7dbbb3ec04',
        },
      })
      .then((res) => setTasks(res.data))
      .catch((error) => alert(error.message))
  }, [])

  const getTask = () => {
    selectedId
      ? axios
          .get<TaskType>(`http://127.0.0.1:8000/api/tasks/${selectedId}/`, {
            headers: {
              Authorization: 'Token f028a0c5f45579a45b59b49e2900ac7dbbb3ec04',
            },
          })
          .then((res) => setSelectedTask(res.data))
          .catch((error) => alert(error.message))
      : setSelectedTask(null)
  }

  const deleteTask = (id: number) => {
    axios
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

  const createTask = () => {
    axios
      .post<TaskType>(`http://127.0.0.1:8000/api/tasks/`, editedTask, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token f028a0c5f45579a45b59b49e2900ac7dbbb3ec04',
        },
      })
      .then((res) => setTasks([...tasks, res.data]))
      .catch((error) => alert(error.message))
      .finally(() => setEditedTask({ ...editedTask, title: '' }))
  }

  return (
    <>
      <div className={styles.wrap}>
        <h5>タスク一覧</h5>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.id} : {task.title}
              <button onClick={() => deleteTask(task.id)}>delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.wrap}>
        <h5>タスク詳細</h5>
        <select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSelectedId(Number(e.target.value))
          }
        >
          <option value="">Select ID</option>
          {tasks.map((task) => (
            <option key={task.id} value={task.id}>
              {task.id}
            </option>
          ))}
        </select>
        <button onClick={() => getTask()}>Get Task</button>
        {selectedTask && (
          <>
            <div>
              <span>ID : </span>
              <span>{selectedTask.id}</span>
            </div>
            <div>
              <span>タイトル : </span>
              <span>{selectedTask.title}</span>
            </div>
            <div>
              <span>作成日 : </span>
              <span>{selectedTask.created_at}</span>
            </div>
          </>
        )}
      </div>
      <div className={styles.wrap}>
        <h5>タスク投稿</h5>
        <input
          type="text"
          value={editedTask?.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEditedTask({ ...editedTask, title: e.target.value })
          }
        />
        <button onClick={() => createTask()}>Create Task</button>
      </div>
    </>
  )
}

export default DrfApiFetch
