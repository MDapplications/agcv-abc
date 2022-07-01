import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = ({loadingMsg, color}) => {
    
    const displayColor = color ? `${color}` : 'primary'
    
    return (
        <div className='d-flex flex-column'>
            <div className='d-flex justify-content-center mt-4'>
                <Spinner animation='border' variant={displayColor}/>
            </div>
            <div className='mt-2'>
                <span>{loadingMsg || 'Chargement en cours...'}</span>
            </div>           
        </div>
    )
}

export default Loader