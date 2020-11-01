import React, { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';


import {API_URL} from '../config/config'

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
import Favorites from './Favorites';   
import { PrevDayAction, NextDayAction, SelectedDayAction, RemoveFromFavoritesAction, AddToFavoriteAction } from '../actions/pictureActions';


function PictureBox() {

    const dispatch = useDispatch()

    const today = Date.now(); 
    const [selectedDate, setSelectedDate] = useState(new Date(today))

    const [image, setImage] = useState('')
    const [date, setDate] = useState('')
    const [title, setTitle] = useState('')
    const [explanation, setExplanation] = useState('')
    const [notFound, setNotFound] = useState(false)
    const [imgFavorites, setImgFavorites] = useState([])
    const [saved, setSaved] = useState(false)

    const [imgYesterday, setImgYesterday] = useState('')
    const [imgTomorrow, setImgTomorrow] = useState('')

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    //function to open the modal
    const handleOpen = () => {
        setOpen(true);
    };
    //function to close the modal
    const handleClose = () => {
        setOpen(false);
      };

    //function to get the TODAY picture of they From NASA-API
    useEffect(() => {

        async function fetchData(){
        
        let SelectDate = new Date (selectedDate) 
        let formatdate=format(new Date(selectedDate), 'yyyy-MM-dd') //2020-10-31
        
        let prevDay = new Date(SelectDate);
        prevDay.setDate(SelectDate.getDate() -1); //FRi 30 OCT 
        prevDay=format(new Date(prevDay), 'yyyy-MM-dd')
      
        let nextDay = new Date(SelectDate);
        nextDay.setDate(SelectDate.getDate() + 1); //SUN 1 NOv 
        nextDay=format(new Date(nextDay), 'yyyy-MM-dd')

        
        //FROM TODAY
        fetch(`https://api.nasa.gov/planetary/apod?api_key=fiM5A29M56jzWZaeNe9MZp2Wp7V7yu7jHZlqS5GS&date=${formatdate}`)
        .then(response => response.json())
        .then(data => {
           
            if(data.code===400) setNotFound(true)
            else 
            {
                setImage(data.url)
                setTitle(data.title)
                setDate(data.date) 
                setExplanation(data.explanation)
                setNotFound(false)

                dispatch(SelectedDayAction(selectedDate, data.url, data.date,data.title,data.explanation, false))
            }
           console.log(data)
         });

         //FROM YESTERDAY
         fetch(`https://api.nasa.gov/planetary/apod?api_key=fiM5A29M56jzWZaeNe9MZp2Wp7V7yu7jHZlqS5GS&date=${prevDay}`)
        .then(response => response.json())
        .then(dataYesteday => {
           
            if(dataYesteday.code===400){
                setNotFound(true)
                setImgYesterday('https://thumbs.dreamstime.com/b/space-stars-cosmonaut-rocket-site-error-page-not-found-space-stars-cosmonaut-rocket-site-132854703.jpg')
            } 
            else 
            {
                setImgYesterday(dataYesteday.url)
                setNotFound(false)}
         });

         //FROM TOMOROW
         fetch(`https://api.nasa.gov/planetary/apod?api_key=fiM5A29M56jzWZaeNe9MZp2Wp7V7yu7jHZlqS5GS&date=${nextDay}`)
        .then(response => response.json())
        .then(dataTomorrow => {
           
            if(dataTomorrow.code===400) 
            {
                setNotFound(true)
                setImgTomorrow('https://thumbs.dreamstime.com/b/space-stars-cosmonaut-rocket-site-error-page-not-found-space-stars-cosmonaut-rocket-site-132854703.jpg')
            }
            else{
                setImgTomorrow(dataTomorrow.url)
                setNotFound(false)
            } 
         });

        }

         fetchData()
       
    }, [selectedDate,dispatch])  

    //Function to get the Favorites Image From Data Base
    useEffect( () => {
      
        //BY LOCALSTORAGE
        //setFavorites(JSON.parse(localStorage.getItem('imgFavorites')))

        //Gets the pictures from Data base
            async function FindPictures(){

                const res = await axios.get(API_URL+'/pictures')
                setImgFavorites(res.data.pictures)
            }
        FindPictures()

    }, [saved])

    //function to Handle the Prev Button Day
    const handlePrevDay = ()=>{

        let prevday = new Date(selectedDate)
        prevday.setDate(prevday.getDate() - 1)
        setSelectedDate(prevday)
        dispatch(PrevDayAction(prevday))
        
    }

    //Function tu Handle The Button of Next Day
    const handleNextDay = ()=>{
        let nextday = new Date(selectedDate)
        nextday.setDate(nextday.getDate() + 1)
        setSelectedDate(nextday)
        dispatch(NextDayAction(nextday))
    }

    //Function to Save Favorite to DataBAse
    const AddToFavorite = async ()=>{
        
        //SAVE FAvoreite to LocalStorage
        /*imgFavorites.push(
            {
                image,
                date,
                title,
                explanation}
        )
        localStorage.setItem('imgFavorites',JSON.stringify(imgFavorites))*/

        try {
           
            let resp = await axios.post(API_URL+'/pictures', {
            url:image,
            date,
            title,
            explanation
        })
       console.log(resp)
        if (resp.data.ok===true){

            handleOpen()
            setSaved(!saved)
            dispatch(AddToFavoriteAction(!saved))
        }
        else{
            console.log("Error Saveing Pictures To Favorites")
        }
        
        } catch (error) {
            
            console.log(error)
        } 

    }

    //Function to Delete From Favorities
    const DeleteFromFavorites = async(id) => {

        try {

            await axios.delete(API_URL+"/pictures/delete/" + id);
            setSaved(!saved)
            dispatch(RemoveFromFavoritesAction(!saved))

        } catch (error) {
            console.log(error)
        }

    }

    
    return (
        <> 
         <div className="row top " >
           
            <div className="column left">
                <div className="buttoncard" >

                    <IconButton className="toCenter align" onClick={handlePrevDay}  aria-label="Before Image">
                        <ArrowBack fontSize="large" />Prev Day
                    </IconButton>
                    <img alt="Prev Day" src={imgYesterday} width="50%" />

                    <IconButton onClick={AddToFavorite} className="toCenter align top150" aria-label="Add To Favorite">
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
                    <img alt="Next Day" src={imgTomorrow} width="50%" />
                    
                    <div className=" toCenter align top150">
                        <DateSelect selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                    </div>

                </div> 
            </div>

        </div>
        
        <Grid container spacing={3} className="favorites">
        { 
            imgFavorites.map(favorite=>(

                <Favorites DeleteFromFavorites={DeleteFromFavorites} key={favorite._id} id={favorite._id} image={favorite.url} date={favorite.date} title={favorite.title} />  
            ))
        }
        </Grid>
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
