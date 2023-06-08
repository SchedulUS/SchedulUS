import { useEffect, useState } from "react";
import { Calendrier } from "../../components/Calendrier/Calendrier"
import "./CalendrierVue.css"
import { APIRequest } from "../../utils/apiUtils";
import { ResultatActivite } from "../../types/api/getActivites/resultatActivite";
import { Activite } from "../../components/Calendrier/Activite";
import { Preference } from "../../components/interfaces";
import PreferencesAPP from "../../components/PreferencesAPP/PreferencesAPP";


export function CalendrierVue(props:{preferences:Preference[],appCourant:number,typeActiviteCourant:number,optionValue:number,setOptionValue:(string)=>void})
{
    const [activites,setActivites] = useState<Activite[]>([]);
    const [currentDate,setCurrentDate] = useState<Date>(new Date());
    useEffect(()=> {
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
                        endDate: new Date(e.fin)}
                });
                setActivites(newActivites);
            }
        }

        getActivities();
    },[props.appCourant,props.typeActiviteCourant])
    
    return (
        <div id="calendriervue">
            <div></div>
            <Calendrier activities={activites} currentDate={currentDate}/>
            <div>
                <PreferencesAPP preferences={props.preferences} appId={props.appCourant} />
            </div>
        </div>
    )
}