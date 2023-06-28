import {
    Scheduler,
    DayView,
    Appointments,
    AppointmentTooltip,
  } from '@devexpress/dx-react-scheduler-material-ui';
import "./Calendrier.css"
import { ViewState } from '@devexpress/dx-react-scheduler';
import { DateInISO } from '../../utils/dateUtils';
import { Activite } from './Activite';
import { Grid } from '@mui/material';
import Room from '@mui/icons-material/Room';
import { styled } from '@mui/material/styles';
import ChangementActivite from "./ChangementActivite/ChangementActivite.tsx";

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

function generateTooltip(inscription:boolean, idActiviteUsager:number)
{
    return (({
                 appointmentData, ...restProps
             }) => (
        <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
            <Grid container alignItems="center">
                <StyledGrid item xs={2} className={classes.textCenter}>
                    <StyledRoom className={classes.icon} />
                </StyledGrid>
                <Grid item xs={10}>
                    <span>{appointmentData.location}</span>

                </Grid>
            </Grid>
            {(inscription && !(idActiviteUsager == appointmentData.id)) ? <ChangementActivite activityId={appointmentData.id}/> : <></>}
        </AppointmentTooltip.Content>
    ));
}

export function Calendrier(props:{activities:Activite[], currentDate:Date, inscription:boolean, idActiviteUsager:number})
{
    return(
      <div id='calendrier'>
        <Scheduler
          locale="fr-CA"
          data={props.activities}
        >
          <ViewState
            currentDate={DateInISO(props.currentDate)}
          />
          <DayView
            cellDuration={60}
            startDayHour={8}
            endDayHour={18}
          />
          <Appointments appointmentComponent={Appointment} />
          <AppointmentTooltip contentComponent={generateTooltip(props.inscription, props.idActiviteUsager)} />
        </Scheduler>
      </div>
        
    )
}