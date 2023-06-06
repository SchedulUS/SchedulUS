import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { logout, requestForStudent, requestForTeacher } from './utils/keycloakUtils.js';
import { APIRequest } from './utils/apiUtils.js';
import BasicModal from './components/BasicModal.js';
import { Preference } from './components/interfaces';
import Navigateur from "./components/Navigateur.tsx";

function App() {
  const [count, setCount] = useState(0)
  const [preferences, setPreferences] = useState<Preference[]>()
  
  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const result = await APIRequest<Preference>("/getPreferences","GET",true);
      
      console.log(result);
    }
  
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [])
 return (
    <>
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
        <BasicModal preferences={preferences}/>
      </div>
    <div>
        <Navigateur/>
    </div>
    </>
  )
}

export default App
