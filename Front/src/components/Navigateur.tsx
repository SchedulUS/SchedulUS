import {useEffect, useState} from 'react';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import {APIRequest} from "../utils/apiUtils.ts";
import "./Navigateur.css";
import {IconButton} from "@mui/material";

interface Activite{
    activiteNom: string,
    appId: number,
    typeId: number
}

export default function Navigateur(props:{setAppCourant:(number)=>void,setTypeActiviteCourant:(number)=>void}) {
    const [data, setData] = useState<Activite[]>([]);
    const [previousData, setPrevious] = useState<number>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await APIRequest<Activite[]>("/getActivites","GET",true);
                if(result.data) {
                    setData(result.data);
                    setPrevious(0);
                    if(result.data.length > 0){
                        props.setAppCourant(result.data[0].appId);
                        props.setTypeActiviteCourant(result.data[0].typeId);
                    }
                }
            }
            catch (error){
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    },[])


    const handleNextClick = () => {
        if (previousData >= data.length - 1) return;
        setPrevious(previousData + 1);
        props.setAppCourant(data[previousData].appId)
        props.setTypeActiviteCourant(data[previousData].typeId)
    };

    const handlePreviousClick = () => {
        if (previousData >= 1) {
            setPrevious(previousData - 1);
            props.setAppCourant(data[previousData].appId)
            props.setTypeActiviteCourant(data[previousData].typeId)
        }
    };


 return(
     <div className= "Navigateur-containeur">
         <div>
             <IconButton onClick={handlePreviousClick}>
                 <ArrowBackIos style={{color:'white'}}></ArrowBackIos>
             </IconButton>
         </div>

         <div >
             <p> <span>{data.length == 0 ? "" : data[previousData].activiteNom}</span> </p>
         </div>

         <div>
             <IconButton  onClick={handleNextClick}>
                 <ArrowForwardIos style={{color:'white'}}></ArrowForwardIos>
             </IconButton>
         </div>


     </div>

 );
}
