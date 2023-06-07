import { useEffect, useState } from 'react'
import './App.css'
<<<<<<< HEAD
import { getKeyCloakObj, logout, requestForStudent, requestForTeacher } from './utils/keycloakUtils.js';
import { APIRequest } from './utils/apiUtils.js';
=======
import Fuck_qui from './composants/Fuck_qui.tsx'
import PreferencesAPP from './components/PreferencesAPP.tsx';
import { logout, requestForStudent, requestForTeacher } from './utils/keycloakUtils.js'
import { APIRequest } from './utils/apiUtils.js'
>>>>>>> origin/SSTD_preferences_APP
import BasicModal from './components/BasicModal.js';

interface Preference
{
  preference_id:number;
  nom:string;
}

<<<<<<< HEAD
function App() {
  const [preferences, setPreference] = useState<Preference[]>([])
=======
function App()
{
  const [count, setCount] = useState(0)
>>>>>>> origin/SSTD_preferences_APP
  
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

<<<<<<< HEAD
  const token = getKeyCloakObj().tokenParsed;
  console.log(token)
  return (
=======
  return(
>>>>>>> origin/SSTD_preferences_APP
    <>
      <nav>
        <div className='modules'>
          <p>Émile</p>
        </div>
<<<<<<< HEAD
        <h1>SchedulUS</h1>
        <div className='modules'>
          <p>{token.name}</p>
          <BasicModal preferences={preferences}/>
        </div>
      </nav>
      <div>
        
=======
          <BasicModal/>
          <PreferencesAPP/>
>>>>>>> origin/SSTD_preferences_APP
      </div>
        <div>
            <Fuck_qui /> {/* Appel de Fuck_qui */}
        </div>
    </>
  )
}

export default App
