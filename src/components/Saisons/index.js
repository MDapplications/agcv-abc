import React, { useEffect, useState } from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Icon, Popup } from 'semantic-ui-react'
import { getPage } from '../../Redux/actions/pages'
import { deleteSaison, getAllSaisons, refreshAllSaisons } from '../../Redux/actions/saisons'
import AlertDanger from '../AlertDanger'
import Loader from '../Loader'
import Modal2Confirmation from '../Modal2Confirmation'
import ModalCreateSaison from '../ModalCreateSaison'
import ModalEditSaison from '../ModalEditSaison'



const Saisons = () => {

    //Hooks
    const dispatch = useDispatch()


    //Redux
    const user = useSelector(state => state.user)
    const listSaisons = useSelector(state => state.saisons)


    //States
    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [requestDelete, setRequestDelete] = useState(false)
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
            dispatch(getAllSaisons(user.token))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, user])



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
            dispatch(refreshAllSaisons(user.token))

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

    }, [dispatch, listSaisons, user])



    //Affichage au format prix
    const currencyLocalPrice = prix => {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prix)
    }



    const displayBtnDelete = saisonData => user.role > 2 
        ? <Popup
            trigger={
                <Button 
                    variant="danger"
                    onClick={() => showModalDelete(saisonData)}>
                        <Icon name='trash'/>
                </Button>
            }
            style={stylePopupDelete}
            content={`Supprimer`}/>
        : null
    
    
    
    //Bontons action
    const displayAction = saisonData => {
        return (
            <>
                <Popup
                    trigger={
                        <Button 
                            className='me-2' 
                            variant="primary"
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
                <Table.Cell id='cell-saisons' className='align-middle' textAlign='left'>{`${data.anneeDebut} - ${data.anneeFin}`}</Table.Cell>
                <Table.Cell id='cell-saisons' className='align-middle' textAlign='center'>{currencyLocalPrice(data.budget)}</Table.Cell>
                <Table.Cell id='cell-saisons' className='align-middle' textAlign='center'>{new Date(data.horodatage).toLocaleString()}</Table.Cell>
                <Table.Cell id='cell-saisons' className='align-middle' textAlign='center'>{displayBoolean(data.active)}</Table.Cell>
                <Table.Cell id='cell-saisons' className='align-middle' textAlign='center'>{displayAction(data)}</Table.Cell>
            </Table.Row>
        )
    })


    const displayTableSaisons = listSaisons.saisons.length !== 0
    ?   <Table className='mt-4' color='blue' inverted>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell collapsing style={{width: '200px'}}>Saison</Table.HeaderCell>
                    <Table.HeaderCell collapsing textAlign='center' style={{width: '110px'}}>Budget</Table.HeaderCell>
                    <Table.HeaderCell textAlign='rigth'>horodatage</Table.HeaderCell>
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

    //Modal de creation d'un saison
    const displayModalCreate = openModalCreate && <ModalCreateSaison hideModal={hideModal}/>


    //Ouverture du modal et recupération des infos
    const showModalDelete = (saisonData) => {
        setSaisonDelete({id: saisonData.id, nom: `${saisonData.anneeDebut} - ${saisonData.anneeFin}`})
        setOpenModalDelete(true)
    }


    const handleDelete = id => {
        setRequestDelete(true)
        dispatch(deleteSaison(user.token, id))
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
            actif: saisonData.actif
        })
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
                                <Button className='me-2' onClick={showModalCreate}><Icon name='plus'/> Saison</Button>
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