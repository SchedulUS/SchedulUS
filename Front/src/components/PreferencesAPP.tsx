import './PreferencesAPP.css'
import HelpIcon from '@mui/icons-material/Help';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Checkbox from './Checkbox.tsx';
import SelectSmall from "./Select.tsx";
import { Preference } from './interfaces';

export default function PreferencesAPP(props:{preferences:Preference[]})
{
    return (
        <div className="boite">
            <div className="titre">
                <span>Préférences pour cet APP</span>
            </div>
            <div className="ligne">
                <div className="article">
                    <EventNoteIcon sx={{ fontSize: 18 }}/>
                </div>
                <SelectSmall label="Plage horaire" options={props.preferences}/>
            </div>
            <div className="ligne">
                <div className="article">
                    <HelpIcon sx={{ fontSize: 18 }}/>
                    <span className="texte">Intention d'intendance</span>
                </div>
                <Checkbox/>
            </div>
        </div>
    );
}