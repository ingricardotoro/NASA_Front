import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

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
//import ModalFavorites from './ModalFavorites';



function PictureBox() {

    const today = Date.now();
    const [selectedDate, setSelectedDate] = useState(new Date(today))

    const [image, setImage] = useState('')
    const [date, setDate] = useState('')
    const [title, setTitle] = useState('')
    const [explanation, setExplanation] = useState('')
    const [notFound, setNotFound] = useState(false)
    const [imgFavorites, setImgFavorites] = useState([])
    const [saved, setSaved] = useState(false)

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
      };

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
    const AddToFavorite =()=>{
        
        imgFavorites.push(
            {
                image,
                date,
                title,
                explanation}
        )
       
        localStorage.setItem('imgFavorites',JSON.stringify(imgFavorites))
        handleOpen()

    }

    
    return (
        <> 
         <div className="row top " >
           
            <div className="column left">
                <div className="buttoncard" >

                    <IconButton className="toCenter align" onClick={handlePrevDay}  aria-label="Before Image">
                        <ArrowBack fontSize="large" />Prev Day
                    </IconButton>

                    <IconButton onClick={AddToFavorite} className="toCenter align" aria-label="Add To Favorite">
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

        <Modal
            aria-labelledby="Save Image"
            aria-describedby="This image has been save in Favorites"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            <Fade in={open}>
            <div className={classes.paper}>
                <h2 id="transition-modal-title">Image Saved</h2>
                <p id="transition-modal-description">This image has been save in Favorites</p>
            </div>
            </Fade>
      </Modal>
        
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

export default PictureBox
