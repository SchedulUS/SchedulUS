import './PreferencesAPP.css'
import HelpIcon from '@mui/icons-material/Help'
import EventNoteIcon from '@mui/icons-material/EventNote'
import ControlledCheckbox from '../Checkbox'
import SelectSmall from "../Select"
import { Preference } from '../interfaces'
import { APIRequest } from '../../utils/apiUtils'
import {useEffect} from "react"
import * as React from 'react'

export default function PreferencesAPP(props:{preferences:Preference[]})
{
    const [intendanceChecked, setIntendanceChecked] = React.useState(false);
    const [valPlageHoraire, setValPlageHoraire] = React.useState("");

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            const result = await APIRequest<boolean>("/getPreferenceIntendance/" + "3"/*TODO : app actuel avec Émile*/,"GET",true);

            if (result.data != null)
            {
                setIntendanceChecked(result.data)
                console.log("Data: ")
                console.log(result.data)
            }
            else
            {
                console.log("No data")
            }
        }
        fetchData().catch(console.error);

        const fetchData2 = async () =>
        {
            const result = await APIRequest<string>("/getPreferenceUsager","GET",true);
            if (result.data)
            {
                setValPlageHoraire(result.data);
            }

        }
        fetchData2().catch(console.error);
    }, [])


    return (
        <div className="boite">
            <div className="titre">
                <span>Préférences pour cet APP</span>
            </div>
            <div className="ligne">
                <div className="article">
                    <EventNoteIcon sx={{ fontSize: 18 }}/>
                </div>
                <SelectSmall label="Plage horaire" options={props.preferences} value={valPlageHoraire} setValue={setValPlageHoraire}/>
            </div>
            <div className="ligne">
                <div className="article">
                    <HelpIcon sx={{ fontSize: 18 }}/>
                    <span className="texte">Intention d'intendance</span>
                </div>
                <ControlledCheckbox checked={intendanceChecked} setChecked={setIntendanceChecked}/>
            </div>
        </div>
    )
}