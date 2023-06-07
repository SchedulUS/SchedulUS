import { useEffect, useState } from 'react';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import {APIRequest} from "../utils/apiUtils.ts";
import "./Navigateur.css";


export default function Navigateur() {

 const [nomApp, getNomApp] = useState<number>(0);


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
        if (nomApp > 0) {
            getNomApp((prevApp) => prevApp - 1);
        }
    };


 return(
     <div         className= "Navigateur-containeur">
         <div>
             <ArrowBackIos onClick={handlePreviousClick}></ArrowBackIos>
         </div>

         <div >
             <p> <span>{nomApp}</span> </p>
         </div>

         <div>
             <ArrowForwardIos onClick={handleNextClick}></ArrowForwardIos>
         </div>


     </div>

 );
}
