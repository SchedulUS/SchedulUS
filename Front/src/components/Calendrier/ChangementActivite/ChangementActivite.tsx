import Button from "@mui/material/Button";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { red, green } from '@mui/material/colors';
import { useEffect, useState } from "react";
import { APIRequest } from "../../../utils/apiUtils";
import {Dialog, DialogActions, DialogContent, DialogContentText} from "@mui/material";

export default function ChangementActivite(props:{activityId:number})
{
    const [disponibiliteChangement, setDisponibiliteChangement] = useState<boolean>(false);
    useEffect(() => {
        async function getDisponibiliteChangement()
        {
            const result = await APIRequest<boolean>(`/getDisponibiliteChangement/${props.activityId}`,"GET",true);
    const [isAttente, setIsAttente] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("")

            setDisponibiliteChangement(result.data == true)
        }

        getDisponibiliteChangement();
    },[props.activityId])


    const setChangementActivite = async () => {
        const result = await APIRequest<number>("/setChangementActivite","POST",true, {"activiteID" : props.activiteId});
        if (result.data !== undefined)
        {
            if (result.data == 1){
                setMessage("Vous êtes dans la liste d'attente")
            }
            else{
                setMessage("Il a eu un problème lors de l'ajout dans la liste d'attente")
            }
        }else{
            setMessage("Il a eu un problème lors de l'ajout dans la liste d'attente")
        }
        handleClickOpen();
    }

    const setEffectuerChangement = async () =>{
        const result = await APIRequest<number>("/setEffectuerChangement","POST",true, {"activiteID" : props.activiteId});
        if (result.data !== undefined)
        {
            if (result.data == 1){
                setMessage("Le changement de groupe a été effectué")
            }
            else{
                setMessage("Le changement de groupe n'a pas été effectué")
            }
        }else{
            setMessage("Le changement de groupe n'a pas été effectué")
        }
        handleClickOpen();
    }

    const demandeChangement = () => {
        if(isAttente){
            setChangementActivite();
        }
        else{
            setEffectuerChangement();
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="boite">
            <div className="titre">
                <span>Changement d'activité</span>
            </div>
            <div className="ligne">
                <div className="article">
                    {/*TODO : bouton de demande de changement*/}
                    <Button onClick={demandeChangement}>Demande de changement</Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {message}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Ok</Button>
                        </DialogActions>

                    </Dialog>
                </div>
            </div>
            <div className="ligne">
                <div className="article">
                    {disponibiliteChangement ? <EventAvailableIcon sx={{ fontSize: 22, color: green[700] }}/> : <EventBusyIcon sx={{ fontSize: 22, color: red[700] }}/>}
                    <span className="texte">Disponibilité</span>
                </div>
            </div>
        </div>
    )
}