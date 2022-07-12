import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { Table, Icon, Popup } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getAllUsers, refreshAllUsers } from '../../Redux/actions/users'
import Loader from '../Loader'
import AlertDanger from '../AlertDanger'
import Modal2Confirmation from '../Modal2Confirmation'
import ModalEditUser from '../ModalEditUser'
import toast from 'react-hot-toast'
import { getPage } from '../../Redux/actions/pages'
import './index.css'


const Utilisateurs = () => {
    
    //Hooks
    const dispatch = useDispatch()


    //Redux
    const user = useSelector(state => state.user)
    const listUsers = useSelector(state => state.users)
    

    //States
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [requestDelete, setRequestDelete] = useState(false)
    const [userDelete, setUserDelete] = useState({})
    const [userEdit, setUserEdit] = useState({})
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
        dispatch(getPage('utilisateurs'))
        if (listUsers.Users.length === 0) {
            dispatch(getAllUsers(user.token))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, user])


    useEffect(() => {
        if (listUsers.error !== '') {
            setErrorMsg(listUsers.error)
        }
    }, [listUsers])
    

    useEffect(() => {
        if (requestDelete === true) {
            if (listUsers.errorDelete !== '') {
                setRequestDelete(false)
                setErrorMsg(listUsers.errorDelete)
            }
        }
    }, [requestDelete, listUsers])

    
    useEffect(() => {
        if (listUsers.isDeleteSuccess) {
            setRequestDelete(false)
            dispatch(refreshAllUsers(user.token))

            toast.success("Suppression de l'utilisateur réalisé avec succès !",
            {
                style: {
                    border: '1px solid #00B35B',
                    padding: '16px',
                    color: '#00B35B',
                },
                duration: 5000,
            })
        }
    }, [dispatch, listUsers, user])






    const handleDelete = id => {
        setRequestDelete(true)
        dispatch(deleteUser(user.token, id))
        setOpenModalDelete(false)
    }



    const disableActions = userData => {       
        if (user.username === userData.identifiant) {
            return true
        }
        return false
    }


    //Bontons action
    const displayAction = userData => {
        return (
            <>
                <Popup
                    trigger={
                        <Button 
                            className='me-2' 
                            variant="primary" 
                            disabled={disableActions(userData)}
                            onClick={() => showModalEdit(userData)}>
                                <Icon name='edit'/>
                        </Button>
                    }
                    style={stylePopupEdit}
                    content={`Modifier`}
                />
                <Popup
                    trigger={
                        <Button 
                            variant="danger" 
                            disabled={disableActions(userData)}
                            onClick={() => showModalDelete(userData)}>
                                <Icon name='trash'/>
                        </Button>
                    }
                    style={stylePopupDelete}
                    content={`Supprimer`}
                />           
            </>
        )
    }


    const showRole = role => {
        switch (role) {
        case 1: return 'User'
        case 2: return 'Admin'
        case 3: return 'Super Admin'
        default: return 'invité';
    }}


    const getIdActive = userData => (userData.id === user.id) ? 'row-users-disable' : 'row-users'
    const displayBoolean = value => value ? <Icon name='check' /> : <Icon name='times' /> 

    //Affichage de la liste des utilisateur (data)
    const displayData = listUsers.Users.map(userData => {
        const date = new Date(userData.dateUpdate)
        return(
            <Table.Row id={getIdActive(userData)} key={userData.id} active>
                <Table.Cell id='cell-users' className='align-middle'>{userData.id}</Table.Cell>
                <Table.Cell id='cell-users' className='align-middle'>{userData.identifiant}</Table.Cell>
                <Table.Cell id='cell-users' className='align-middle' textAlign='center'>{showRole(userData.role)}</Table.Cell>
                <Table.Cell id='cell-users' className='align-middle' textAlign='center'>{date.toLocaleString()}</Table.Cell>
                <Table.Cell id='cell-users' className='align-middle' textAlign='center'>{displayBoolean(userData.actif)}</Table.Cell>
                <Table.Cell id='cell-users' className='align-middle' textAlign='center'>{displayAction(userData)}</Table.Cell>
            </Table.Row>
            
        )
    })


    
    //Affichage de la liste des utilisateur (en-tête)
    const displayTableUsers = listUsers.Users.length !== 0
    ? <Table className='my-5' color='brown' inverted>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell collapsing>#</Table.HeaderCell>
                    <Table.HeaderCell>Identifiant</Table.HeaderCell>
                    <Table.HeaderCell collapsing textAlign='center' style={{width: '110px'}}>Rôle</Table.HeaderCell>
                    <Table.HeaderCell collapsing textAlign='center' style={{width: '200px'}}>Dernière MaJ</Table.HeaderCell>
                    <Table.HeaderCell collapsing textAlign='center' style={{width: '120px'}}>Actif</Table.HeaderCell>
                    <Table.HeaderCell collapsing textAlign='center' style={{width: '120px'}}>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>{displayData}</Table.Body>
            
        </Table>        
    : <div className='mt-4'>Aucun utilisateur à afficher.</div>



    //Affichage message erreur
    const displayError = errorMsg !== '' && 
    <Container>
        <AlertDanger className='mt-5' errorMsg={errorMsg}/>
    </Container>
    


    //Affichage des états de la requête GET /users
    const loaderUsers = listUsers.isLoading
    ? <Loader className='mt-5' loadingMsg='Chargement des utilisateurs en cours...'/>
    : listUsers.error !== '' ? null : displayTableUsers
    
    


    //fermeture des modals
    const hideModal = () => {
        setOpenModalDelete(false)
        setOpenModalEdit(false)
    }

    //Ouverture du modal et recupération des infos
    const showModalDelete = (userData) => {
        setUserDelete({id: userData.id, identifiant: userData.identifiant})
        setOpenModalDelete(true)
    }

    //activation du modal de double confirmation
    const displayModalDelete = openModalDelete && 
        <Modal2Confirmation 
            hideModal={hideModal} 
            handleConfirm={() => handleDelete(userDelete.id)}
            textValue={
                <p className='text-center'>Êtes-vous sûr de vouloir le supprimer <b>{userDelete.identifiant}</b> ?</p> 
            }/>



    //Ouverture du modal et recupération des infos
    const showModalEdit = (userData) => {
        setUserEdit({
            id: userData.id,
            identifiant: userData.identifiant,
            role: userData.role,
            actif: userData.actif
        })
        setOpenModalEdit(true)
    }

    //activation du modal de double confirmation
    const displayModalEdit = openModalEdit && 
        <ModalEditUser
            hideModal={hideModal}
            userData={userEdit}/>



    //render
    return (
        <>
            <Container>
                <main role='main'>
                    <div className='mx-0 my-2 p-2 bg-light border rounded-3'>
                        <Container className='text-center justify-content-center'>
                            <div className='display-6'>Gestion des utilisateurs</div>
                        </Container>
                    </div>
                </main>

                {displayError}
                {loaderUsers}
                
            </Container>

            {displayModalDelete}
            {displayModalEdit}
        </>
    )
}

export default Utilisateurs