import { useEffect, useState } from "react";
import { Calendrier } from "../../components/Calendrier/Calendrier"
import "./CalendrierVue.css"
import { APIRequest } from "../../utils/apiUtils";
import { ResultatActivite } from "../../types/api/getActivites/resultatActivite";
import { Activite } from "../../components/Calendrier/Activite";

const appId = 1;
const typeId = 1;

export function CalendrierVue()
{
    const [activites,setActivites] = useState<Activite[]>([]);
    const [currentDate,setCurrentDate] = useState<Date>(new Date());
    useEffect(()=> {
        async function getActivities()
        {
            const result = await APIRequest<ResultatActivite[]>(`/getActivite/${appId}/${typeId}`,"GET",true);

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
    },[])
    
    return (
        <div id="calendriervue">
            <div></div>
            <Calendrier activities={activites} currentDate={currentDate}/>
            <div></div>
        </div>
    )
}