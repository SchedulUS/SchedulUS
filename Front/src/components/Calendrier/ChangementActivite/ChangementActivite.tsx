import Button from "@mui/material/Button";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { useEffect, useState } from "react";
import { APIRequest } from "../../../utils/apiUtils";

export default function ChangementActivite(props:{activityId:number})
{
    const [disponibiliteChangement, setDisponibiliteChangement] = useState<boolean>(false);
    useEffect(() => {
        async function getDisponibiliteChangement()
        {
            const result = await APIRequest<boolean>(`/getDisponibiliteChangement/${props.activityId}`,"GET",true);

            setDisponibiliteChangement(result.data == true)
        }

        getDisponibiliteChangement();
    },[props.activityId])

    return (
        <div className="boite">
            <div className="titre">
                <span>Changement d'activité</span>
            </div>
            <div className="ligne">
                <div className="article">
                    {/*TODO : bouton de demande de changement*/}
                    <Button>Demande de changement</Button>
                </div>
            </div>
            <div className="ligne">
                <div className="article">
                    {disponibiliteChangement ? <EventAvailableIcon sx={{ fontSize: 22 }} color="success"/> : <EventBusyIcon sx={{ fontSize: 22 }} color="disabled"/>}
                    <span className="texte">Disponibilité</span>
                </div>
            </div>
        </div>
    )
}