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
function RemoveRedundants(activites:Activite[])
{
    const seen = {};
    return activites.filter(function(item) {
        // eslint-disable-next-line no-prototype-builtins
        return seen.hasOwnProperty(item.activiteNom) ? false : (seen[item.activiteNom] = true);
    });
}

export default function Navigateur(props:{setAppCourant:(number)=>void,setTypeActiviteCourant:(number)=>void}) {
    const [data, setData] = useState<Activite[]>([]);
    const [previousData, setPrevious] = useState<number>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await APIRequest<Activite[]>("/getActivites","GET",true);
                if(result.data) {
                    setData(RemoveRedundants(result.data));
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
        props.setAppCourant(data[previousData + 1].appId)
        props.setTypeActiviteCourant(data[previousData + 1].typeId)
    };

    const handlePreviousClick = () => {
        if (previousData >= 1) {
            setPrevious(previousData - 1);
            props.setAppCourant(data[previousData - 1].appId)
            props.setTypeActiviteCourant(data[previousData - 1].typeId)
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
