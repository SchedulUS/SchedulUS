import { useEffect, useState } from 'react'
import './App.css'
import PreferencesAPP from './components/PreferencesAPP.tsx';
import { getKeyCloakObj, logout, requestForStudent, requestForTeacher } from './utils/keycloakUtils.js'
import { APIRequest } from './utils/apiUtils.js'
import BasicModal from './components/BasicModal.js';
import { Preference } from './components/interfaces';
import Navigateur from "./components/Navigateur.tsx";
import { CalendrierVue } from './views/CalendrierVue/CalendrierVue';

function App()
{
  const [preferences, setPreference] = useState<Preference[]>([]);
  const [nom, setNom] = useState("");
  const [cip ,setCip] = useState("");
  const [appCourant, setAppCourant] = useState(0);
  const [typeActiviteCourant, setTypeActiviteCourant] = useState(0);
  const [optionValue, setOptionValue] = useState("");
  const [optionValueApp, setOptionValueApp] = useState("");

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

    fetchData().catch(console.error);
  }, [])

  
  useEffect(() => {
    if(appCourant != 0){
      const fetchData = async () => {
        const result = await APIRequest<[]>(`/getPreferenceUsagerApp/${appCourant}`,"GET",true);
        if (result.data)
        {
          if(result.data["preference_id"]){
            setOptionValueApp(result.data["preference_id"]);
          }else{
            const result = await APIRequest<[]>(`/getPreferenceUsager/`,"GET",true);
            if(result.data){
              setOptionValueApp(result.data["preference_id"]);
            }
          }
        }
    
      }
      
      fetchData().catch(console.error);
    }
  }, [appCourant]);

  return (
    <>
      <nav>
        <div className='modules'>
          <Navigateur setAppCourant={setAppCourant} setTypeActiviteCourant={setTypeActiviteCourant}/>
        </div>
        <h1>SchedulUS</h1>
        <div className='modules'>
          <p>{nom}</p>
          <BasicModal preferences={preferences} optionValue={optionValue} setOptionValue={setOptionValue}/>
        </div>
      </nav>
      <div>
        <CalendrierVue preferences={preferences} appCourant={appCourant} typeActiviteCourant={typeActiviteCourant} optionValue={optionValueApp} setOptionValue={setOptionValueApp}/>
      </div>
    </>
  )
}

export default App
