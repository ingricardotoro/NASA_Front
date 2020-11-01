import React from 'react';
import 'date-fns';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme) => ({
 
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },

  
}));

export default function Picture({title,date,image,explanation,id, DeleteFromFavorites}) {

  const classes = useStyles();
  let shortDate=''
  if(date){

      shortDate = date.slice(0, 10);
  }

  return (
    <Card >
      <CardHeader
        title={title}
        subheader={shortDate}
      />
      <CardMedia
        className={classes.media}
        image={image}
        title={title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
         {explanation}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton onClick={ () => DeleteFromFavorites(id) } aria-label="Delete">
          <DeleteIcon /> Delete From Favorities
        </IconButton>
      </CardActions>
    
    </Card>
  );
}
