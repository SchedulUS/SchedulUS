import * as React from 'react'
import Checkbox from '@mui/material/Checkbox'
import {APIRequest} from "../utils/apiUtils.ts";
/*import {pink} from "@mui/material/colors"*/

export default function ControlledCheckbox(props:{checked:boolean})
{
    const [checked, setChecked] = React.useState(props.checked)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        setChecked(event.target.checked)
        console.log(checked)
        const fetchData = async () =>
        {
            await APIRequest<[]>("/setPreferenceIntendance","POST",true,{"idAPP": 3/*TODO : app actuel avec Émile*/,"intendance": checked});
        }

        fetchData().catch(console.error);
    }

    return (
        <Checkbox
            checked={checked}
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