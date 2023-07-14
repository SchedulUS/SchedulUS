import './StylesModal.css'
import HelpIcon from '@mui/icons-material/Help'
import EventNoteIcon from '@mui/icons-material/EventNote'
import ControlledCheckbox from './Checkbox.tsx'
import SelectSmall from "./Select.tsx"
import { Preference } from './interfaces.tsx'
import { APIRequest } from '../utils/apiUtils.ts'
import {useEffect} from "react"
import * as React from 'react'
import { SetPreferenceEtudiantAPP } from '../types/api/setPreferenceEtudiantAPP/SetPreferenceEtudiantAPP.ts'

export default function PreferencesAPP(props : { preferences : Preference[], idAPP : number })
{
    const [intendanceChecked, setIntendanceChecked] = React.useState(false);
    const [valPlageHoraire, setValPlageHoraire] = React.useState(0);

    const handleChange = async(param: number) =>
    {
        setValPlageHoraire(param);
        const preference : SetPreferenceEtudiantAPP = {
            preference_id:param,
            appId:props.idAPP,
            intendant:intendanceChecked
        }
        await APIRequest<void>(`/setPreferenceUsagerAPP`,"POST",true,preference);
    };

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            if (props.idAPP === 0) return;

            const result = await APIRequest<boolean>(`/getPreferenceIntendance/${props.idAPP}`,"GET",true);

            if (result.data != undefined)
            {
                console.log(result.data)
                setIntendanceChecked(result.data)
            }
            else
            {
                console.log("No data")
            }
        }
        fetchData().catch(console.error);

        const fetchData2 = async () =>
        {
            if (props.idAPP === 0) return;

            const result = await APIRequest<number>(`/getPreferenceUsagerAPP/${props.idAPP}`,"GET",true);
            if (result.data !== undefined)
            {
                setValPlageHoraire(result.data);
            }

        }
        fetchData2().catch(console.error);
    }, [props.idAPP])


    return (
        <div className="boite ombre" style={{ width: '260px' }}>
            <div className="titre barre">
                <span>Préférences pour cet APP</span>
            </div>
            <div className="ligne">
                <div className="article">
                    <EventNoteIcon sx={{ fontSize: 22 }}/>
                </div>
                <SelectSmall global={false} label="Plage horaire" options={props.preferences} value={valPlageHoraire} setValue={handleChange}/>
            </div>
            <div className="ligne">
                <div className="article">
                    <HelpIcon sx={{ fontSize: 22 }}/>
                    <span className="texte">Intention d'intendance</span>
                </div>
                <ControlledCheckbox appId={props.idAPP} checked={intendanceChecked} setChecked={setIntendanceChecked}/>
            </div>
        </div>
    )
}