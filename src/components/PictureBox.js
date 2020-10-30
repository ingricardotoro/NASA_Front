import IconButton from '@material-ui/core/IconButton';

import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Favorite from '@material-ui/icons/Favorite';
import React, { useEffect, useState } from 'react'

import Picture from './Picture'
import '../css/picturebox.css'
import '../css/buttoncard.css'
import DateSelect from './DateSelect';


function PictureBox() {

    const [image, setImage] = useState('')
    const [date, setDate] = useState('')
    const [title, setTitle] = useState('')
    const [explanation, setExplanation] = useState('')

    useEffect(() => {
        fetch("https://api.nasa.gov/planetary/apod?api_key=fiM5A29M56jzWZaeNe9MZp2Wp7V7yu7jHZlqS5GS&date=2020-10-27")
        .then(response => response.json())
        .then(data => {
            setImage(data.url)
            setTitle(data.title)
            setDate(data.date)
            setExplanation(data.explanation)
            console.log(data)
         });
       
    }, [])


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
                <Picture  image={image} date={date} title={title} explanation={explanation} />
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
