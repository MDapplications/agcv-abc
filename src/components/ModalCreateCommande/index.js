import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { createCommande, refreshAllCommandes } from '../../Redux/actions/commandes'
import ModalCreateTemplate from '../ModalCreateTemplate'

const ModalCreateCommande = ({idSaison, hideModal}) => {
        
    const listMois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

    const initCommande = {
        nbTubesOrdered: 0,
        status: false,
        idSaison: Number(idSaison),
        idConsoMois: 0,
        idTypeTube: 0,
        idPrixTube: 0,
        idMembre: 0,
    }  

    const initPritube = {
        id: 0,
        marque: '',
        prix: 0.0,
        prixMembre: 0.0
    }

    //Redux
    const listCommandes = useSelector(state => state.commandes)
    const {typetubes} = useSelector(state => state.typetubes)
    const {consovolants} = useSelector(state => state.consovolants)
    const {prixtubes}= useSelector(state => state.prixtubes)
    const {token} = useSelector(state => state.user)
    const {isGetSuccess, membres} = useSelector(state => state.membres)

    //States
    const [currentMonth] = useState(listMois[new Date().getMonth()])
    const [commandeCreate, setCommandeCreate] = useState(initCommande)
    const [consovolant, setConsovolant] = useState(null)
    const [consomois, setConsomois] = useState(null)
    const [prixtube, setPrixtube] = useState(initPritube)
    
    useEffect(() => {
        if (commandeCreate.idTypeTube === 0) {
            const typetubesOrderable = typetubes.filter(data => data.orderable === true)
            if (typetubesOrderable.length > 0) {
                const {id} = typetubesOrderable[0]
                setCommandeCreate({...commandeCreate, idTypeTube: id})
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [commandeCreate.idTypeTube, typetubes])

    useEffect(() => {
        if (commandeCreate.idTypeTube !== 0) {
            if (consovolant === null) {
                const dataFilter = consovolants.filter(data => data.idTypeTube === commandeCreate.idTypeTube)
                if (dataFilter.length > 0) {
                    setConsovolant(dataFilter[0])
                } else {
                    setConsovolant(null)
                }
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [commandeCreate.idTypeTube, consovolants])
    
    useEffect(() => {
        if (consovolant !== null) {
            const dataFilter = consovolant.ConsoMois.filter(data => data.name === currentMonth)
            if (dataFilter.length > 0) {
                setConsomois(dataFilter[0])
                setCommandeCreate({...commandeCreate, idConsoMois: dataFilter[0].id})
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [consovolant, currentMonth])
 
    useEffect(() => {
        if (consomois !== null) {
            const dataFilter = prixtubes.filter(data => data.id === consomois.idPrixTube)
            if (dataFilter.length > 0) {
                setCommandeCreate({...commandeCreate, idPrixTube: dataFilter[0].id})
                setPrixtube({
                    id: dataFilter[0].id,
                    marque: dataFilter[0].marque,
                    prix: dataFilter[0].prix,
                    prixMembre: dataFilter[0].prixMembre
                })
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [consomois])


    useEffect(() => {
        if (prixtube.id !== 0) {
            if (isGetSuccess && membres.length !== 0) {
                if (commandeCreate.idMembre === 0) {
                    const dataFilter = membres.filter(data => data.actif === true)
                    if (dataFilter.length > 0) {
                        const {id} = dataFilter[0]
                        setCommandeCreate({...commandeCreate, idMembre: id})
                    }
                }    
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGetSuccess, membres, commandeCreate.idMembre, prixtube])
    

    //Affichage au format prix
    const currencyLocalPrice = prix => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prix)

    const handleChange = event => setCommandeCreate({...commandeCreate, [event.target.id]: Number(event.target.value)})
    const handleChangeSelect = event => setCommandeCreate({...commandeCreate, [event.target.id]: Number(event.target.value)})
    const handleChangeSelectMois = event => {
        const dataFilter = consovolant.ConsoMois.filter(data => data.id === Number(event.target.value))
        if (dataFilter.length > 0) setConsomois(dataFilter[0])
        setCommandeCreate({...commandeCreate, [event.target.id]: Number(event.target.value)})
    }


    const showOptionMembres = membres.map(dataMembre => {
        if (dataMembre.actif) {
            return (
                <option key={dataMembre.id} value={dataMembre.id}>
                    {dataMembre.prenom + ' ' + dataMembre.nom}
                </option>
            )
        }
        return null
    })


    const showOptionTypeTube = typetubes.map(typetubeData => {
        if (typetubeData.orderable) {
            return (
                <option key={typetubeData.id} value={typetubeData.id}>
                    {typetubeData.name + (typetubeData.comment ? ` (${typetubeData.comment})` : '')}
                </option>
            )
        }
        return null
    })
    
    const showOptionConsoMois = consovolant !== null && 
    consovolant.ConsoMois.map(moisData => <option key={moisData.id} value={moisData.id}>{moisData.name}</option>)

    const md = 4


    return (
        <ModalCreateTemplate 
            hideModal={hideModal} 
            styleBody={{width: '700px'}}
            styleAlert={{width: '460px'}}
            stateSelector={listCommandes}
            actionCreate={() => createCommande(token, commandeCreate)}
            actionRefreshData={() => refreshAllCommandes(token, idSaison)}
            title="Nouvelle commande">

        {/* children */}
            <Form>
                <Form.Group className='mb-3 mx-3 text-start'>
                   
                    <Row>
                        <Col md={md}>
                            <Form.Label className='mb-0 mt-2'>
                                Type du tube
                            </Form.Label>
                        </Col>
                        <Col md={md}>
                            <Form.Select 
                                id='idTypeTube'
                                defaultValue={commandeCreate.idTypeTube}
                                onChange={handleChangeSelect}>
                                    {showOptionTypeTube}
                            </Form.Select> 
                        </Col>
                    </Row>

                    <Row className='mt-2'>
                        <Col md={md}>
                            <Form.Label className='mb-0 mt-2'>
                                Mois
                            </Form.Label>
                        </Col>
                        <Col md={md}>
                            <Form.Select 
                                id='idConsoMois'
                                value={commandeCreate.idConsoMois}
                                onChange={handleChangeSelectMois}>
                                    {showOptionConsoMois}
                            </Form.Select> 
                        </Col>
                    </Row>

                    <Row>
                        <Col md={md}>
                            <Form.Label className='mb-0 mt-3'>
                                Prix du tube (marque)
                            </Form.Label>
                        </Col>
                        <Col md={md}>
                            <Form.Label className='mb-0 mt-3'>
                                {prixtube.marque}
                            </Form.Label> 
                        </Col>
                    </Row>
                    <Row>
                        <Col md={md}>
                            <Form.Label className='mb-0 mt-2'>
                                Prix club
                            </Form.Label>
                        </Col>
                        <Col md={md}>
                            <Form.Label className='mb-0 mt-2'>
                                {currencyLocalPrice(prixtube.prix)}
                            </Form.Label> 
                        </Col>
                    </Row>
                    <Row>
                        <Col md={md}>
                            <Form.Label className='mb-0 mt-2'>
                                Prix membre
                            </Form.Label>
                        </Col>
                        <Col md={md}>
                            <Form.Label className='mb-3 mt-2'>
                                {currencyLocalPrice(prixtube.prixMembre)}
                            </Form.Label> 
                        </Col>
                    </Row>

                    <Row>
                        <Col md={md}>
                            <Form.Label className='mb-0 mt-2'>
                                Membre
                            </Form.Label>
                        </Col>
                        <Col md={md}>
                            <Form.Select 
                                id='idMembre'
                                value={commandeCreate.idMembre}
                                onChange={handleChangeSelect}>
                                    {showOptionMembres}
                            </Form.Select> 
                        </Col>
                    </Row>

                    <Row>
                        <Col md={md}>
                            <Form.Label className='mb-0 mt-3'>
                                Nb de tube(s) commandés
                            </Form.Label>
                        </Col>
                        <Col md={md}>
                            <Form.Control 
                                id='nbTubesOrdered'
                                className='mt-2'
                                value={commandeCreate.nbTubesOrdered}
                                onChange={handleChange}/>
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
        </ModalCreateTemplate>
    )
}

export default ModalCreateCommande
