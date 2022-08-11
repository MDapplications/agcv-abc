import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { editCommande, refreshAllCommandes } from '../../Redux/actions/commandes'
import ModalEditTemplate from '../ModalEditTemplate'

const ModalEditCommande = ({hideModal, commandeData, idSaison}) => {

    const md = 4

    //Redux
    const {token} = useSelector(state => state.user)
    const listCommandes = useSelector(state => state.commandes)

    //States
    const [commandeEdit, setCommandeEdit] = useState(commandeData)

    const handleChangeSwitch = event => setCommandeEdit({...commandeEdit, [event.target.id]: event.target.checked})
    

    return (
        <ModalEditTemplate 
            hideModal={hideModal} 
            title="Modification de la commande"
            styleBody={{width: '700px'}}
            styleAlert={{width: '460px'}}
            stateSelector={listCommandes}
            actionRefreshData={() => refreshAllCommandes(token, idSaison)}
            actionEdit={() => editCommande(token, commandeEdit)}>

            {/*children*/}
                <Form> 
                    <Form.Group className='mb-3 mx-3 text-start'>
                    
                        <Row>
                            <Col md={md}>
                                <Form.Label className='mb-1 mt-4'>
                                    Commande réglée ?
                                </Form.Label>
                            </Col>
                            <Col md={md}>
                                <Form.Check
                                    className='mt-4' 
                                    type="switch"
                                    id="status"
                                    checked={commandeEdit.status}
                                    onChange={handleChangeSwitch}/>
                            </Col>
                        </Row>

                    </Form.Group>
                </Form>

        </ModalEditTemplate>
    )
}

export default ModalEditCommande
