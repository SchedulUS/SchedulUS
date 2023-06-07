import {useEffect, useState} from 'react';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import {APIRequest} from "../utils/apiUtils.ts";
import "./Navigateur.css";


export default function Navigateur() {
    const [data, setData] = useState<any>(null);
    useEffect(() => {
        const fetchData = async () => {
            try{
                const result = await APIRequest<[]>("/getActivite","GET",true);
                const listNom = result.data;
                setData(listNom);
                console.log(result);
                setNomApp(data[0]);
            }
            catch (error){
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    },[])


 const [nomApp, setNomApp] = useState<string>(null);

 const [previousData, setPrevious] = useState<number>(0);

    const handleNextClick = () => {
        setNomApp(data[previousData + 1]);
        setPrevious(previousData + 1);
    };

    const handlePreviousClick = () => {
        if (previousData > 1) {
            setNomApp(data[previousData - 1]);
            setPrevious(previousData - 1);
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
