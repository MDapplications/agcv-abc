import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { createTypetube, refreshAllTypetubes } from '../../Redux/actions/typetubes'
import ModalCreateTemplate from '../ModalCreateTemplate'



const ModalCreateTypeTube = ({hideModal}) => {
   

    const initType = 1

    const initTypetube = {
        name: 'Plastique',
        comment: '',
        orderable: false,
        lowLevel: 0,
        default: false
    }    


    //Redux
    const {token} = useSelector(state => state.user)
    const listTypetubes = useSelector(state => state.typetubes)


    //States
    const [type, setType] = useState(initType)
    const [typeTubeCreate, settypeTubeCreate] = useState(initTypetube)

    

    useEffect(() => {
        settypeTubeCreate({...typeTubeCreate, name: getNameByType(type)})
    }, [type])
    


    const getNameByType = type => {
        switch (type) {
            case 1: return 'Plastique'
            case 2: return 'Entrainement'
            case 3: return 'Compétition'
            default: return 'Plastique'
        }
    }


    const handleChange = event => settypeTubeCreate({...typeTubeCreate, [event.target.id]: event.target.value})
    const handleChangeSwitch = event => settypeTubeCreate({...typeTubeCreate, [event.target.id]: event.target.checked})
    const handleChangeSelect = event => setType(Number(event.target.value))

    
    return (

        <ModalCreateTemplate 
            hideModal={hideModal} 
            styleBody={{width: '700px'}}
            styleAlert={{width: '460px'}}
            stateSelector={listTypetubes}
            actionCreate={() => createTypetube(token, typeTubeCreate)}
            actionRefreshData={() => refreshAllTypetubes(token)}
            title="Création type de tube">

            {/* children */}
                <Form>
                    <Form.Group className='mb-3 mx-3 text-start'>
                        
                        <Row>
                            <Col sm="3">
                                <Form.Label className='mb-0 mt-2'>
                                    Type
                                </Form.Label>
                            </Col>
                            <Col sm="5">
                                <Form.Select 
                                    id='type'
                                    className='mb-3' 
                                    defaultValue={typeTubeCreate.type}
                                    onChange={handleChangeSelect}>
                                        <option value="1">Plastique</option>
                                        <option value="2">Entrainement</option>
                                        <option value="3">Compétition</option>
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
                                    value={typeTubeCreate.comment}
                                    onChange={handleChange}/>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm="3">
                                <Form.Label className='mb-1 mt-4'>
                                    Commandable ?
                                </Form.Label>
                            </Col>
                            <Col sm="5">
                                <Form.Check
                                    className='mt-4' 
                                    type="switch"
                                    id="orderable"
                                    checked={typeTubeCreate.orderable}
                                    onChange={handleChangeSwitch}/>
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
                                    checked={typeTubeCreate.default}
                                    onChange={handleChangeSwitch}/>
                            </Col>
                        </Row>
                                    

                    </Form.Group>
                </Form>
        </ModalCreateTemplate>
    )
}

export default ModalCreateTypeTube