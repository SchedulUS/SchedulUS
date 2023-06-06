import { useEffect, useState } from 'react';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import {APIRequest} from "../utils/apiUtils.ts";


export default function Navigateur() {

 const [nomApp, getNomApp] = useState<number>(1);


    useEffect(() => {
        fetchData();
    }, [nomApp]);

    const fetchData = async () => {
        const result = await APIRequest<string>("/getPreferences","GET",true);

        console.log(result);
    };

    const handleNextClick = () => {
        getNomApp((prevApp) => prevApp + 1);
    };

    const handlePreviousClick = () => {
        if (nomApp > 1) {
            getNomApp((prevApp) => prevApp - 1);
        }
    };


 return(
     <div>
     <ArrowBackIos onClick={handleNextClick}></ArrowBackIos>
         <p> <span>{nomApp}</span> </p>
     <ArrowForwardIos onClick={handlePreviousClick}></ArrowForwardIos>



     </div>

 );
}
