import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { createCompetition, refreshAllCompetitions } from '../../Redux/actions/competitions'
import ModalCreateTemplate from '../ModalCreateTemplate'

const ModalCreateCompetition = ({idSaison, hideModal}) => {

    const md = 4

    const initCompetition = {
        name: '',
        nbTubesUsed: 0,
        idStock: 0,
        idSaison,
        idTypeTube: 0,
    }

    //Redux
    const listCompetitions = useSelector(state => state.competitions)
    const {saisonActive} = useSelector(state => state.saisons)
    const {typetubes} = useSelector(state => state.typetubes)
    const {token} = useSelector(state => state.user)

    //States
    const [competitionCreate, setCompetitionCreate] = useState(initCompetition)
    const [typeTubesCompet, setTypeTubesCompet] = useState([])

    useEffect(() => {
        if (typetubes.length > 0) {
            setTypeTubesCompet(typetubes.filter(data => data.name === 'Compétition'))
        }
    }, [typetubes])
    
    useEffect(() => {
        if (typeTubesCompet.length > 0) {
            setCompetitionCreate({...competitionCreate, idTypeTube: typeTubesCompet[0].id})
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [typeTubesCompet])
    
    useEffect(() => {
        if (competitionCreate.idTypeTube !== 0) {
            const dataFilter = saisonActive.Stocks.filter(data => data.idTypeTube === competitionCreate.idTypeTube)
            setCompetitionCreate({...competitionCreate, idStock: dataFilter[0].id})
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [competitionCreate.idTypeTube])


    const handleChange = event => setCompetitionCreate({...competitionCreate, [event.target.id]: event.target.value})
    const handleChangeNumber = event => setCompetitionCreate({...competitionCreate, [event.target.id]: Number(event.target.value)})
    const handleChangeSelect = event => setCompetitionCreate({...competitionCreate, [event.target.id]: Number(event.target.value)})


    const disableBtnConfirm = competitionCreate.name.length < 2 || competitionCreate.nbTubesUsed <= 0


    const showOptionTypeTube = typeTubesCompet.map(typetubeData => {
        return (
            <option key={typetubeData.id} value={typetubeData.id}>
                {typetubeData.name + (typetubeData.comment ? ` (${typetubeData.comment})` : '')}
            </option>
        )
    })


    return (
        <ModalCreateTemplate 
            hideModal={hideModal} 
            styleBody={{width: '700px'}}
            styleAlert={{width: '460px'}}
            stateSelector={listCompetitions}
            actionCreate={() => createCompetition(token, competitionCreate)}
            actionRefreshData={() => refreshAllCompetitions(token, idSaison)}
            disableBtnConfirm={disableBtnConfirm}
            title="Nouvelle compétition">

        {/* children */}
            <Form>
                <Form.Group className='mb-3 mx-3 text-start'>

                    <Row>
                        <Col md={md}>
                            <Form.Label className='mb-0 mt-2'>
                                Nom de la compétition
                            </Form.Label>
                        </Col>
                        <Col md={md}>
                            <Form.Control 
                                id='name'
                                value={competitionCreate.name}
                                onChange={handleChange}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={md}>
                            <Form.Label className='mb-0 mt-3'>
                                Nb de tube(s) utilisés
                            </Form.Label>
                        </Col>
                        <Col md={md}>
                            <Form.Control 
                                id='nbTubesUsed'
                                type='number'
                                className='mt-2'
                                value={competitionCreate.nbTubesUsed}
                                min={0}
                                onChange={handleChangeNumber}/>
                        </Col>
                    </Row>
            
                    <Row>
                        <Col md={md}>
                            <Form.Label className='mb-0 mt-3'>
                                Type du tube
                            </Form.Label>
                        </Col>
                        <Col md={md}>
                            <Form.Select 
                                id='idTypeTube'
                                className='mt-2'
                                defaultValue={competitionCreate.idTypeTube}
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

export default ModalCreateCompetition
