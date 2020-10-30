import React, { useEffect, useState } from 'react'

import 'date-fns';
import { format } from 'date-fns'

import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Favorite from '@material-ui/icons/Favorite';

import Picture from './Picture'
import '../css/picturebox.css'
import '../css/buttoncard.css'
import DateSelect from './DateSelect';
import NotFound from './NotFound';


function PictureBox() {

    const today = Date.now();
    const [selectedDate, setSelectedDate] = useState(new Date(today))

    const [image, setImage] = useState('')
    const [date, setDate] = useState('')
    const [title, setTitle] = useState('')
    const [explanation, setExplanation] = useState('')
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {

        let formatdate=format(new Date(selectedDate), 'yyyy-MM-dd')  
        
        fetch(`https://api.nasa.gov/planetary/apod?api_key=fiM5A29M56jzWZaeNe9MZp2Wp7V7yu7jHZlqS5GS&date=${formatdate}`)
        .then(response => response.json())
        .then(data => {
            setImage(data.url)
            setTitle(data.title)
            setDate(data.date)
            setExplanation(data.explanation)
            if(data.code===400) setNotFound(true)
            else setNotFound(false)
          //  console.log(data)
         });
       
    }, [selectedDate])  

    const handlePrevDay = ()=>{
        let prevday = new Date(selectedDate)
        prevday.setDate(prevday.getDate() - 1)
        setSelectedDate(prevday)
    }

    const handleNextDay = ()=>{
        let nextday = new Date(selectedDate)
        nextday.setDate(nextday.getDate() + 1)
        setSelectedDate(nextday)
    }


    return (
        <>
         <div className="row top " >
           
            <div className="column left">
                <div className="buttoncard" >

                    <IconButton className="toCenter align" onClick={handlePrevDay}  aria-label="Before Image">
                        <ArrowBack fontSize="large" />Prev Day
                    </IconButton>

                    <IconButton className="toCenter align" aria-label="Add To Favorite">
                         <Favorite fontSize="large" />Add to Favorite
                    </IconButton>

                </div>
            </div>

            <div className="column middle ">

                { notFound===false
                ? <Picture  image={image} date={date} title={title} explanation={explanation} />
                
                :   <NotFound /> }

            </div>

            <div className="column right">
                <div className="buttoncard">

                    <IconButton onClick={handleNextDay} className="toCenter align" aria-label="Next Image">
                         <ArrowForward fontSize="large" />Next Day
                    </IconButton>
                    
                    <div className=" toCenter align">
                        <DateSelect selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                    </div>

                </div> 
            </div>
           
        </div>
        
        </>
    )
}

export default PictureBox
