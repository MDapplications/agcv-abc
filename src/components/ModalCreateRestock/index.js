import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { createRestock, refreshAllRestocks } from '../../Redux/actions/restocks'
import ModalCreateTemplate from '../ModalCreateTemplate'

const ModalCreateRestock = ({idSaison, hideModal}) => {

    const md = 4
    const listMois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

    const initRestock= {
        value: 0,
        idStock: 0,
        idSaison,
        idTypeTube: 0,
        idConsoMois: 0
    }

    //Redux
    const listRestocks = useSelector(state => state.restocks)
    const {saisonActive} = useSelector(state => state.saisons)
    const {typetubes} = useSelector(state => state.typetubes)
    const {token} = useSelector(state => state.user)

    //States
    const [currentMonth] = useState(listMois[new Date().getMonth()])
    const [restockCreate, setRestockCreate] = useState(initRestock)
    const [typeTubesCompet, setTypeTubesCompet] = useState([])
    const [consovolant, setConsovolant] = useState(null)


    useEffect(() => {
        if (typetubes.length > 0) {
            setTypeTubesCompet(typetubes.filter(data => data.name === 'Compétition'))
        }
    }, [typetubes])
    
    useEffect(() => {
        if (typeTubesCompet.length > 0) {
            setRestockCreate({...restockCreate, idTypeTube: typeTubesCompet[0].id})
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [typeTubesCompet])

    useEffect(() => {
        if (restockCreate.idTypeTube !== 0) {
            if (consovolant === null) {
                const dataFilter = saisonActive.ConsoVolants.filter(data => data.idTypeTube === restockCreate.idTypeTube)
                if (dataFilter.length > 0) {
                    setConsovolant(dataFilter[0])
                } else {
                    setConsovolant(null)
                }
                const dataFilter1 = saisonActive.Stocks.filter(data => data.idTypeTube === restockCreate.idTypeTube)
                setRestockCreate({...restockCreate, idStock: dataFilter1[0].id})
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [restockCreate.idTypeTube, saisonActive.ConsoVolants])
    
    useEffect(() => {
        if (consovolant !== null) {
            const dataFilter = consovolant.ConsoMois.filter(data => data.name === currentMonth)
            if (dataFilter.length > 0) {
                setRestockCreate({...restockCreate, idConsoMois: dataFilter[0].id})
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [consovolant, currentMonth])


    const handleChangeNumber = event => setRestockCreate({...restockCreate, [event.target.id]: Number(event.target.value)})
    const handleChangeSelect = event => setRestockCreate({...restockCreate, [event.target.id]: Number(event.target.value)})



    const showOptionTypeTube = typeTubesCompet.map(typetubeData => {
        return (
            <option key={typetubeData.id} value={typetubeData.id}>
                {typetubeData.name + (typetubeData.comment ? ` (${typetubeData.comment})` : '')}
            </option>
        )
    })

    const showOptionConsoMois = consovolant !== null && 
    consovolant.ConsoMois.map(moisData => <option key={moisData.id} value={moisData.id}>{moisData.name}</option>)


    return (
        <ModalCreateTemplate 
            hideModal={hideModal} 
            styleBody={{width: '700px'}}
            styleAlert={{width: '460px'}}
            stateSelector={listRestocks}
            actionCreate={() => createRestock(token, restockCreate)}
            actionRefreshData={() => refreshAllRestocks(token, idSaison)}
            disableBtnConfirm={restockCreate.value === 0}
            title="Ajustement du stock">

        {/* children */}
            <Form>
                <Form.Group className='mb-3 mx-3 text-start'>

                    <Row className='mt-2'>
                        <Col md={md}>
                            <Form.Label className='mb-0 mt-2'>
                                Mois
                            </Form.Label>
                        </Col>
                        <Col md={md}>
                            <Form.Select 
                                id='idConsoMois'
                                value={restockCreate.idConsoMois}
                                onChange={handleChangeSelect}>
                                    {showOptionConsoMois}
                            </Form.Select> 
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
                                defaultValue={restockCreate.idTypeTube}
                                onChange={handleChangeSelect}>
                                    {showOptionTypeTube}
                            </Form.Select> 
                        </Col>
                    </Row>

                    <Row>
                        <Col md={md}>
                            <Form.Label className='mb-0 mt-3'>
                                Nb de tubes (+/-)
                            </Form.Label>
                        </Col>
                        <Col md={md}>
                            <Form.Control 
                                id='value'
                                type='number'
                                className='mt-2'
                                value={restockCreate.value}
                                onChange={handleChangeNumber}/>
                        </Col>
                    </Row>

                </Form.Group>
            </Form>
        </ModalCreateTemplate>
    )
}

export default ModalCreateRestock
