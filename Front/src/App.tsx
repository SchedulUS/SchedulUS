import { useEffect, useState } from 'react'
import './App.css'
import Fuck_qui from './composants/Fuck_qui.tsx'
import PreferencesAPP from './components/PreferencesAPP.tsx';
import { getKeyCloakObj, logout, requestForStudent, requestForTeacher } from './utils/keycloakUtils.js'
import { APIRequest } from './utils/apiUtils.js'
import BasicModal from './components/BasicModal.js';
import { Preference } from './components/interfaces';

function App()
{
  const [preferences, setPreference] = useState<Preference[]>([])
  
  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const result = await APIRequest<[]>("/getPreferences","GET",true);
      console.log(result);
      if (result.data)
      {
        result.data.forEach((element:Preference) => {
          let preference = {preferenceId: element.preferenceId, nom: element.nom}
          setPreference(preferences => [...preferences, preference]);
        });
      }
    }
  
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [])

  const token = getKeyCloakObj().tokenParsed;

  return (
    <>
      <nav>
        <div className='modules'>
          <p>Émile</p>
        </div>
        <h1>SchedulUS</h1>
        <div className='modules'>
          <p>{token.name}</p>
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
