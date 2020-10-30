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

export default function NotFound(props) {

  const classes = useStyles();

  return (
    <Card >
      <CardHeader
        title="sorry, Image Not Found"
        subheader="Try Another Day"
      />
      <CardMedia
        className={classes.media}
        image="https://thumbs.dreamstime.com/b/space-stars-cosmonaut-rocket-site-error-page-not-found-space-stars-cosmonaut-rocket-site-132854703.jpg"
        title="Image not Found"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
            We did not find any image for this day
        </Typography>
      </CardContent>
    
    </Card>
  );
}
