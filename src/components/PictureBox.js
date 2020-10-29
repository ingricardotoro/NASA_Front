
import ButtonCard from './ButtonCard'
import React from 'react'
import Picture from './Picture'
import '../css/picturebox.css'
import '../css/buttoncard.css'


function PictureBox() {
    return (
        <div className="picturebox">

            <div className="buttoncard">
                    Before Image
            </div>

            <Picture>

            </Picture>

            <div className="buttoncard">
                  Next Image
            </div> 

        </div>
    )
}

export default PictureBox
