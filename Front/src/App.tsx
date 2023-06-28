import { useEffect, useState } from 'react'
import './App.css'
import PreferencesAPP from './components/PreferencesAPP/PreferencesAPP.tsx';
import { getKeyCloakObj } from './utils/keycloakUtils.js'
import { APIRequest } from './utils/apiUtils.js'
import BasicModal from './components/BasicModal.js';
import { Preference } from './components/interfaces';
import Navigateur from "./components/Navigateur.tsx";
import { CalendrierVue } from './views/CalendrierVue/CalendrierVue';
import Button from "@mui/material/Button";
import * as React from "react";

function App()
{
  const [preferences, setPreference] = useState<Preference[]>([]);
  const [nom, setNom] = useState("");

  const [appCourant, setAppCourant] = useState(0);
  const [typeActiviteCourant, setTypeActiviteCourant] = useState(0);
  const [optionValue, setOptionValue] = useState<number>(0);
  const [optionValueApp, setOptionValueApp] = useState<number>(0);

  useEffect(() =>
  {
    const fetchData = async () =>
    {
      const result = await APIRequest<[]>("/getPreferences","GET",true);
      if (result.data)
      {
        result.data.forEach((element:Preference) => {
          const preference = {preferenceId: element.preferenceId, nom: element.nom}
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
        const result = await APIRequest<Preference>(`/getPreferenceUsagerApp/${appCourant}`,"GET",true);
        if (result.data)
        {
          if(result.data !== undefined){
            setOptionValueApp(result.data.preferenceId);
          }else{
            const result = await APIRequest<Preference>(`/getPreferenceUsager/`,"GET",true);
            if(result.data){
              setOptionValueApp(result.data.preferenceId);
            }
          }
        }
    
      }
      
      fetchData().catch(console.error);
    }
  }, [appCourant]);
  const handleButtonClick = async () => {
    try {
      const response = await APIRequest<Response>('/groups/possible-groups', 'POST', true, { appCourant, typeActiviteCourant });

      if (response.data) {
        const data = response.data;
        console.log(data);
      } else {
        throw new Error('Erreur lors de la requête au backend');
      }
    } catch (error) {
      console.error(error);
    }
  };
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
        <Button onClick={handleButtonClick} variant="contained" color="primary">
          Appeler la fonction du backend
        </Button>
      </div>
    </>
  )
}

export default App
