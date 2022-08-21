import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Icon, Popup, Table } from 'semantic-ui-react'
import { getPage } from '../../Redux/actions/pages'
import { deleteSaison, getAllSaisons, getSaisonActive, initSaisonActive, refreshAllSaisons } from '../../Redux/actions/saisons'
import AlertDanger from '../AlertDanger'
import Loader from '../Loader'
import Modal2Confirmation from '../Modal2Confirmation'
import ModalCreateSaison from '../ModalCreateSaison'
import ModalEditSaison from '../ModalEditSaison'



const Saisons = () => {

    //Hooks
    const dispatch = useDispatch()


    //Redux
    const {token, role} = useSelector(state => state.user)
    const listSaisons = useSelector(state => state.saisons)
    const listTypetubes = useSelector(state => state.typetubes)


    //States
    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [requestDelete, setRequestDelete] = useState(false)
    const [requestEdit, setRequestEdit] = useState(false)
    const [saisonDelete, setSaisonDelete] = useState({})
    const [saisonEdit, setSaisonEdit] = useState({})
    const [errorMsg, setErrorMsg] = useState('')


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


    useEffect(() => {
        dispatch(getPage('saisons'))
        if (listSaisons.saisons.length === 0) {
            dispatch(getAllSaisons(token))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, token])



    useEffect(() => {
        if (listSaisons.error !== '') {
            setErrorMsg(listSaisons.error)
        }
    }, [listSaisons])
    


    useEffect(() => {
        if (requestDelete === true) {
            if (listSaisons.errorDelete !== '') {
                setRequestDelete(false)
                setErrorMsg(listSaisons.errorDelete)
            }
        }
    }, [requestDelete, listSaisons])



    useEffect(() => {
        if (listSaisons.isDeleteSuccess) {
            setRequestDelete(false)
            dispatch(initSaisonActive())
            dispatch(refreshAllSaisons(token))
            

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

    }, [dispatch, listSaisons, token])

    useEffect(() => {
        if (requestEdit && listSaisons.errorDelete !== '') {
            setRequestEdit(false)
            setErrorMsg(listSaisons.errorDelete)
        }
    }, [requestEdit, listSaisons])



    useEffect(() => {
        if (requestEdit && listSaisons.isEditSuccess) {
            setRequestEdit(false)
            dispatch(initSaisonActive())
            dispatch(getSaisonActive(token))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listSaisons, token])



    //Affichage au format prix
    const currencyLocalPrice = prix => {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prix)
    }



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
    const displayData = listSaisons.saisons.map(data => {
        return (
            <Table.Row id='row-saisons' key={data.id} active>
                <Table.Cell id='cell-saisons' className='align-middle' textAlign='left'>{data.anneeDebut + ' - ' + data.anneeFin}</Table.Cell>
                <Table.Cell id='cell-saisons' className='align-middle' textAlign='center'>{currencyLocalPrice(data.budget)}</Table.Cell>
                <Table.Cell id='cell-saisons' className='align-middle' textAlign='right'>{new Date(data.horodatage).toLocaleString()}</Table.Cell>
                <Table.Cell id='cell-saisons' className='align-middle' textAlign='center'>{displayBoolean(data.active)}</Table.Cell>
                <Table.Cell id='cell-saisons' className='align-middle' textAlign='center'>{displayAction(data)}</Table.Cell>
            </Table.Row>
        )
    })


    const displayTableSaisons = listSaisons.saisons.length !== 0
    ?   <Table className='mt-4' color='blue' inverted>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell collapsing style={{width: '120px'}}>Saison</Table.HeaderCell>
                    <Table.HeaderCell collapsing textAlign='center' style={{width: '100px'}}>Budget</Table.HeaderCell>
                    <Table.HeaderCell textAlign='right'>horodatage</Table.HeaderCell>
                    <Table.HeaderCell collapsing textAlign='center' style={{width: '120px'}}>Active</Table.HeaderCell>
                    <Table.HeaderCell collapsing textAlign='center' style={{width: '120px'}}>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body style={{borderStyle: 'none'}}>{displayData}</Table.Body>
            
        </Table>
    : <div className='mt-4'>Aucune saison à afficher.</div>



    //Affichage message erreur
    const displayError = errorMsg !== '' && 
    <Container>
        <AlertDanger className='mt-5' errorMsg={errorMsg}/>
    </Container>



    //Affichage des états de la requête GET /saisons
    const loaderSaisons = listSaisons.isLoading
    ? <Loader className='mt-5' loadingMsg='Chargement des saisons en cours...'/>
    : listSaisons.error !== '' ? displayError : displayTableSaisons


    //fermeture des modals
    const hideModal = () => {
        setOpenModalCreate(false)
        setOpenModalDelete(false)
        setOpenModalEdit(false)
    }

    const showModalCreate = () => setOpenModalCreate(true)


    const loaderTypeTubes = listTypetubes.isLoading
    ? <Button className='me-2' disabled><Icon name='plus'/> Saison</Button>
    : listTypetubes.error !== '' ? <Button className='me-2' disabled><Icon name='plus'/> Saison</Button>
    : <Button className='me-2' onClick={showModalCreate}><Icon name='plus'/> Saison</Button>



    //Modal de creation d'un saison
    const displayModalCreate = openModalCreate && <ModalCreateSaison hideModal={hideModal}/>


    //Ouverture du modal et recupération des infos
    const showModalDelete = (saisonData) => {
        setSaisonDelete({id: saisonData.id, nom: `${saisonData.anneeDebut} - ${saisonData.anneeFin}`})
        setOpenModalDelete(true)
    }


    const handleDelete = id => {
        setRequestDelete(true)
        dispatch(deleteSaison(token, id))
        setOpenModalDelete(false)
    }


    //activation du modal de double confirmation
    const displayModalDelete = openModalDelete && 
        <Modal2Confirmation 
            hideModal={hideModal} 
            handleConfirm={() => handleDelete(saisonDelete.id)}
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


    //activation du modal de double confirmation
    const displayModalEdit = openModalEdit && 
        <ModalEditSaison
            hideModal={hideModal}
            saisonData={saisonEdit}/>


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
                            </div>
                        </Container>
                    </div>
                </main>
  
                {loaderSaisons}
                    
            </Container>

            {displayModalDelete}
            {displayModalCreate}  
            {displayModalEdit}
        </>
    )
}

export default Saisons