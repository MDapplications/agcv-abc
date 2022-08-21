import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = ({loadingMsg, color, isMsg}) => {
    
    const displayColor = color ? `${color}` : 'primary'
    const activeMessage = isMsg === undefined ? true : isMsg
    const message = loadingMsg === undefined ? 'Chargement en cours...' : loadingMsg

    const displayMsg = activeMessage && 
    <div className='mt-2'>
        <span>{message}</span>
    </div> 

    return (
        <div className='d-flex flex-column'>
            <div className='d-flex justify-content-center mt-4'>
                <Spinner animation='border' variant={displayColor}/>
            </div>
            {displayMsg}          
        </div>
    )
}

export default Loader