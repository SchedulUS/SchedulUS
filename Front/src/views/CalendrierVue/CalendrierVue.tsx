import { useEffect, useState } from "react";
import { Calendrier } from "../../components/Calendrier/Calendrier"
import "./CalendrierVue.css"
import { APIRequest } from "../../utils/apiUtils";
import { ResultatActivite } from "../../types/api/getActivites/resultatActivite";
import { Activite } from "../../components/Calendrier/Activite";
import { Preference } from "../../components/interfaces";
import PreferencesAPP from "../../components/PreferencesAPP/PreferencesAPP";
import * as React from "react";
import { Button } from "@mui/material";


export function CalendrierVue(props:{preferences:Preference[],appCourant:number,typeActiviteCourant:number,optionValue:number,setOptionValue:(string)=>void})
{
    const [idActiviteUsager,setIdActiviteUsager] = useState<number>(0);
    const [inscription, setInscription] = React.useState(false);
    const [activites,setActivites] = useState<Activite[]>([]);
    const [currentDate,setCurrentDate] = useState<Date>(new Date());
    const [activitePropre,setActivitePropre] = useState<Activite[]>([]);
    useEffect(()=>
    {
        const fetchData = async () =>
        {
            const result1 = await APIRequest<boolean>(`/getInscription/${props.appCourant}`,"GET",true);

            if (result1.data != undefined)
            {
                console.log(result1.data)
                setInscription(result1.data)
            }
            else
            {
                console.log("No data")
            }
        }
        fetchData().catch(console.error);

        async function getActivities()
        {
            const result = await APIRequest<ResultatActivite[]>(`/getActivite/${props.appCourant}/${props.typeActiviteCourant}`,"GET",true);

            if (result.data)
            {
                if (result.data.length > 0)
                {
                    setCurrentDate(new Date(result.data[0].debut));
                }
                const newActivites : Activite[] = result.data.map(e => {
                    return {
                        id:e.activiteId,
                        title:e.activiteNom,
                        location:e.local,
                        backgroundColor: '#64b5f6',
                        startDate: new Date(e.debut),
                        endDate: new Date(e.fin)
                    }
                });
                setActivites(newActivites);
                setActivitePropre(newActivites)
            }
        }

        async function getActiviteUsager()
        {
            if(props.appCourant > 0 && props.typeActiviteCourant > 0)
            {
                const result2 = await APIRequest<ResultatActivite[]>(`/getActiviteUsager/${props.appCourant}/${props.typeActiviteCourant}`,"GET",true);

                if (result2.data && result2.data[0])
                {
                    setIdActiviteUsager(result2.data[0].activiteId);
                }
            }
        }

        getActivities();
        getActiviteUsager();
    },[props.appCourant,props.typeActiviteCourant]);

    useEffect(()=>{
        if(idActiviteUsager > 0){
            const tmpActivites : Activite[] = activites.map(e => {
                if(e.id == idActiviteUsager){
                    return {
                        id:e.id,
                        title:e.title,
                        location:e.location,
                        backgroundColor: '#283075',
                        startDate: new Date(e.startDate),
                        endDate: new Date(e.endDate)
                    }
                }else{
                    return {
                        id:e.id,
                        title:e.title,
                        location:e.location,
                        backgroundColor: '#64b5f6',
                        startDate: new Date(e.startDate),
                        endDate: new Date(e.endDate)
                    }
                }
            }); 
            setActivitePropre(tmpActivites);
        }
    },[activites]);
    async function createGroups(appCourant:number,typeActiviteCourant:number)
    {
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
        <div id="calendriervue">
            <div>
                <Button onClick={() => createGroups(props.appCourant,props.typeActiviteCourant)} variant="contained" color="primary">
                    Créer groupes
                </Button>
        </div>
            <Calendrier activities={activitePropre} currentDate={currentDate} inscription={inscription} idActiviteUsager={idActiviteUsager}/>
            <div id="preferenceAPPDiv">
                <PreferencesAPP preferences={props.preferences} idAPP={props.appCourant} />
            </div>
        </div>
    )
}