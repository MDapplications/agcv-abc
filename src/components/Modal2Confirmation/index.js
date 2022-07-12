import React from 'react'
import ModalTemplate from '../ModalTemplate'

const Modal2Confirmation = ({hideModal, handleConfirm, textValue, textType}) => {

    //Texte à afficher sur le message de confirmation
    const displayText = (typeof textValue === 'string')
    ? textValue !== '' ? <p className='text-center'>{textValue}</p> : <></>
    : <>{textValue}</>


    // render
    return (
        <ModalTemplate 
            hideModal={hideModal} 
            handleConfirm={handleConfirm} 
            title='Confirmation'>
                {textType ? textValue : displayText}
        </ModalTemplate>
    )
}

export default Modal2Confirmation