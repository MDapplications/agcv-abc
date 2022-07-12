import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { editTypetube, refreshAllTypetubes } from '../../Redux/actions/typetubes'
import ModalEditTemplate from '../ModalEditTemplate'


const ModalEditTypetube = ({hideModal, typetubeData}) => {

    //Redux
    const {token} = useSelector(state => state.user)
    const listTypetubes = useSelector(state => state.typetubes)
 

    //States
    const [typetubeEdit, setTypetubeEdit] = useState(typetubeData)


    const handleChange = event => setTypetubeEdit({...typetubeEdit, [event.target.id]: event.target.value})
    const handleChangeCheck = event => setTypetubeEdit({...typetubeEdit, [event.target.id]: event.target.checked})


    return (
        <ModalEditTemplate 
            hideModal={hideModal} 
            title="Modification du typetube"
            styleBody={{width: '700px'}}
            styleAlert={{width: '460px'}}
            stateSelector={listTypetubes}
            actionRefreshData={() => refreshAllTypetubes(token)}
            actionEdit={() => editTypetube(token, typetubeEdit)}>

            {/*children*/}
                <Form>
                    <Form.Group className='mb-3 mx-3 text-start'>

                        <Row>
                            <Col sm="3">
                                <Form.Label className='mb-0 mt-2'>
                                    Type de tube
                                </Form.Label>
                            </Col>
                            <Col sm="5">
                                <Form.Select 
                                    id='name'
                                    className='mb-3' 
                                    defaultValue={typetubeEdit.name}
                                    onChange={handleChange}>
                                        <option value="Plastique">Plastique</option>
                                        <option value="Entrainement">Entrainement</option>
                                        <option value="Compétition">Compétition</option>
                                </Form.Select> 
                            </Col>
                        </Row>

                        <Row>
                            <Col sm="3">
                                <Form.Label className='mb-0 mt-2'>
                                    Commentaire
                                </Form.Label>  
                            </Col>
                            <Col sm="5">
                                <Form.Control 
                                    id='comment' 
                                    placeholder='Commentaire' 
                                    value={typetubeEdit.comment}
                                    onChange={handleChange}/>
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col sm="3">
                                <Form.Label className='mb-0 mt-4'>
                                    Commandable ?
                                </Form.Label>
                            </Col>
                            <Col sm="5">
                                <Form.Check
                                    className='mt-4' 
                                    type="switch"
                                    id="orderable"
                                    checked={typetubeEdit.orderable}
                                    onChange={handleChangeCheck}/>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm="3">
                                <Form.Label className='mb-0 mt-4'>
                                    Par défaut ?
                                </Form.Label>
                            </Col>
                            <Col sm="5">
                                <Form.Check
                                    className='mt-4' 
                                    type="switch"
                                    id="default"
                                    checked={typetubeEdit.default}
                                    onChange={handleChangeCheck}/>
                            </Col>
                        </Row>
                                    

                    </Form.Group>
                </Form>

        </ModalEditTemplate>
    )
}

export default ModalEditTypetube