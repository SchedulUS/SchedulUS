import * as React from 'react'
import Checkbox from '@mui/material/Checkbox'
import {APIRequest} from "../utils/apiUtils.ts";
import {SetPreferenceEtudiantAPP} from "../types/api/setPreferenceEtudiantAPP/SetPreferenceEtudiantAPP.ts";
/*import {pink} from "@mui/material/colors"*/


export default function ControlledCheckbox(props:{checked:boolean, setChecked:(boolean)=>void, appId: number, preference_id:number })
{
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        const newValue = event.target.checked;
        props.setChecked(newValue)
        /*console.log(checked)*/
        const fetchData = async () =>
        {
            const preference : SetPreferenceEtudiantAPP = {
                appId:props.appId,
                preference_id:props.preference_id,
                intendant:newValue
            }
            await APIRequest<[]>("/setPreferenceUsagerAPP","POST",true,preference);
        }

        fetchData().catch(console.error);
    }

    return (
        <Checkbox
            checked={props.checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
            /*sx={{
                color: '#000000',
                '&.Mui-checked': {
                    color: '#2196F3',
                },
            }}*/
        />
    )
}