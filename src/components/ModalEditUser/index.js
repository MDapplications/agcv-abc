import React from 'react'
import { Button, Modal } from 'react-bootstrap'


const ModalEditUser = ({hideModal, handleConfirm, children}) => {
    return (
        <div className='modalBackground'>
            <div className='modal-dialog card-form'>
                <div className='modal-content'>

                    <Modal.Header>
                        <Modal.Title>
                            Modification de l'utilisateur
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body style={{width: '500px'}}>
                        {children}
                    </Modal.Body>

                    <Modal.Footer className='d-flex justify-content-between'>
                        <span className='me-2'>
                            <Button variant='primary' onClick={handleConfirm}>Modifier</Button>
                        </span>
                        <span>
                            <Button variant='danger' onClick={hideModal}>Annuler</Button>
                        </span>
                    </Modal.Footer>

                </div>
            </div>
        </div>
    )
}

export default ModalEditUser