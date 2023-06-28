import Button from "@mui/material/Button";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';

export default function ChangementActivite()
{

    return (
        <div className="boite">
            <div className="titre">
                <span>Changement d'activité</span>
            </div>
            <div className="ligne">
                <div className="article">
                    <Button>Demande de changement</Button>
                </div>
            </div>
            <div className="ligne">
                <div className="article">
                    {true ? <EventAvailableIcon sx={{ fontSize: 22 }} color="success"/> : <EventBusyIcon sx={{ fontSize: 22 }} color="disabled"/>}
                    <span className="texte">Disponibilité</span>
                </div>
            </div>
        </div>
    )
}