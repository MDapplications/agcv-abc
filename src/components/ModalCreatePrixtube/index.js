import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { createPrixtube, refreshAllPrixtubes } from '../../Redux/actions/prixtubes'
import ModalCreateTemplate from '../ModalCreateTemplate'

const ModalCreatePrixtube = ({hideModal}) => {

    const initPrixtube = {
        marque: '',
        prix: 0.0,
        prixMembre: 0.0,
        idTypeTube: 0,
        actif: true,
    }


    //Redux
    const {token} = useSelector(state => state.user)
    const listPrixtubes = useSelector(state => state.prixtubes)
    const listTypetubes = useSelector(state => state.typetubes)


    //States
    const [prixText, setPrixText] = useState('0.0')
    const [prixMembreText, setPrixMembreText] = useState('0.0')
    const [prixTubeCreate, setPrixTubeCreate] = useState(initPrixtube)



    useEffect(() => {
        setPrixTubeCreate({...prixTubeCreate, idTypeTube: listTypetubes.typetubes[0].id})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    


    const showOptionTypeTube = listTypetubes.typetubes.map(typetubeData => 
        <option key={typetubeData.id} value={typetubeData.id}>
            {typetubeData.name + (typetubeData.comment ? ` (${typetubeData.comment})` : '')}
        </option>
    )

    const disableBtnConfirm = prixTubeCreate.marque.length < 2 || prixTubeCreate.marque.length > 40 || 
    prixTubeCreate.prix <= 0.01 || prixTubeCreate.prix < prixTubeCreate.prixMembre


    const handleChangePrix = event => {
        setPrixText(event.target.value)
        setPrixTubeCreate({...prixTubeCreate, prix: Number(event.target.value)})
    }

    const handleChangePrixMembre = event => {
        setPrixMembreText(event.target.value)
        setPrixTubeCreate({...prixTubeCreate, prixMembre: Number(event.target.value)})
    }

    const handleChange = event => setPrixTubeCreate({...prixTubeCreate, [event.target.id]: event.target.value})
    const handleChangeSelect = event => setPrixTubeCreate({...prixTubeCreate, [event.target.id]: Number(event.target.value)})

    return (
        <ModalCreateTemplate 
            hideModal={hideModal} 
            styleBody={{width: '700px'}}
            styleAlert={{width: '460px'}}
            stateSelector={listPrixtubes}
            actionCreate={() => createPrixtube(token, prixTubeCreate)}
            actionRefreshData={() => refreshAllPrixtubes(token)}
            disableBtnConfirm={disableBtnConfirm}
            title="Création d'un prix de tube">

            {/* children */}
                <Form>
                    <Form.Group className='mb-3 mx-3 text-start'>
                        
                        <Row>
                            <Col sm="3">
                                <Form.Label className='mb-0 mt-2'>
                                    Marque
                                </Form.Label>  
                            </Col>
                            <Col sm="5">
                                <Form.Control 
                                    id='marque' 
                                    className='mb-3'
                                    placeholder='Marque'
                                    value={prixTubeCreate.marque}
                                    onChange={handleChange}/>
                            </Col>
                        </Row>


                        <Row>
                            <Col sm="3">
                                <Form.Label className='mb-0 mt-2'>
                                    Prix (club)
                                </Form.Label>  
                            </Col>
                            <Col sm="5">
                                <Form.Control 
                                    id='prix' 
                                    type='number'
                                    className='mb-3'
                                    value={prixText}
                                    onChange={handleChangePrix}/>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm="3">
                                <Form.Label className='mb-0 mt-2'>
                                    Prix membre
                                </Form.Label>  
                            </Col>
                            <Col sm="5">
                                <Form.Control 
                                    id='prixMembre' 
                                    type='number'
                                    className='mb-3'
                                    min={0}
                                    value={prixMembreText}
                                    onChange={handleChangePrixMembre}/>
                            </Col>
                        </Row>
                                               
                        <Row>
                            <Col sm="3">
                                <Form.Label className='mb-0 mt-2'>
                                    Type du tube
                                </Form.Label>
                            </Col>
                            <Col sm="5">
                                <Form.Select 
                                    id='idTypeTube'
                                    defaultValue={prixTubeCreate.idTypeTube}
                                    onChange={handleChangeSelect}>
                                        {showOptionTypeTube}
                                </Form.Select> 
                            </Col>
                        </Row>         

                    </Form.Group>
                </Form>
        </ModalCreateTemplate>
    )
}

export default ModalCreatePrixtube