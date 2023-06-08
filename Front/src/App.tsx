import { useEffect, useState } from 'react'
import './App.css'
import Fuck_qui from './composants/Fuck_qui.tsx'
import PreferencesAPP from './components/PreferencesAPP.tsx';
import { getKeyCloakObj, logout, requestForStudent, requestForTeacher } from './utils/keycloakUtils.js'
import { APIRequest } from './utils/apiUtils.js'
import BasicModal from './components/BasicModal.js';
import { Preference } from './components/interfaces';
import Navigateur from "./components/Navigateur.tsx";
import { CalendrierVue } from './views/CalendrierVue/CalendrierVue.js';

function App()
{
  const [preferences, setPreference] = useState<Preference[]>([])
  const [nom, setNom] = useState("")
  const [cip ,setCip] = useState("")

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const result = await APIRequest<[]>("/getPreferences","GET",true);
      if (result.data)
      {
        result.data.forEach((element:Preference) => {
          let preference = {preferenceId: element.preferenceId, nom: element.nom}
          setPreference(preferences => [...preferences, preference]);
        });
      }
      
      setNom(getKeyCloakObj().tokenParsed.name)
      setCip(getKeyCloakObj().tokenParsed.preferred_username)
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
          <p>{nom}</p>
          <BasicModal preferences={preferences}/>
        </div>
      </nav>
      <div>
          <PreferencesAPP/>
      </div>
        <div>
            <Fuck_qui /> {/* Appel de Fuck_qui */}
        </div>
    </>
  )
}

export default App
