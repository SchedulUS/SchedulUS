import { Scheduler, DayView, Appointments, AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
import "./Calendrier.css"
import { ViewState } from '@devexpress/dx-react-scheduler';
import { DateInISO } from '../../utils/dateUtils';
import { Activite } from './Activite';
import { Grid } from '@mui/material';
import Room from '@mui/icons-material/Room';
import { styled } from '@mui/material/styles';
import ChangementActivite from "./ChangementActivite/ChangementActivite.tsx";
import {ResultatActivite} from "../../types/api/getActivites/resultatActivite.ts";
import IconeInfo from '@mui/icons-material/Info';
import IconeTemps from '@mui/icons-material/AccessTime';
import IconePlace from '@mui/icons-material/Place';
import IconePersonne from '@mui/icons-material/Person';
import {orange} from "@mui/material/colors";
const PREFIX = 'Calendar';

const classes = {
  icon: `${PREFIX}-icon`,
  textCenter: `${PREFIX}-textCenter`,
  firstRoom: `${PREFIX}-firstRoom`,
  secondRoom: `${PREFIX}-secondRoom`,
  thirdRoom: `${PREFIX}-thirdRoom`,
  header: `${PREFIX}-header`,
  commandButton: `${PREFIX}-commandButton`,
};

const StyledGrid = styled(Grid)(() => ({
  [`&.${classes.textCenter}`]: {
    textAlign: 'center',
  },
}));

const StyledRoom = styled(Room)(({ theme: { palette } }) => ({
  [`&.${classes.icon}`]: {
    color: palette.action.active,
  },
}));

const Appointment = ({
  children, style, ...restProps
}) => {
  return (
  <Appointments.Appointment
    {...restProps}
    style={{
      ...style,
      backgroundColor: restProps.data.backgroundColor
    }}
  >
    {children}
    <span style={style}>Local : {restProps.data.location}</span>
  </Appointments.Appointment>
  );
}

const SansHeader = () => null;

function getTempsSeance(appointmentData: any): string
{
    const startHour = new Date(appointmentData.startDate).getHours();
    const startMinutes = new Date(appointmentData.startDate).getMinutes();
    const endHour = new Date(appointmentData.endDate).getHours();
    const endMinutes = new Date(appointmentData.endDate).getMinutes();

    const formattedStartHour = startHour.toString().padStart(2, '0');
    const formattedStartMinutes = startMinutes.toString().padStart(2, '0');
    const formattedEndHour = endHour.toString().padStart(2, '0');
    const formattedEndMinutes = endMinutes.toString().padStart(2, '0');

    return `${formattedStartHour}:${formattedStartMinutes} - ${formattedEndHour}:${formattedEndMinutes}`;
}

function contenuInfoBulle(inscription:boolean, activiteUsager:ResultatActivite)
{
    console.log(activiteUsager)
    return (({
                 appointmentData
             }) => (
        <div className="conteneur_transparent ombre">
            <div className="boite">
                <div className="titre article barre">
                    <IconeInfo sx={{ fontSize: 32, color: appointmentData.backgroundColor }}/>
                    <span className="texte">{appointmentData.title}</span>
                </div>
                <div className="article2 barre">
                    <IconeTemps sx={{ fontSize: 22 }}/>
                    <span className="texte">{getTempsSeance(appointmentData)}</span>
                </div>
                <div className="article2">
                    <IconePlace sx={{ fontSize: 22 }}/>
                    <span className="texte">{appointmentData.location}</span>
                </div>
            </div>

            {
                (inscription && !(activiteUsager.activiteId == appointmentData.id) && !activiteUsager.intendant) ?
                    <div className="espace">
                        <ChangementActivite activityId={appointmentData.id}/>
                    </div>
                    :
                    <></>
            }
            {
                (inscription && (activiteUsager.activiteId == appointmentData.id) && activiteUsager.intendant) ?
                    <div className="boite espace">
                        <div className="article2">
                            <IconePersonne sx={{ fontSize: 22, color: orange[700] }}/>
                            <span className="texte">Vous êtes intendant</span>
                        </div>
                    </div>
                    :
                    <></>
            }
        </div>
    ))
}

function generateTooltipAncien(inscription:boolean, activiteUsager:ResultatActivite)
{
    console.log(activiteUsager)
    return (({
                 appointmentData, ...restProps
             }) => (
        <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData} className="boite ombre">
            <Grid container alignItems="center">
                <StyledGrid item xs={2} className={classes.textCenter}>
                    <StyledRoom className={classes.icon} />
                </StyledGrid>
                <Grid item xs={10}>
                    <span>{appointmentData.location}</span>
                </Grid>
            </Grid>
            {(inscription && !(activiteUsager.activiteId == appointmentData.id) && !activiteUsager.intendant) ? <ChangementActivite activityId={appointmentData.id}/> : <></>}
            {(inscription && (activiteUsager.activiteId == appointmentData.id) && activiteUsager.intendant) ? <p>Vous êtes intendant</p> : <></>}

        </AppointmentTooltip.Content>
    ))
}

export function Calendrier(props:{activities:Activite[], currentDate:Date, inscription:boolean, activiteUsager:ResultatActivite})
{
    return(
      <div id='calendrier'>
        <Scheduler locale="fr-CA" data={props.activities}>
            <ViewState currentDate={DateInISO(props.currentDate)}/>
            <DayView cellDuration={60} startDayHour={7} endDayHour={22}/>
            <Appointments appointmentComponent={Appointment}/>
            <AppointmentTooltip headerComponent={SansHeader} contentComponent={contenuInfoBulle(props.inscription, props.activiteUsager)}/>
        </Scheduler>
      </div>
    )
}