import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Preference } from './interfaces';
import { getKeyCloakObj } from '../utils/keycloakUtils';
import { APIRequest } from '../utils/apiUtils';

export default function SelectSmall(props:{label:string,options:Preference[]}) {
  const [index, setIndex] = React.useState('');

  const handleChange = (event: SelectChangeEvent) =>
  {
    setIndex(event.target.value);
    const fetchData = async () => {
      const cip = getKeyCloakObj().tokenParsed.preferred_username
      
      const result = await APIRequest<[]>("/setPreference/","POST",true,{preference_id:event.target.value});
      console.log(result)
    }
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  };

  
  const elements : JSX.Element[] = props.options.map(e=>
  {
    return <MenuItem key={e.preferenceId} value={e.preferenceId}>{e.nom}</MenuItem>
  });

  return (
    <FormControl sx={{ m: 1, width:'100%'}} size="small">
      <InputLabel id="demo-select-small-label">{props.label}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={index}
        onChange={handleChange}
        label={props.label}
      >
        {elements}
      </Select>
    </FormControl>
  );
}