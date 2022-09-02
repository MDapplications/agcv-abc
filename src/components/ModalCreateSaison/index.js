import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { createSaison, refreshAllSaisons } from '../../Redux/actions/saisons'
import ModalCreateTemplate from '../ModalCreateTemplate'

const ModalCreateSaison = ({hideModal}) => {

    const dateNow = new Date(Date.now()).getFullYear()

    const initSaison = {
        anneeDebut: dateNow,
        anneeFin: 0,
        budget: 0.0,
        active: true,
    }


    //Redux
    const {token} = useSelector(state => state.user)
    const listSaisons = useSelector(state => state.saisons)
    const listTypetubes = useSelector(state => state.typetubes)


    //States
    const [budgetText, setBudgetText] = useState('3000')
    const [saisonCreate, setSaisonCreate] = useState(initSaison)


    useEffect(() => {
        if (saisonCreate.budget === initSaison.budget) {
            setSaisonCreate({...saisonCreate, budget: Number(budgetText)})
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [budgetText, saisonCreate])

    useEffect(() => {
        if (saisonCreate.anneeFin === initSaison.anneeFin || saisonCreate.anneeFin !== saisonCreate.anneeDebut + 1) {
            setSaisonCreate({...saisonCreate, anneeFin: saisonCreate.anneeDebut + 1})
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [saisonCreate.anneeDebut])
  



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
            actionCreate={() => createSaison(token, saisonCreate, listTypetubes.typetubes)}
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
                                    //placeholder='2022'
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
                                    disabled
                                    value={saisonCreate.anneeFin}/>
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