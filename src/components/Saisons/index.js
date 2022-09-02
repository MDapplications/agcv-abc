import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Icon, Popup, Table } from 'semantic-ui-react'
import { getPage } from '../../Redux/actions/pages'
import { deleteSaison, getAllSaisons, getSaisonActive, initSaisonActive, initSaisons } from '../../Redux/actions/saisons'
import AlertDanger from '../AlertDanger'
import Loader from '../Loader'
import Modal2Confirmation from '../Modal2Confirmation'
import ModalCreateSaison from '../ModalCreateSaison'
import ModalEditSaison from '../ModalEditSaison'
import ModalTransferSaison from '../ModalTransferSaison'



const Saisons = () => {

    //Hooks
    const dispatch = useDispatch()
    const navigate = useNavigate()


    //Redux
    const {token, role} = useSelector(state => state.user)
    const page = useSelector(state => state.page)
    const listTypetubes = useSelector(state => state.typetubes)
    const { saisons,
            saisonActive,
            error, 
            errorDelete, 
            isGetSuccess,
            isDeleteSuccess, 
            errorEdit, 
            isEditSuccess, 
            isLoading} = useSelector(state => state.saisons)
    


    //States
    const [idSaisonActive, setIdSaisonActive] = useState(0)
    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [openModalTransfer, setOpenModalTransfer] = useState(false)
    const [requestDelete, setRequestDelete] = useState(false)
    const [requestEdit, setRequestEdit] = useState(false)
    const [saisonDelete, setSaisonDelete] = useState({})
    const [saisonEdit, setSaisonEdit] = useState({})
    const [errorMsg, setErrorMsg] = useState('')


    //Styles
    const stylePopupView = {
        borderColor: '#198754',
        backgroundColor: '#f2fef8',
        color: '#198754'
    }

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


    useEffect(() => {
        if (page !== 'saisons') dispatch(getPage('saisons'))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    useEffect(() => {
        if (!isLoading && !isGetSuccess && saisons.length === 0) {
            dispatch(getAllSaisons(token))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, saisons])

    useEffect(() => {if (error !== '') setErrorMsg(error)}, [error])
    useEffect(() => {if (saisonActive !== undefined && idSaisonActive === 0) setIdSaisonActive(saisonActive.id)}, [saisonActive, idSaisonActive])
    
    useEffect(() => {
        if (requestDelete && !isDeleteSuccess && errorDelete !== '') {
            setRequestDelete(false)
            setErrorMsg(errorDelete)
        }
    }, [requestDelete, errorDelete, isDeleteSuccess])


    useEffect(() => {
        if (requestDelete && isDeleteSuccess) {
            setRequestDelete(false)
            setIdSaisonActive(0)
            dispatch(initSaisons())
            dispatch(initSaisonActive())
            dispatch(getSaisonActive(token))

            toast.success("Suppression de la saison réalisé avec succès !",
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
    }, [requestDelete, isDeleteSuccess, token])

    useEffect(() => {
        if (requestEdit && !isEditSuccess && errorEdit !== '') {
            setRequestEdit(false)
            setErrorMsg(errorEdit)
        }
    }, [requestEdit, errorEdit, isEditSuccess])

    useEffect(() => {
        if (requestEdit && isEditSuccess) {
            setRequestEdit(false)
            setIdSaisonActive(0)
            dispatch(initSaisons())
            dispatch(initSaisonActive())
            dispatch(getSaisonActive(token))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requestEdit, isEditSuccess, token])

    //Affichage au format prix
    const currencyLocalPrice = prix => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prix)

    const displayBtnDelete = saisonData => {
        return <Popup
            trigger={
                <Button 
                    variant="danger"
                    disabled={role < 3}
                    onClick={() => showModalDelete(saisonData)}>
                        <Icon name='trash'/>
                </Button>
            }
            style={stylePopupDelete}
            content={`Supprimer`}/>
    }
    
    
    
    //Bontons action
    const displayAction = saisonData => {
        return (
            <>
                <Popup
                    trigger={
                        <Button 
                            className='me-2' 
                            variant="success"
                            disabled={role < 2 || saisonData.id === idSaisonActive} 
                            onClick={() => handleView(saisonData.id)}>
                                <Icon name='eye'/>
                        </Button>
                    }
                    style={stylePopupView}
                    content={`Voir la saison`}
                />
                <Popup
                    trigger={
                        <Button 
                            className='me-2' 
                            variant="primary"
                            disabled={role < 3}
                            onClick={() => showModalEdit(saisonData)}>
                                <Icon name='edit'/>
                        </Button>
                    }
                    style={stylePopupEdit}
                    content={`Modifier`}
                />
                {displayBtnDelete(saisonData)}      
            </>
        )
    }

    const displayBoolean = value => value ? <Icon name='check' /> : <Icon name='times' />


    //Affichage de la liste des prixtubes (data)
    const displayData = saisons.map(data => {
        return (
            <Table.Row id='row-saisons' key={data.id} active>
                <Table.Cell id='cell-saisons' className='align-middle' textAlign='left'>{data.anneeDebut + ' - ' + data.anneeFin}</Table.Cell>
                <Table.Cell id='cell-saisons' className='align-middle' textAlign='center'>{currencyLocalPrice(data.budget)}</Table.Cell>
                <Table.Cell id='cell-saisons' className='align-middle' textAlign='right'>{new Date(data.dateCreation).toLocaleString()}</Table.Cell>
                <Table.Cell id='cell-saisons' className='align-middle' textAlign='center'>{displayBoolean(data.active)}</Table.Cell>
                <Table.Cell id='cell-saisons' className='align-middle' textAlign='center'>{displayAction(data)}</Table.Cell>
            </Table.Row>
        )
    })


    const displayTableSaisons = saisons.length !== 0
    ?   <Table className='mt-4' color='blue' inverted>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell collapsing style={{width: '120px'}}>Saison</Table.HeaderCell>
                    <Table.HeaderCell collapsing textAlign='center' style={{width: '100px'}}>Budget</Table.HeaderCell>
                    <Table.HeaderCell textAlign='right'>Créé le</Table.HeaderCell>
                    <Table.HeaderCell collapsing textAlign='center' style={{width: '120px'}}>Active</Table.HeaderCell>
                    <Table.HeaderCell collapsing textAlign='center' style={{width: '180px'}}>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body style={{borderStyle: 'none'}}>{displayData}</Table.Body>
            
        </Table>
    : <div className='mt-4'>Aucune saison à afficher.</div>


    
    //Affichage des états de la requête GET /saisons
    const loaderSaisons = isLoading && !isGetSuccess && error === ''
    ? <Loader className='mt-5' loadingMsg='Chargement des saisons en cours...'/>
    : !isLoading && error !== ''
        ?   <Container>
                <AlertDanger className='mt-5' errorMsg={errorMsg}/>
            </Container>
        : !isLoading && isGetSuccess
            ? displayTableSaisons
            : <p>Aucune saison pour le moment.</p>
    


    //fermeture des modals
    const hideModal = () => {
        setOpenModalCreate(false)
        setOpenModalDelete(false)
        setOpenModalTransfer(false)

        setIdSaisonActive(0)
        dispatch(initSaisons())
        dispatch(initSaisonActive())
        dispatch(getSaisonActive(token))
    }

    const hideModalEdit = () => {
        setOpenModalEdit(false)
    }

    const showModalCreate = () => setOpenModalCreate(true)


    const loaderTypeTubes = listTypetubes.isLoading && !listTypetubes.isGetSuccess && listTypetubes.error === ''
        ? <Button className='me-2' disabled><Icon name='plus'/> Saison</Button>
        : listTypetubes.isGetSuccess 
            ? <Button className='me-2' onClick={showModalCreate}><Icon name='plus'/> Saison</Button>
            : <Button className='me-2' disabled><Icon name='plus'/> Saison</Button>



    //Modal de creation d'un saison
    const displayModalCreate = openModalCreate && <ModalCreateSaison hideModal={hideModal}/>


    //Ouverture du modal et recupération des infos
    const showModalDelete = saisonData => {
        setSaisonDelete({
            id: saisonData.id, 
            nom: `${saisonData.anneeDebut} - ${saisonData.anneeFin}`,
            ConsoVolants: saisonData.ConsoVolants,
            Stocks: saisonData.Stocks
        })
        setOpenModalDelete(true)
    }

    //console.log(saisonDelete)
    const handleDelete = saisonDelete => {
        setRequestDelete(true)
        dispatch(deleteSaison(token, saisonDelete))
        setOpenModalDelete(false)
    }


    //activation du modal de double confirmation
    const displayModalDelete = openModalDelete && 
        <Modal2Confirmation 
            hideModal={hideModal} 
            handleConfirm={() => handleDelete(saisonDelete)}
            textValue={
                <p className='text-center'>
                    Êtes-vous sûr de vouloir le supprimer la saison <b>{saisonDelete.nom}</b> ?
                </p> 
            }/>


    //Ouverture du modal et recupération des infos
    const showModalEdit = (saisonData) => {
        setSaisonEdit({
            id: saisonData.id,
            active: saisonData.active
        })
        setRequestEdit(true)
        setOpenModalEdit(true)
    }


    const handleView = idSaison => {
        navigate(`/saison/${idSaison}`)
    }


    //activation du modal de double confirmation
    const displayModalEdit = openModalEdit && 
        <ModalEditSaison
            hideModal={hideModalEdit}
            saisonData={saisonEdit}/>


    const handleTransfer = () => setOpenModalTransfer(true)
    const displayModalTransfer = openModalTransfer && <ModalTransferSaison hideModal={hideModal}/>


    return (
        <>
            <Container>
                <main role='main'>
                    <div className='mx-0 my-2 p-2 bg-light border rounded-3'>
                        <Container className='text-center justify-content-center'>
                            <div className='display-6'>Gestion des saisons</div>
                            <hr/>
                            <div className='d-flex justify-content-start'>
                                {loaderTypeTubes}
                                <Button variant='success' onClick={handleTransfer} disabled={!isGetSuccess || role < 2 || saisonActive === undefined}>
                                    <Icon name='sync alternate'/> Transfert de saison
                                </Button>
                            </div>
                        </Container>
                    </div>
                </main>
  
                {loaderSaisons}
                    
            </Container>

            {displayModalDelete}
            {displayModalCreate}  
            {displayModalEdit}
            {displayModalTransfer}
        </>
    )
}

export default Saisons