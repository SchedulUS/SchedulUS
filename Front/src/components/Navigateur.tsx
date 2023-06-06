import { useEffect, useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {APIRequest} from "../utils/apiUtils.ts";
import {IconButton} from "@mui/material";


export default function Navigateur() {

 const [nomApp, setNomApp] = useState<number>(0);


    useEffect(() => {
        fetchData();
    }, [nomApp]);

    const fetchData = async () => {
        const result = await APIRequest<string>("/getPreferences","GET",true);

        console.log(result);
    };

    const handleNextClick = () => {
        setNomApp((prevApp) => prevApp + 1);
        console.log("Test")
    };

    const handlePreviousClick = () => {
        if (nomApp > 1) {
            setNomApp((prevApp) => prevApp - 1);
        }
    };


 return(
     <div>
     <IconButton onClick={handleNextClick}><ArrowForwardIosIcon/></IconButton>
         <p> <span>{nomApp}</span> </p>
     <IconButton onClick={handlePreviousClick}><ArrowBackIosIcon/></IconButton>



     </div>

 );
}
