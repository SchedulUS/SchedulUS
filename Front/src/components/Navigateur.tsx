import { useEffect, useState } from 'react';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import {APIRequest} from "../utils/apiUtils.ts";
import "./Navigateur.css";


export default function Navigateur() {

 const [nomApp, getNomApp] = useState<string>("first");


    useEffect(() => {
        fetchData();
    }, [nomApp]);

    const fetchData = async () => {
        const result = await APIRequest<string>("/getActivite","GET",true);

        console.log(result);
    };

    const handleNextClick = () => {
        getNomApp("next");
    };

    const handlePreviousClick = () => {
        if (nomApp != "first") {
            getNomApp("previous");
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
