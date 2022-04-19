import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { TaskType } from '../types/Task'

const DrfApiFetch: React.FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [selectedTask, setSelectedTask] = useState<TaskType>()

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

  return (
    <>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => getTask(task.id)}>Detail</button>
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
    </>
  )
}

export default DrfApiFetch
