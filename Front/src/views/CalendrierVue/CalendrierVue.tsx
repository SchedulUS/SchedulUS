import { useEffect, useState } from "react";
import { Calendrier } from "../../components/Calendrier/Calendrier"
import "./CalendrierVue.css"
import { APIRequest } from "../../utils/apiUtils";
import { ResultatActivite } from "../../types/api/getActivites/resultatActivite";
import { Activite } from "../../components/Calendrier/Activite";
import { Preference } from "../../components/interfaces";
import PreferencesAPP from "../../components/PreferencesAPP/PreferencesAPP";
import * as React from "react";


export function CalendrierVue(props:{preferences:Preference[],appCourant:number,typeActiviteCourant:number,optionValue:number,setOptionValue:(string)=>void})
{
    const [inscription, setInscription] = React.useState(false);
    const [dansActivite, setDansActivite] = React.useState(false);
    const [activites,setActivites] = useState<Activite[]>([]);
    const [currentDate,setCurrentDate] = useState<Date>(new Date());
    useEffect(()=>
    {
        const fetchData = async () =>
        {
            const result1 = await APIRequest<boolean>(`/getInscription/${props.appCourant}`,"GET",true);
            //TODO : dansActivite = true --> ne pas afficher : requête au groupe, route à créer
            const result2 = await APIRequest<boolean>(`/getInscription/${props.appCourant}`,"GET",true);

            if (result1.data != undefined)
            {
                console.log(result1.data)
                setInscription(result1.data)
            }
            else
            {
                console.log("No data")
            }

            if (result2.data != undefined)
            {
                console.log(result2.data)
                setDansActivite(result2.data)
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
                        startDate: new Date(e.debut),
                        endDate: new Date(e.fin)
                    }
                });
                setActivites(newActivites);
            }
        }

        getActivities();
    },[props.appCourant,props.typeActiviteCourant])
    
    return (
        <div id="calendriervue">
            <div></div>
            <Calendrier activities={activites} currentDate={currentDate} inscription={inscription} dansActivite={dansActivite}/>
            <div id="preferenceAPPDiv">
                <PreferencesAPP preferences={props.preferences} idAPP={props.appCourant} />
            </div>
        </div>
    )
}