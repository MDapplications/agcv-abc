import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { createSaison, refreshAllSaisons } from '../../Redux/actions/saisons'
import ModalCreateTemplate from '../ModalCreateTemplate'

const ModalCreateSaison = ({hideModal}) => {

    const dateNow = new Date(Date.now()).getFullYear()

    const initSaison = {
        anneeDebut: dateNow,
        anneeFin: dateNow + 1,
        budget: 0.0,
        active: true,
    }


    //Redux
    const {token} = useSelector(state => state.user)
    const listSaisons = useSelector(state => state.saisons)


    //States
    const [budgetText, setBudgetText] = useState('3000')
    const [saisonCreate, setSaisonCreate] = useState(initSaison)


    useEffect(() => {
        setSaisonCreate({...saisonCreate, budget: Number(budgetText)})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    const handleChangeBudget = event => {
        setBudgetText(event.target.value)
        setSaisonCreate({...saisonCreate, budget: Number(event.target.value)})
    }

    const handleChange = event => setSaisonCreate({...saisonCreate, [event.target.id]: Number(event.target.value)})

    return (
        <ModalCreateTemplate 
            hideModal={hideModal} 
            styleBody={{width: '700px'}}
            styleAlert={{width: '460px'}}
            stateSelector={listSaisons}
            actionCreate={() => createSaison(token, saisonCreate)}
            actionRefreshData={() => refreshAllSaisons(token)}
            title="Création d'une saison">

            {/* children */}
                <Form>
                    <Form.Group className='mb-3 mx-3 text-start'>
                        
                        <Row>
                            <Col sm="3">
                                <Form.Label className='mb-0 mt-2'>
                                    Année de début
                                </Form.Label>  
                            </Col>
                            <Col sm="5">
                                <Form.Control 
                                    id='anneeDebut' 
                                    type='number'
                                    className='mb-3'
                                    placeholder='2022'
                                    value={saisonCreate.anneeDebut}
                                    onChange={handleChange}/>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm="3">
                                <Form.Label className='mb-0 mt-2'>
                                    Année de fin
                                </Form.Label>  
                            </Col>
                            <Col sm="5">
                                <Form.Control 
                                    id='anneeFin' 
                                    type='number'
                                    className='mb-3'
                                    placeholder='2023'
                                    value={saisonCreate.anneeFin}
                                    onChange={handleChange}/>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm="3">
                                <Form.Label className='mb-0 mt-2'>
                                    Budget (en €)
                                </Form.Label>  
                            </Col>
                            <Col sm="5">
                                <Form.Control 
                                    id='budget' 
                                    type='number'
                                    value={budgetText}
                                    onChange={handleChangeBudget}/>
                            </Col>
                        </Row>
                                    

                    </Form.Group>
                </Form>
        </ModalCreateTemplate>
    )
}

export default ModalCreateSaison