import Button from "@mui/material/Button";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import * as React from "react";
import {APIRequest} from "../../../utils/apiUtils.ts";
import {Dialog, DialogActions, DialogContent, DialogContentText} from "@mui/material";

export default function ChangementActivite(props:{activiteId:number})
{
    const [isAttente, setIsAttente] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("")


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
                    {/*TODO : Vérifier la disponibilité */}
                    {true ? <EventAvailableIcon sx={{ fontSize: 22 }} color="success"/> : <EventBusyIcon sx={{ fontSize: 22 }} color="disabled"/>}
                    <span className="texte">Disponibilité</span>
                </div>
            </div>
        </div>
    )
}