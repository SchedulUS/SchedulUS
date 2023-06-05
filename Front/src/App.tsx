import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { logout, requestForStudent, requestForTeacher } from './utils/keycloakUtils.js';
import BasicModal from './components/BasicModal';

function App() {
  const [count, setCount] = useState(0)

  return (
  <>
      <nav><div className="nav-wrapper blue"></div></nav>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <button onClick={() => logout()}>Déconnexion</button>
      <div>
        <button onClick={() => requestForStudent()}>Étudiant?</button>
        <button onClick={() => requestForTeacher()}>Enseignant?</button>
        <div id="title">
          <span></span>
        </div>
      </div>
      <BasicModal/>
      </>
  )
}

export default App
