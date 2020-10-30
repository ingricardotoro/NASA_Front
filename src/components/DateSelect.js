import 'date-fns';
import { format } from 'date-fns'
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function Dateselect(props) {


   const handleDateChange = (date) => {
    date=format(new Date(date), 'yyyy-MM-dd')  
    props.setSelectedDate(date);
  };


  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="yyyy/MM/dd"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={props.selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
       
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
