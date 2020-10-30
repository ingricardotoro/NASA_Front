import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
 
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },

  
}));

export default function Picture(props) {

  const classes = useStyles();

  return (
    <Card >
      <CardHeader
        title={props.title}
        subheader={props.date}
      />
      <CardMedia
        className={classes.media}
        image={props.image}
        title={props.title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
         {props.explanation}
        </Typography>
      </CardContent>
    
    </Card>
  );
}
