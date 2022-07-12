import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

const ModalTemplate = ({hideModal, 
                        handleConfirm, 
                        title, 
                        styleBody,
                        captionBtnConfirm, 
                        captionBtnBack,
                        btnConfirm,
                        children}) => {


    const [captionConfirm, setCaptionConfirm] = useState('Valider')
    const [captionBack, setCaptionBack] = useState('Annuler')
    const [buttonConfirm, setButtonConfirm] = useState(null)


    useEffect(() => {
        if (captionBtnConfirm !== undefined) {
            setCaptionConfirm(captionBtnConfirm)
        }
    }, [captionBtnConfirm])
    

    useEffect(() => {
        if (captionBtnBack !== undefined) {
            setCaptionBack(captionBtnBack)
        }
    }, [captionBtnBack])


    useEffect(() => {
        if (btnConfirm !== undefined) {
            setButtonConfirm(btnConfirm)
        } else {
            setButtonConfirm(<Button variant='success' onClick={handleConfirm}>{captionConfirm}</Button>)
        }
    }, [btnConfirm])


    // render
    return (
        <div className='modalBackground'>
            <div className='modal-dialog card-form'>
                <div className='modal-content'>
                    <Modal.Header>
                        <Modal.Title>
                            {title}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body style={styleBody}>
                        {children}
                    </Modal.Body>

                    <Modal.Footer className='d-flex justify-content-between'>
                        <span className='me-2'>
                            {buttonConfirm}
                        </span>
                        <span>
                            <Button variant='danger' onClick={hideModal}>{captionBack}</Button>
                        </span>
                    </Modal.Footer>
                </div>
            </div>
        </div>
    )
}

export default ModalTemplate