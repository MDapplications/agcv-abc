import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { createMembre, refreshAllMembres } from '../../Redux/actions/membres'
import ModalCreateTemplate from '../ModalCreateTemplate'


const ModalCreateMembre = ({hideModal}) => {
    
    const initMembre = {
        prenom: '',
        nom: '',
        actif: true,
    }


    //Redux
    const {token} = useSelector(state => state.user)
    const listMembres = useSelector(state => state.membres)


    //States
    const [membreCreate, setMembreCreate] = useState(initMembre)
    

    const handleChange = event => setMembreCreate({...membreCreate, [event.target.id]: event.target.value})

    
    return (

        <ModalCreateTemplate 
            hideModal={hideModal} 
            styleBody={{width: '700px'}}
            styleAlert={{width: '460px'}}
            stateSelector={listMembres}
            actionCreate={() => createMembre(token, membreCreate)}
            actionRefreshData={() => refreshAllMembres(token)}
            title="Création membre">

            {/* children */}
                <Form>
                    <Form.Group className='mb-3 mx-3 text-start'>
                        
                        <Row>
                            <Col sm="3">
                                <Form.Label className='mb-0 mt-2'>
                                    Prénom
                                </Form.Label>  
                            </Col>
                            <Col sm="5">
                                <Form.Control 
                                    id='prenom' 
                                    placeholder='Prénom'
                                    className='mb-3'
                                    value={membreCreate.prenom}
                                    onChange={handleChange}/>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm="3">
                                <Form.Label className='mb-0 mt-2'>
                                    Nom
                                </Form.Label>  
                            </Col>
                            <Col sm="5">
                                <Form.Control 
                                    id='nom' 
                                    placeholder='Nom'
                                    value={membreCreate.nom}
                                    onChange={handleChange}/>
                            </Col>
                        </Row>

                    </Form.Group>
                </Form>
        </ModalCreateTemplate>
    )
}

export default ModalCreateMembre