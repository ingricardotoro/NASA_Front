import IconButton from '@material-ui/core/IconButton';

import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Favorite from '@material-ui/icons/Favorite';
import React from 'react'

import Picture from './Picture'
import '../css/picturebox.css'
import '../css/buttoncard.css'
import DateSelect from './DateSelect';


function PictureBox() {
    return (
        <>
         <div className="row top " >
           
            <div className="column left">
                <div className="buttoncard" >

                    <IconButton className="toCenter align" aria-label="Before Image">
                         <ArrowBack fontSize="large" />Back
                    </IconButton>

                    <IconButton className="toCenter align" aria-label="Add To Favorite">
                         <Favorite fontSize="large" />Add
                    </IconButton>

                </div>
            </div>

            <div className="column middle ">
                <Picture  />
            </div>

            <div className="column right">
                <div className="buttoncard">

                    <IconButton className="toCenter align" aria-label="Next Image">
                         <ArrowForward fontSize="large" />Next 
                    </IconButton>
                    
                    <div className=" toCenter align">
                        <DateSelect />
                    </div>

                </div> 
            </div>
           
        </div>
        
        </>
    )
}

export default PictureBox
