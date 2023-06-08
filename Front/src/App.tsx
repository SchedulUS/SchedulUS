import { useEffect, useState } from 'react'
import './App.css'
import PreferencesAPP from './components/PreferencesAPP/PreferencesAPP.tsx';
import { getKeyCloakObj } from './utils/keycloakUtils.js'
import { APIRequest } from './utils/apiUtils.js'
import BasicModal from './components/BasicModal.js';
import { CalendrierVue } from './views/CalendrierVue/CalendrierVue.js';
import {Preference} from "./components/interfaces.tsx";

function App()
{
  const [preferences, setPreference] = useState<Preference[]>([])
  
  useEffect(() =>
  {
    // declare the data fetching function
    const fetchData = async () =>
    {
      const result = await APIRequest<[]>("/getPreferences","GET",true);
      console.log(result);
      if (result.data)
      {
        result.data.forEach((element:Preference) =>
        {
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

  return (
    <>
      <nav>
        <div className='modules'>
          <p>Émile</p>
        </div>
        <h1>SchedulUS</h1>
        <div className='modules'>
          <BasicModal preferences={preferences}/>
        </div>
      </nav>
      <div>
        <PreferencesAPP preferences={preferences}/>
        <CalendrierVue/>
      </div>
    </>
  )
}

export default App
