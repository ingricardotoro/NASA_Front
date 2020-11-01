import React from 'react';
import Grid from '@material-ui/core/Grid';
import Picture from './Picture';

import '../css/favorites.css'

export default function Favorites(props) {

  return (
        
        <Grid key={props.title} item xs={6} sm={3}>
            <Picture 
            id={props.id}
            image={props.image}
            date={props.date}
            title={props.title}
            DeleteFromFavorites={props.DeleteFromFavorites}
            />
        </Grid>
        
    
  );
}
   