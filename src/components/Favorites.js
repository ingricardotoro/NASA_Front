import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Picture from './Picture';

import '../css/favorites.css'

export default function Favorites() {

    const [favorites, setFavorites] = useState([])
    useEffect(() => {
      
        setFavorites(JSON.parse(localStorage.getItem('imgFavorites')))
        
    }, [])

  return (
    
      <Grid container spacing={3} className="favorites">
        {
            favorites.map(favorite => (
                <Grid key={favorite.title} item xs={6} sm={3}>
                    <Picture 
                    image={favorite.image}
                    date={favorite.date}
                    title={favorite.title}
                    />
                </Grid>
            ))
        } 
      </Grid>
    
  );
}
   