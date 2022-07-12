import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { editPrixtube, refreshAllPrixtubes } from '../../Redux/actions/prixtubes'
import ModalEditTemplate from '../ModalEditTemplate'

const ModalEditPrixtube = ({hideModal, prixtubeData}) => {

    //Redux
    const {token} = useSelector(state => state.user)
    const listPrixtubes = useSelector(state => state.prixtubes)
 

    //States
    const [prixText, setPrixText] = useState('0.0')
    const [prixMembreText, setPrixMembreText] = useState('0.0')
    const [prixtubeEdit, setPrixtubeEdit] = useState(prixtubeData)



    useEffect(() => {
        setPrixText(String(prixtubeData.prix))
        setPrixMembreText(String(prixtubeData.prixMembre))
    }, [prixtubeData])



    const handleChangePrix = event => {
        setPrixText(event.target.value)
        setPrixtubeEdit({...prixtubeEdit, prix: Number(event.target.value)})
    }

    const handleChangePrixMembre = event => {
        setPrixMembreText(event.target.value)
        setPrixtubeEdit({...prixtubeEdit, prixMembre: Number(event.target.value)})
    }

    const handleChange = event => setPrixtubeEdit({...prixtubeEdit, [event.target.id]: event.target.value})
    const handleChangeCheck = event => setPrixtubeEdit({...prixtubeEdit, [event.target.id]: event.target.checked})


    return (
        <ModalEditTemplate 
            hideModal={hideModal} 
            title="Modification du prix de tube"
            styleBody={{width: '700px'}}
            styleAlert={{width: '460px'}}
            stateSelector={listPrixtubes}
            actionRefreshData={() => refreshAllPrixtubes(token)}
            actionEdit={() => editPrixtube(token, prixtubeEdit)}>

            {/*children*/}
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
                                    value={prixtubeEdit.marque}
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
                                    placeholder='10.50'
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
                                    placeholder='0.00'
                                    value={prixMembreText}
                                    onChange={handleChangePrixMembre}/>
                            </Col>
                        </Row>


                        <Row>
                            <Col sm="3">
                                <Form.Label className='mb-0 mt-4'>
                                    Actif ?
                                </Form.Label>
                            </Col>
                            <Col sm="5">
                                <Form.Check
                                    className='mt-4' 
                                    type="switch"
                                    id="actif"
                                    checked={prixtubeEdit.actif}
                                    onChange={handleChangeCheck}/>
                            </Col>
                        </Row>


                    </Form.Group>
                </Form>

        </ModalEditTemplate>
    )
}

export default ModalEditPrixtube