import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Icon, Popup, Table } from 'semantic-ui-react'
import { getPage } from '../../Redux/actions/pages'
import { deleteMembre, getAllMembres, refreshAllMembres } from '../../Redux/actions/membres'
import toast from 'react-hot-toast'
import AlertDanger from '../AlertDanger'
import Loader from '../Loader'
import ModalCreateMembre from '../ModalCreateMembre'
import ModalEditMembre from '../ModalEditMembre'
import Modal2Confirmation from '../Modal2Confirmation'
import './index.css'



const Membres = () => {

    //Hooks
    const dispatch = useDispatch()


    //Redux
    const user = useSelector(state => state.user)
    const listMembres = useSelector(state => state.membres)


    //States
    const [toggleMembreDisable, setToggleMembreDisable] = useState(false)
    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [requestDelete, setRequestDelete] = useState(false)
    const [membreDelete, setMembreDelete] = useState({})
    const [membreEdit, setMembreEdit] = useState({})
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
        dispatch(getPage('membres'))
        if (listMembres.membres.length === 0) {
            dispatch(getAllMembres(user.token))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, user])



    useEffect(() => {
        if (listMembres.error !== '') {
            setErrorMsg(listMembres.error)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listMembres])
    


    useEffect(() => {
        if (requestDelete === true) {
            if (listMembres.errorDelete !== '') {
                setRequestDelete(false)
                setErrorMsg(listMembres.errorDelete)
            }
        }
    }, [requestDelete, listMembres])



    useEffect(() => {
        if (listMembres.isDeleteSuccess) {
            setRequestDelete(false)
            dispatch(refreshAllMembres(user.token))

            toast.success("Suppression du membre r??alis?? avec succ??s !",
            {
                style: {
                    border: '1px solid #00B35B',
                    padding: '16px',
                    color: '#00B35B',
                },
                duration: 5000,
            })
        }
    }, [dispatch, listMembres, user])



    const displayBtnDelete = membreData => user.role > 2 
    ? <Popup
        trigger={
            <Button 
                variant="danger"
                onClick={() => showModalDelete(membreData)}>
                    <Icon name='trash'/>
            </Button>
        }
        style={stylePopupDelete}
        content={`Supprimer`}/>
    : null



    //Bontons action
    const displayAction = membreData => {
        return (
            <>
                <Popup
                    trigger={
                        <Button 
                            className='me-2' 
                            variant="primary"
                            onClick={() => showModalEdit(membreData)}>
                                <Icon name='edit'/>
                        </Button>
                    }
                    style={stylePopupEdit}
                    content={`Modifier`}
                />
                {displayBtnDelete(membreData)}      
            </>
        )
    }

    const displayBoolean = value => value ? <Icon name='check' /> : <Icon name='times' /> 


    const displayTableRow = (data) => {
        return (
            <Table.Row id='row-membres' key={data.id} active>
                <Table.Cell id='cell-membres' className='align-middle'>{data.id}</Table.Cell>
                <Table.Cell id='cell-membres' className='align-middle' textAlign='center'>{data.prenom}</Table.Cell>
                <Table.Cell id='cell-membres' className='align-middle' textAlign='center'>{data.nom}</Table.Cell>
                <Table.Cell id='cell-membres' className='align-middle' textAlign='right'>{new Date(data.horodatage).toLocaleString()}</Table.Cell>
                <Table.Cell id='cell-membres' className='align-middle' textAlign='center'>{displayBoolean(data.actif)}</Table.Cell>
                <Table.Cell id='cell-membres' className='align-middle' textAlign='center'>{displayAction(data)}</Table.Cell>
            </Table.Row>
        )
    }


    //Affichage de la liste des membres (data)
    const displayData = listMembres.membres.map(membreData => (toggleMembreDisable === false) 
        ? membreData.actif
            ? displayTableRow(membreData)
            : null
        : displayTableRow(membreData)
    )



    //Affichage de la liste des membres (en-t??te)
    const displayTableMembres = listMembres.membres.length !== 0
    ?   <Table className='mt-4' color='blue' inverted>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell collapsing>#</Table.HeaderCell>
                    <Table.HeaderCell collapsing textAlign='center' style={{width: '110px'}}>Pr??nom</Table.HeaderCell>
                    <Table.HeaderCell collapsing textAlign='center' style={{width: '110px'}}>Nom</Table.HeaderCell>
                    <Table.HeaderCell textAlign='right'>horodatage</Table.HeaderCell>
                    <Table.HeaderCell collapsing textAlign='center' style={{width: '120px'}}>Actif</Table.HeaderCell>
                    <Table.HeaderCell collapsing textAlign='center' style={{width: '120px'}}>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body style={{borderStyle: 'none'}}>{displayData}</Table.Body>
            
        </Table>
    : <div className='mt-4'>Aucun membre ?? afficher.</div>



    //Affichage message erreur
    const displayError = errorMsg !== '' && 
    <Container>
        <AlertDanger className='mt-5' errorMsg={errorMsg}/>
    </Container>
  


    //Affichage des ??tats de la requ??te GET /membres
    const loaderMembres = listMembres.isLoading
    ? <Loader className='mt-5' loadingMsg='Chargement des membres en cours...'/>
    : listMembres.error !== '' ? displayError : displayTableMembres


    //fermeture des modals
    const hideModal = () => {
        setOpenModalCreate(false)
        setOpenModalDelete(false)
        setOpenModalEdit(false)
    }

    const showModalCreate = () => setOpenModalCreate(true)



    //Modal de creation d'un membre
    const displayModalCreate = openModalCreate && <ModalCreateMembre hideModal={hideModal}/>


    //Ouverture du modal et recup??ration des infos
    const showModalDelete = (membreData) => {
        setMembreDelete({id: membreData.id, prenom: membreData.prenom, nom: membreData.nom})
        setOpenModalDelete(true)
    }


    const handleDelete = id => {
        setRequestDelete(true)
        dispatch(deleteMembre(user.token, id))
        setOpenModalDelete(false)
    }


    //activation du modal de double confirmation
    const displayModalDelete = openModalDelete && 
        <Modal2Confirmation 
            hideModal={hideModal} 
            handleConfirm={() => handleDelete(membreDelete.id)}
            textValue={
                <p className='text-center'>
                    ??tes-vous s??r de vouloir le supprimer le membre <b>{membreDelete.prenom + ' ' + membreDelete.nom}</b> ?
                </p> 
            }/>


    //Ouverture du modal et recup??ration des infos
    const showModalEdit = (membreData) => {
        setMembreEdit({
            id: membreData.id,
            actif: membreData.actif
        })
        setOpenModalEdit(true)
    }


    //activation du modal de double confirmation
    const displayModalEdit = openModalEdit && 
        <ModalEditMembre
            hideModal={hideModal}
            membreData={membreEdit}/>

  
    const displayBtnActif = !toggleMembreDisable
    ? <Button variant='success' onClick={() => setToggleMembreDisable(true)}><Icon name='eye'/> Afficher inactif</Button>
    : <Button variant='success' onClick={() => setToggleMembreDisable(false)}><Icon name='eye slash'/> Ne plus afficher inactif</Button>



    return (
        <>
            <Container>
                <main role='main'>
                    <div className='mx-0 my-2 p-2 bg-light border rounded-3'>
                        <Container className='text-center justify-content-center'>
                            <div className='display-6'>Listes des membres</div>
                            <hr/>
                            <div className='d-flex justify-content-start'>
                                <Button className='me-2' onClick={showModalCreate}><Icon name='plus'/> Membre</Button>
                                {displayBtnActif}
                            </div>
                        </Container>
                    </div>
                    </main>
  
                {loaderMembres}
                    
            </Container>

            {displayModalCreate}  
            {displayModalDelete}
            {displayModalEdit}
        </>
    )
}

export default Membres