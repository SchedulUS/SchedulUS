import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Preference } from './interfaces';

export default function SelectSmall(props:{label:string,options:Preference[]})
{
  const [index, setIndex] = React.useState('');

  const handleChange = (event: SelectChangeEvent) =>
  {
    setIndex(event.target.value);
  };

  
  const elements : JSX.Element[] = props.options.map(e=>
  {
    return <MenuItem key={e.preferenceId} value={e.preferenceId}>{e.nom}</MenuItem>
  });

  return (
    <FormControl sx={{ m: 1, width:'100%'}} size="small">
      <InputLabel id="select-small-label">{props.label}</InputLabel>
      <Select
        labelId="select-small-label"
        id="select-small"
        value={index}
        onChange={handleChange}
        label={props.label}
      >
        {elements}
      </Select>
    </FormControl>
  );
}