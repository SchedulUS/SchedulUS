import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Preference } from './interfaces';
import { APIRequest } from '../utils/apiUtils';

export default function SelectSmall(props:{label:string,options:Preference[],value:number,setValue:(param:number)=>void,global:boolean}) {


  const handleChange = (event: SelectChangeEvent) =>
  {
    props.setValue(Number(event.target.value));
    
    const fetchData = async () => {
      if(props.global){
        await APIRequest<[]>("/setPreference","POST",true,{ preferenceId: event.target.value});
      }else{
          //SET PREFERENCE APP [TODO]
      }
      
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
      {props.value && props.options && 
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={props.value.toString()}
        onChange={handleChange}
        label={props.label}
      >
        {elements}
      </Select>
      }
    </FormControl>
  );
}