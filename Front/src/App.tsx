import { useEffect, useState } from 'react'
import './App.css'
import { logout, requestForStudent, requestForTeacher } from './utils/keycloakUtils.js';
import { APIRequest } from './utils/apiUtils.js';
import BasicModal from './components/BasicModal.js';
import { CalendrierVue } from './views/CalendrierVue/CalendrierVue.js';

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
      <button onClick={() => logout()}>Déconnexion</button>
      <div>
        <button onClick={() => requestForStudent()}>Étudiant?</button>
        <button onClick={() => requestForTeacher()}>Enseignant?</button>
        <div id="title">
          <span></span>
        </div>
        <BasicModal/>
        <CalendrierVue/>
      </div>
    </>
  )
}

export default App
