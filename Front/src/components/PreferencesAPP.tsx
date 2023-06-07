import './PreferencesApp.css'
import HelpIcon from '@mui/icons-material/Help';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Checkbox from './Checkbox.tsx';
import SelectSmall from "./Select.tsx";

export default function PreferencesAPP()
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
                <SelectSmall label="Plage horaire" options={[]}/>
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