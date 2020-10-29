import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../css/buttoncard.css'


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ButtonCard(props) {

  const classes = useStyles();

  return (
    <Card className={classes.root} className="buttoncard">
      <CardContent>
        <CardActions>
            <Button size="small">
            <Typography variant="h5" component="h2">
             
            </Typography>
            </Button>
        </CardActions>    
          {props.text}
        <Typography className={classes.pos} color="textSecondary">
          {props.direction}
        </Typography>
      </CardContent>
    </Card>
  );
}
