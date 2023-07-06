import Button from "@mui/material/Button";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { red, green } from '@mui/material/colors';
import { useEffect, useState } from "react";
import { APIRequest } from "../../../utils/apiUtils";
import * as React from "react";
import {Dialog, DialogActions, DialogContent, DialogContentText} from "@mui/material";
import {ChangementActiviteModele} from "./ChangementActiviteModele";

export default function ChangementActivite(props:{activityId:number})
{
    const [disponibiliteChangement, setDisponibiliteChangement] = useState<boolean>(false);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [estAttente, setEstAttente] = React.useState<boolean>(false);
    const [reload,setReload] = React.useState(false);

    useEffect(() => {
        async function getDisponibiliteChangement()
        {
            const result = await APIRequest<boolean>(`/getDisponibiliteChangement/${props.activityId}`,"GET",true);


            setDisponibiliteChangement(result.data == true)
        }

        getDisponibiliteChangement();
    },[props.activityId])


    const setChangementActivite = async () => {
        const result = await APIRequest<number>("/setChangementActivite","POST",true, {"activiteID" : props.activityId});
        if (result.data !== undefined)
        {
            if (result.data == 1){
                setMessage("Vous êtes dans la liste d'attente")
                setReload(true)
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
        const result = await APIRequest<number>("/setEffectuerChangement","POST",true, {"activiteID" : props.activityId});
        if (result.data !== undefined)
        {
            if (result.data == 1){
                setMessage("Le changement de groupe a été effectué")
                setReload(true)
            }
            else{
                setMessage("Le changement de groupe n'a pas été effectué")
            }
        }else{
            setMessage("Le changement de groupe n'a pas été effectué")
        }
        handleClickOpen();
    }

    const getChangementActivite = async () =>{
        const result = await APIRequest<ChangementActiviteModele[]>("/getChangementActivite","GET",true);
        if (result.data !== undefined && result.data.length > 0)
        {
            if(result.data[0].activiteID == props.activityId){
                setEstAttente(true)
            }
            else{
                setEstAttente(false)
            }
        }
        else{
            setEstAttente(false)
        }
    }

    const deleteChangementActivite = async () =>{
        await APIRequest<number>("/deleteChangmentActivite","DELETE",true);
        buttonDemandeAnnulerChangement();
    }

    const demandeChangement = () => {
        if(!disponibiliteChangement){
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
        if (reload)
        {
            window.location.reload();
        }
    };

    function buttonDemandeAnnulerChangement() {
        getChangementActivite();
        if(estAttente){
            return(
                <Button onClick={deleteChangementActivite}>Annuler la demande</Button>
            )
        }
        else{
            return(
                <Button onClick={demandeChangement}>Demande de changement</Button>
            )
        }
    }

    return (
        <div className="boite">
            <div className="titre">
                <span>Changement d'activité</span>
            </div>
            <div className="ligne">
                <div className="article">
                    {buttonDemandeAnnulerChangement()}
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