import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Items
{
    value:number;
    text:string;
}

export default function SelectSmall(props:{label:string,options:Items[]})
{
  const [val, setVal] = React.useState('');

  const handleChange = (event: SelectChangeEvent) =>
  {
    setVal(event.target.value);
  };

  const elements : JSX.Element[] = props.options.map(e=>
  {
    return <MenuItem value={e.value}>e.text</MenuItem>
  });

  return (
    <FormControl sx={{ m: 1, width:'100%'}} size="small">
      <InputLabel id="demo-select-small-label">{props.label}</InputLabel>
      <Select
        labelId="select-small-label"
        id="select-small"
        value={val}
        onChange={handleChange}
        label={props.label}
      >
        {elements}
      </Select>
    </FormControl>
  );
}