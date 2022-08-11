import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { editConsoVolant } from '../../Redux/actions/consovolants'
import { getPage } from '../../Redux/actions/pages'
import { getSaisonActive } from '../../Redux/actions/saisons'
import { editTypetube, getAllTypetubes } from '../../Redux/actions/typetubes'
import Loader from '../Loader'

const ParamSaison = () => {

    //Redux
    const {saisonActive} = useSelector(state => state.saisons)
    const listTypetubes = useSelector(state => state.typetubes)
    const {typetubes} = useSelector(state => state.typetubes)
    const {token} = useSelector(state => state.user)
    const {isEditSuccess, errorEdit} = useSelector(state => state.consovolants)

    //Hooks
    const dispatch = useDispatch()


    //States
    const [stock, setStock] = useState({})
    const [lowLevel, setLowLevel] = useState({})
    const [editStock, setEditStock] = useState(false)
    const [editLowLevel, setEditLowLevel] = useState(false)


    useEffect(() => {
        dispatch(getPage('admin'))
    }, [dispatch])

    useEffect(() => {
        if (editStock && isEditSuccess) {
            toast.success('Les stocks volants ont été modifié avec succès !',
            {
                style: {
                    border: '1px solid #00B35B',
                    padding: '16px',
                    color: '#00B35B',
                },
                duration: 5000,
            })
            setEditStock(false)
            dispatch(getSaisonActive(token))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editStock,isEditSuccess])

    useEffect(() => {
        if (editStock && errorEdit !== '') {
            toast.error(errorEdit,
            {
                style: {
                    border: '1px solid #d61b24',
                    padding: '16px',
                    color: '#d61b24',
                },
                duration: 5000,
            })
            setEditStock(false)
        }
    }, [editStock, errorEdit])
    

    useEffect(() => {
        if (editLowLevel && listTypetubes.isEditSuccess) {
            toast.success('Les seuils bas ont été modifié avec succès !',
            {
                style: {
                    border: '1px solid #00B35B',
                    padding: '16px',
                    color: '#00B35B',
                },
                duration: 5000,
            })
            setEditLowLevel(false)
            dispatch(getAllTypetubes(token))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editLowLevel, listTypetubes.isEditSuccess])

    useEffect(() => {
        if (editLowLevel && listTypetubes.errorEdit !== '') {
            toast.error(listTypetubes.errorEdit,
            {
                style: {
                    border: '1px solid #d61b24',
                    padding: '16px',
                    color: '#d61b24',
                },
                duration: 5000,
            })
            setEditLowLevel(false)
        }
    }, [editLowLevel, listTypetubes.errorEdit])

  
    const getNameTypeTube = id => {
        const typetube = typetubes.filter(data => data.id === id)
        if (typetube.length > 0) {
            return typetube[0].name
        } else {
            return 'non défini'
        }
    }


    const handleChangeStock = event => {
        setStock({...stock, [event.target.id]: Number(event.target.value)})
    }

    const handleChangeLowLevel = event => {
        setLowLevel({...lowLevel, [event.target.id]: Number(event.target.value)})
    }
    

    const submitStocks = () => {
        if (Object.keys(stock).length > 0) {  
            setEditStock(true) 

            for (const [key, value] of Object.entries(stock)) {
                const id = Number(key.replace('stock-', ''))
                const data = {
                    id: id,
                    stock: value
                }
                dispatch(editConsoVolant(token, data))
            }
            setStock({})
        }
    }


    const submitLowLevel = () => {
        if (Object.keys(lowLevel).length > 0) {  
            setEditLowLevel(true) 
            for (const [key, value] of Object.entries(lowLevel)) {
                const id = Number(key.replace('tube-', ''))
                const data = { 
                    id: id,  
                    lowLevel: value,
                }
                dispatch(editTypetube(token, data))
            }
            setLowLevel({})
        }
    }



    const displayStockConsoVolants = Object.keys(saisonActive).some(key => key === 'ConsoVolants') ?
        saisonActive.ConsoVolants.length !== (0 || undefined)
        ? saisonActive.ConsoVolants.map(dataVolant => {
            return (
                <Form.Group className="mb-3" key={dataVolant.id}>
                    <Row className='d-flex justify-content-start' xs={1} md={2} lg={5}>
                        <Col className='d-flex align-items-center'>
                            <span>
                                {getNameTypeTube(dataVolant.idTypeTube)}
                            </span>
                        </Col>
                        <Col>
                            <Form.Control 
                                id={`stock-${dataVolant.id}`}
                                type='number'
                                className='align-middle'
                                defaultValue={dataVolant.stock}
                                onChange={handleChangeStock}/>
                        </Col>
                    </Row>               
                </Form.Group>
            )
        }) 
        : <p>Aucune consommation de volant.</p>
    : <Loader />


    const displayLowLevelTypeTubes = Object.keys(typetubes).length > 0 
    ? typetubes.map(dataTypetube => {
        return (
            <Form.Group className="mb-3" key={dataTypetube.id}>
                <Row className='d-flex justify-content-start' xs={1} md={2} lg={5}>
                        <Col className='d-flex align-items-center'>
                            <span>
                                {`Seuil bas d'alerte - ${dataTypetube.name}`}
                            </span>
                        </Col>
                        <Col>
                            <Form.Control 
                                id={`tube-${dataTypetube.id}`}
                                type='number'
                                className='align-middle'
                                defaultValue={dataTypetube.lowLevel}
                                onChange={handleChangeLowLevel}/>
                        </Col>
                    </Row>
            </Form.Group>
        )
    })
    : <p>Aucun typetubes chargés.</p>




    return (
        <>
            <Container className='mb-5'>
                <main role='main'>
                    <div className='mx-0 my-2 p-2 bg-light border rounded-3'>
                        <Container className='text-center justify-content-center'>
                            <div className='display-6'>Paramètres de la saison : {saisonActive.anneeDebut + ' - ' + saisonActive.anneeFin}</div>
                        </Container>
                    </div>
                </main>

                <Card className='mt-5'>
                    <Card.Header>
                        <Card.Title className="my-2 text-start">Paramétrages des stocks initiaux :</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            {displayStockConsoVolants}

                            <Row xs={1} md={1} lg={3}>
                                <Col>
                                    <Button
                                        variant='primary' 
                                        onClick={submitStocks}>
                                            Modifier
                                    </Button>
                                </Col>
                            </Row>
                            
                        </Form>
                    </Card.Body>
                </Card>

                <Card className='mt-3'>
                    <Card.Header>
                        <Card.Title className="my-2 text-start">Paramétrages des alertes seuils bas :</Card.Title>
                    </Card.Header>
                    <Card.Body> 
                        <Form>
                            {displayLowLevelTypeTubes}

                            <Row xs={1} md={1} lg={3}>
                                <Col>
                                    <Button
                                        variant='primary' 
                                        onClick={submitLowLevel}>
                                            Modifier
                                    </Button>
                                </Col>
                            </Row>
                            
                        </Form>
                    </Card.Body>
                </Card>
                
            </Container>
        </>
    )
}

export default ParamSaison