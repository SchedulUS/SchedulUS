import './PreferencesApp.css'
import HelpIcon from '@mui/icons-material/Help';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Checkbox from './Checkbox.tsx';
import SelectSmall from "./Select.tsx";
import {Tooltip,IconButton} from '@mui/material';
import { useEffect, useState } from 'react';
import { APIRequest } from '../utils/apiUtils.ts';
import { Preference } from './interfaces.tsx';

export default function PreferencesAPP(props:{preferences:Preference[],appCourant:number,typeActiviteCourant:number,optionValue:string,setOptionValue:(string)=>void})
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
                <SelectSmall label="Plage horaire" options={props.preferences} value={props.optionValue} setValue={props.setOptionValue} global={false}/>
            </div>
            <div className="ligne">
                <div className="article">
                    <Tooltip title="Accepter d'être intendant augmente les chances d'avoir la plage horaire voulue." style={{margin: 0,padding: 0,color: 'black'}}>
                        <IconButton>
                            <HelpIcon sx={{ fontSize: 18 }}/>
                        </IconButton>
                    </Tooltip>
                    <span className="texte">Intention d'intendance</span>
                </div>
                <Checkbox/>
            </div>
        </div>
    );
}