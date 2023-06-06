import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { logout, requestForStudent, requestForTeacher } from './utils/keycloakUtils.js';
import { APIRequest } from './utils/apiUtils.js';
import BasicModal from './components/BasicModal.js';
import { Preference } from './components/interfaces';

function App() {
  const [preferences, setPreference] = useState<Preference[]>([])
  
  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const result = await APIRequest<[]>("/getPreferences","GET",true);
      console.log(result);
      if (result.data)
      {
        result.data.forEach((element:Preference) => {
          console.log(element);
          let preference = {preference_id: element.preference_id, nom: element.nom}
          console.log(preference)
  
          setPreference([...preferences, preference]);
        });
      }
      
      console.log(preferences);
    }
  
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [])

  return (
    <>
      <nav>
        <div className='modules'>
          <p>Émile</p>
        </div>
        <h1>SchedulUS</h1>
        <div className='modules'>
          <p>Kenza</p>
          <BasicModal preferences={preferences}/>
        </div>
      </nav>
      <div>
        
      </div>
    </>
  )
}

export default App
