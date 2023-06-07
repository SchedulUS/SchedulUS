import {useEffect, useState} from 'react';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import {APIRequest} from "../utils/apiUtils.ts";
import "./Navigateur.css";
import {IconButton} from "@mui/material";

interface Activite{
    activiteNom: string
}

function RemoveRedundants(activites:Activite[])
{
    var seen = {};
    return activites.filter(function(item) {
        return seen.hasOwnProperty(item.activiteNom) ? false : (seen[item.activiteNom] = true);
    });
}

export default function Navigateur() {
    const [data, setData] = useState<Activite[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await APIRequest<Activite[]>("/getActivite","GET",true);
                if(result.data) {
                    console.log()
                    setData(RemoveRedundants(result.data));
                    setPrevious(0);
                    console.log(result.data)
                }
            }
            catch (error){
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    },[])

 const [previousData, setPrevious] = useState<number>();

    const handleNextClick = () => {
        if (previousData >= data.length - 1) return;
        setPrevious(previousData + 1);
    };

    const handlePreviousClick = () => {
        if (previousData >= 1) {
            setPrevious(previousData - 1);
        }
    };


 return(
     <div         className= "Navigateur-containeur">
         <div>
             <IconButton>
                 <ArrowBackIos onClick={handlePreviousClick}></ArrowBackIos>
             </IconButton>
         </div>

         <div >
             <p> <span>{data.length == 0 ? "" : data[previousData].activiteNom}</span> </p>
         </div>

         <div>
             <IconButton>
                 <ArrowForwardIos onClick={handleNextClick}></ArrowForwardIos>
             </IconButton>
         </div>


     </div>

 );
}
