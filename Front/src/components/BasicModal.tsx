import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import SelectSmall from './Select';
import { Preference } from './interfaces';
import { APIRequest } from '../utils/apiUtils';


const style =
    {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
      color: 'black',
    };
  
  export default function BasicModal(props:{preferences:Preference[]})
  {
    const [open, setOpen] = React.useState(false);
    const [nbrEchange, setNbrEchange] = React.useState(0);
    const [optionValue, setOptionValue] = React.useState("");
    
    const handleOpen = () => {
      // declare the data fetching function
      const fetchData = async () => {
        const result = await APIRequest<[]>("/getNbrEchange","GET",true);
        console.log(result)
        if (result.data)
        {
          setNbrEchange(result.data["nbrEchange"])
        }
        
      }
      // call the function
      fetchData()
        // make sure to catch any error
        .catch(console.error);

       // declare the data fetching function
      const fetchData2 = async () => {
        const result = await APIRequest<string>("/getPreferenceUsager","GET",true);
        if (result.data)
        {
          setOptionValue(result.data);
        }
        
      }
      // call the function
      fetchData2()
        // make sure to catch any error
        .catch(console.error);

        
      setOpen(true)
    };
    const handleClose = () => setOpen(false);
    
  
    const handleOkButtonClick = () => {
      setOpen(false);
    };

 
  return (
    <div>
      <Button onClick={handleOpen} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
        <span style={{ fontSize: '1.2em' }}>&#9881;</span>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <p>Préférence du groupe de tutorat par défaut</p>
            <div>
              
                <SelectSmall
                  label="Sélectionnez une préférence"
                  options={props.preferences}
                  value={optionValue}
                  setValue={setOptionValue}
                />
              </div>
              
            </div>
          
          <p>Nombre d'échanges de groupe restant pour la session : {nbrEchange}</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
            <Button onClick={handleOkButtonClick} variant="contained" color="primary">
              OK
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
