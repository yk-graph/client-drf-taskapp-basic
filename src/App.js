import { useState } from 'react'
import './App.css'

const App = () => {
  const [members, setMembers] = useState([])

  const addMember = () =>
    setMembers([...members, { id: members.length, name: 'newMembre!!' }])

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <button onClick={addMember}>クリックしてメンバーを追加！</button>
          <ul>
            {members.map((member) => (
              <li key={member.id}>
                {member.id}:{member.name}
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  )
}

export default App
