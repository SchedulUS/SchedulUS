import './PreferencesAPP.css'
import HelpIcon from '@mui/icons-material/Help'
import EventNoteIcon from '@mui/icons-material/EventNote'
import ControlledCheckbox from '../Checkbox'
import SelectSmall from "../Select"
import { Preference } from '../interfaces'
import { APIRequest } from '../../utils/apiUtils'
import {useEffect} from "react"
import * as React from 'react'
import { SetPreferenceEtudiantAPP } from '../../types/api/setPreferenceEtudiantAPP/SetPreferenceEtudiantAPP'

export default function PreferencesAPP(props:{preferences:Preference[],appId : number})
{
    interface PreferenceIntendance {
        appId : number,
        intendance : boolean
    }

    const [intendanceChecked, setIntendanceChecked] = React.useState(false);
    const [valPlageHoraire, setValPlageHoraire] = React.useState(0);

    const handleChange = async(param: number) =>
    {
        setValPlageHoraire(param);
        const preference : SetPreferenceEtudiantAPP = {
            preference_id:param,
            appId:props.appId,
            intendant:intendanceChecked
        }
        await APIRequest<void>(`/setPreferenceUsagerAPP`,"POST",true,preference);
    };

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            if (props.appId === 0) return;
            const result = await APIRequest<PreferenceIntendance>(`/getPreferenceIntendance/${props.appId}`,"GET",true);

            if (result.data != undefined)
            {
                setIntendanceChecked(result.data.intendance)
            }
        }
        fetchData().catch(console.error);

        const fetchData2 = async () =>
        {
            if (props.appId === 0) return;

            const result = await APIRequest<number>(`/getPreferenceUsagerAPP/${props.appId}`,"GET",true);
            if (result.data !== undefined)
            {
                setValPlageHoraire(result.data);
            }

        }
        fetchData2().catch(console.error);
    }, [props.appId])


    return (
        <div className="boite">
            <div className="titre">
                <span>Préférences pour cet APP</span>
            </div>
            <div className="ligne">
                <div className="article">
                    <EventNoteIcon sx={{ fontSize: 18 }}/>
                </div>
                <SelectSmall global={false} label="Plage horaire" options={props.preferences} value={valPlageHoraire} setValue={handleChange}/>
            </div>
            <div className="ligne">
                <div className="article">
                    <HelpIcon sx={{ fontSize: 18 }}/>
                    <span className="texte">Intention d'intendance</span>
                </div>
                <ControlledCheckbox appId={props.appId} checked={intendanceChecked} setChecked={setIntendanceChecked}/>
            </div>
        </div>
    )
}