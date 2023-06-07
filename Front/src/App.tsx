import { useEffect } from 'react'
import './App.css'
import { logout, requestForStudent, requestForTeacher } from './utils/keycloakUtils.js';
import { APIRequest } from './utils/apiUtils.js';
import { Preference } from './components/interfaces';
import Navigateur from "./components/Navigateur.tsx";
import { CalendrierVue } from './views/CalendrierVue/CalendrierVue.js';

function App() {
  
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
        <CalendrierVue/>
      </div>
        <div>
            <Navigateur/>
        </div>
    </>
  )
}

export default App
