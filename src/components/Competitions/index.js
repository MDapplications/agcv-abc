import React, { useEffect, useState } from 'react'
import { Alert, Button, Container } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Icon, Popup, Table } from 'semantic-ui-react'
import { deleteCompetition, refreshAllCompetitions } from '../../Redux/actions/competitions'
import { refreshAllRestocks } from '../../Redux/actions/restocks'
import { initSaisons } from '../../Redux/actions/saisons'
import { getAllTypetubes } from '../../Redux/actions/typetubes'
import Loader from '../Loader'
import Modal2Confirmation from '../Modal2Confirmation'
import ModalCreateCompetition from '../ModalCreateCompetition'
import ModalCreateRestock from '../ModalCreateRestock'
import ModalEditCompetition from '../ModalEditCompetition'
import NavBarBack from '../NavBarBack'

const Competitions = () => {

    const { idSaison } = useParams()

    //Styles
    const stylePopupEdit = {
        borderColor: '#3c69e7',
        backgroundColor: '#ebf0fc',
        color: '#3c69e7'
    }

    const stylePopupDelete = {
        borderColor: '#e42558',
        backgroundColor: '#fcebf0',
        color: '#e42558'
    }

    const styleStockCompet = {
        width: '200px', 
        backgroundColor: '#6435c9', 
        color: 'white',
        borderRadius: '0.3rem 0 0 0.3rem'
    }

    const initSaison = {id: Number(idSaison)}

    //Hooks
    const navigate = useNavigate()
    const dispatch = useDispatch()

    //Redux
    const {token, role} = useSelector(state => state.user)
    const {saisonActive, saisons} = useSelector(state => state.saisons)
    const {competitions, isGetSuccess, isLoading, isDeleteSuccess, errorDelete, error} = useSelector(state => state.competitions)
    const {restocks} = useSelector(state => state.restocks)

    //States
    const [loadCompetitions, setloadCompetitions] = useState(false)
    const [nbTubesCompetitions, setNbTubesCompetitions] = useState(0)
    const [nbTubesRestocks, setNbTubesRestocks] = useState(0)
    const [nbTubesStocksValue, setNbTubesStocksValue] = useState(0)
    const [saisonSelect, setSaisonSelect] = useState(initSaison)
    const [showError, setShowError] = useState(false)
    const [enableActions, setEnableActions] = useState(false)
    const [openModalCreateCompet, setOpenModalCreateCompet] = useState(false)
    const [openModalCreateRestock, setOpenModalCreateRestock] = useState(false)
    const [openModalDeleteCompet, setOpenModalDeleteCompet] = useState(false)
    const [openModalEditCompet, setOpenModalEditCompet] = useState(false)
    const [requestDelete, setRequestDelete] = useState(false)
    const [competitionDelete, setCompetitionDelete] = useState({})
    const [competitionEdit, setCompetitionEdit] = useState({})


    useEffect(() => {
        if (token !== '') {
            dispatch(refreshAllCompetitions(token, idSaison))
            dispatch(refreshAllRestocks(token, idSaison))
            dispatch(getAllTypetubes(token))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, idSaison])

    useEffect(() => {if (isGetSuccess && !isLoading) setloadCompetitions(true)}, [isGetSuccess, isLoading])
    useEffect(() => {if (!isLoading && error !== '') setShowError(true)}, [error, isLoading])
    useEffect(() => {if (saisonActive.id === Number(idSaison)) {
            setEnableActions(true)
            setSaisonSelect(saisonActive)
        } else {
            if (saisons.length > 0) {
                const dataFilter = saisons.filter(data => data.id === Number(idSaison))
                if (dataFilter.length > 0) {
                    setSaisonSelect(dataFilter[0])
                }
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [saisonActive.id, idSaison])

    useEffect(() => {
        if (enableActions) {
            if (saisonSelect.Stocks.length > 0) {
                setNbTubesStocksValue(saisonSelect.Stocks.reduce((prevValue, stock) => {
                    return prevValue + stock.value
                }, 0))
            }
            if (competitions.length > 0) {
                setNbTubesCompetitions(competitions.reduce((prevValue, competition) => {
                    return prevValue + competition.nbTubesUsed
                }, 0))
            }
            if (restocks.length > 0) {
                setNbTubesRestocks(restocks.reduce((prevValue, restock) => {
                    return prevValue + restock.value
                }, 0))
            }
        }
    }, [enableActions, saisonSelect.Stocks, competitions, restocks])

    useEffect(() => {
        if (requestDelete && errorDelete !== '') {
            setRequestDelete(false)
            setShowError(true)
        }
    }, [requestDelete, errorDelete])

    useEffect(() => {
        if (isDeleteSuccess && requestDelete) {
            setRequestDelete(false)
            dispatch(refreshAllCompetitions(token, idSaison))

            toast.success("Suppression de la compétition réalisé avec succès !",
            {
                style: {
                    border: '1px solid #00B35B',
                    padding: '16px',
                    color: '#00B35B',
                },
                duration: 5000,
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDeleteSuccess, requestDelete, token, idSaison])
    


    const handleBack = () => {
        if (saisonSelect.id === initSaison.id) {
            dispatch(initSaisons())
        }
        navigate(-1)
    }

    const hideModal = () => {
        setOpenModalCreateCompet(false)
        setOpenModalDeleteCompet(false)
        setOpenModalEditCompet(false)
        setOpenModalCreateRestock(false)
    }

    const showModalCreateCompet = () => setOpenModalCreateCompet(true)
    const displayModalCreateCompet = openModalCreateCompet && <ModalCreateCompetition idSaison={Number(idSaison)} hideModal={hideModal}/>

    const showModalCreateRestock = () => setOpenModalCreateRestock(true)
    const displayModalCreateRestock = openModalCreateRestock && <ModalCreateRestock idSaison={Number(idSaison)} hideModal={hideModal}/>


    const handleDelete = id => {
        setRequestDelete(true)
        dispatch(deleteCompetition(token, id))
        setOpenModalDeleteCompet(false)
    }

    const showModalDeleteCompet = competitionData => {
        setCompetitionDelete({
            id: competitionData.id,
            name: competitionData.name,
        })
        setOpenModalDeleteCompet(true)
    }

    //activation du modal de double confirmation
    const displayModalDelete = openModalDeleteCompet && 
    <Modal2Confirmation 
        hideModal={hideModal} 
        handleConfirm={() => handleDelete(competitionDelete.id)}
        textValue={
            <p className='text-center'>
                Êtes-vous sûr de vouloir supprimer la commande de <b>{competitionDelete.name}</b> ?
            </p> 
        }/>


    const displayBtnDelete = competitionData => role > 2 
        ? <Popup
            trigger={
                <Button 
                    variant="danger"
                    disabled={!enableActions}
                    onClick={() => showModalDeleteCompet(competitionData)}>
                        <Icon name='trash'/>
                </Button>
                
            }
            style={stylePopupDelete}
            content={`Supprimer`}/>
        : null



    const showModalEdit = competitionData => {
        setCompetitionEdit({
            id: competitionData.id,
            nbTubesUsed: competitionData.nbTubesUsed,
            name: competitionData.name
        })
        setOpenModalEditCompet(true)
    }

    const displayModalEdit = openModalEditCompet && 
        <ModalEditCompetition
            hideModal={hideModal}
            competitionData={competitionEdit}
            idSaison={idSaison}/>



    //Bontons action
    const displayAction = competitionData => {
        return (
            <>
                <Popup
                    trigger={
                        <Button 
                            className='me-2' 
                            variant="primary"
                            disabled={!enableActions}
                            onClick={() => showModalEdit(competitionData)}>
                                <Icon name='edit'/>
                        </Button>
                    }
                    style={stylePopupEdit}
                    content={`Modifier`}
                />
                {displayBtnDelete(competitionData)}      
            </>
        )
    }


    const displayData = competitions.map(data => {
        return (
            <Table.Row id='row-competitions' key={data.id} active>
                <Table.Cell className='align-middle' textAlign='center'>
                    {new Date(data.horodatage).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell className='align-middle' textAlign='center'>
                    {data.name}
                </Table.Cell>
                <Table.Cell className='align-middle' textAlign='center'>
                    {data.nbTubesUsed}
                </Table.Cell>
                <Table.Cell className='align-middle' textAlign='center'>
                    {data.TypeTube.comment === '' 
                    ? data.TypeTube.name 
                    : data.TypeTube.name + ' - ' + data.TypeTube.comment}
                </Table.Cell>
                <Table.Cell className='align-middle' textAlign='center'>
                    {displayAction(data)}
                </Table.Cell>
            </Table.Row>
        )
    })

    const displayTableCompetitions = (
        <Table className='mt-4' color='blue' inverted>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell collapsing textAlign='center' style={{width: '120px'}}>Date</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>Nom de la compétition</Table.HeaderCell>
                    <Table.HeaderCell collapsing textAlign='center' style={{width: '80px'}}>Nb de tube utilisés</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>Type du tube</Table.HeaderCell>
                    <Table.HeaderCell collapsing textAlign='center' style={{width: '120px'}}>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
    
            <Table.Body style={{borderStyle: 'none'}}>{displayData}</Table.Body>
        </Table>
    )


    const displaylistCompetitions = () => {if (!showError && !loadCompetitions) {
        return <Loader/>
    } else if (loadCompetitions && !showError) {
        if (competitions.length === 0) {
            return <p className='mt-4'>Aucune competition pour cette saison.</p>
        } else {
            return displayTableCompetitions
        }
    } else return <Alert variant='danger'>{error + errorDelete}</Alert>}


    const displaySaisonActive = enableActions && <> 
        <hr/>
        <div className='d-flex justify-content-start'>
            <Button className='me-2' onClick={showModalCreateCompet}><Icon name='plus'/> Competition</Button>
            <Button className='me-2' onClick={showModalCreateRestock}><Icon name='configure'/> Ajustement du stock</Button>
        </div>
        <hr/>

        <Table definition collapsing>
            <Table.Body>
                <Table.Row>
                    <Table.Cell style={styleStockCompet}>Stock pour les compétitions</Table.Cell>
                    <Table.Cell style={{width: '50px'}}>
                        {nbTubesStocksValue - nbTubesCompetitions + nbTubesRestocks}
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    </>

    //render
    return (
        <>
            <div>
                <NavBarBack handleBack={handleBack}/>
                
                <Container className='mt-3 mb-5'>
                    <main role='main'>
                        <div className='mx-0 my-2 p-2 bg-light border rounded-3'>
                            <Container className='text-center justify-content-center'>
                                <div className='display-6'>
                                    Competitions de la saison : {saisonSelect.anneeDebut + ' - ' + saisonSelect.anneeFin}
                                </div>
                                {displaySaisonActive}
                            </Container>
                        </div>
                    </main>

                    {displaylistCompetitions()}

                </Container>
            </div>

            {displayModalCreateCompet}
            {displayModalCreateRestock}
            {displayModalEdit}
            {displayModalDelete}
        </>
        
    )
}

export default Competitions