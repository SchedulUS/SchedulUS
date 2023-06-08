import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Preference } from './interfaces';
import { getKeyCloakObj } from '../utils/keycloakUtils';
import { APIRequest } from '../utils/apiUtils';

export default function SelectSmall(props:{label:string,options:Preference[],value:string,setValue:(string)=>void})
{
  const handleChange = (event: SelectChangeEvent) =>
  {
    props.setValue(event.target.value);
    const fetchData = async () => {
      await APIRequest<[]>("/setPreference","POST",true,{ preferenceId: event.target.value});
    }
    
    fetchData().catch(console.error);
  };
  
  let elements : JSX.Element[] = props.options.map(e=>
  {
    return <MenuItem key={e.preferenceId} value={e.preferenceId}>{e.nom}</MenuItem>
  });

  return (
    <FormControl sx={{ m: 1, width:'100%'}} size="small">
      <InputLabel id="select-small-label">{props.label}</InputLabel>
      <Select
        labelId="select-small-label"
        id="select-small"
        value={props.value}
        onChange={handleChange}
        label={props.label}
      >
        {elements}
      </Select>
    </FormControl>
  );
}