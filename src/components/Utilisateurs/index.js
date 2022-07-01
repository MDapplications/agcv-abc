import React, { useEffect, useState } from 'react'
import { Button, Container, Form, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, editUser, getAllUsers } from '../../Redux/actions/users'
import Loader from '../Loader'
import AlertDanger from '../AlertDanger'
import Modal2Confirmation from '../Modal2Confirmation'
import './index.css'
import ModalEditUser from '../ModalEditUser'



const Utilisateurs = () => {
    
    //Hooks
    const dispatch = useDispatch()


    //Redux
    const user = useSelector(state => state.user)
    const listUsers = useSelector(state => state.users)
    

    //States
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [userDelete, setUserDelete] = useState({})
    const [userEdit, setUserEdit] = useState({})



    useEffect(() => {
        if (listUsers.Users.length === 0) {
            dispatch(getAllUsers(user.token))
        }
    }, [dispatch, user])
 


    const handleEdit = userData => {
        //console.log("Vous voulez editer l'utilisateur avec l'id: " + userData.id)
        dispatch(editUser(user.token, userData))
        setOpenModalEdit(false)
    }

    const handleDelete = id => {
        //console.log("Vous voulez supprimer l'utilisateur avec l'id: " + id)
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
            <span>
                <Button 
                    className='me-2' 
                    variant="primary" 
                    disabled={disableActions(userData)}
                    onClick={() => showModalEdit(userData)}>
                        Modifier
                </Button>
                <Button 
                    variant="danger" 
                    disabled={disableActions(userData)}
                    onClick={() => showModalDelete(userData)}>
                        Supprimer
                </Button>
            </span>
        )
    }


    const showRole = role => {
        switch (role) {
        case 1: return 'User'
        case 2: return 'Admin'
        case 3: return 'Super Admin'
        default: return 'invité';
    }}

    //Affichage de la liste des utilisateur (data)
    const displayData = listUsers.Users.map(userData => {
        const date = new Date(userData.dateUpdate)
        return(
            <ListGroupItem 
                    key={userData.id} 
                    className='d-flex justify-content-between align-items-center' 
                    disabled={userData.id===user.id}>
                <div>
                    <span className='me-4'>{userData.id}</span>
                    <span>{userData.identifiant}</span>
                </div>
                
                <div className='d-flex justify-content-between align-items-center'>
                    <span style={{paddingRight: '50px'}}>
                        {showRole(userData.role)}
                    </span>
                    <span className='me-4'>
                        {date.toLocaleString()}
                    </span>
                    <span className='me-4'>
                        {userData.actif ? 'Oui' : 'Non'}
                    </span>  
                    {displayAction(userData)}
                </div>
            </ListGroupItem>

        )
    })



    
    //Affichage de la liste des utilisateur (en-tête)
    const displayTableUsers = listUsers.Users.length !== 0
    ? <ListGroup className='text-start mb-5'>
        <ListGroupItem variant='primary' className='d-flex justify-content-between align-items-center'>
            <div>
                <span className='me-4'>#</span>
                <span>username</span>
            </div>
            <div className='d-flex justify-content-between align-items-center'>
                <span className='me-1' style={{paddingRight: '50px'}}>
                    Rôle
                </span>
                <span className='mx-4'>
                    Dernière MaJ
                </span>
                <span className='mx-4'>
                    Actif
                </span>
                <span className='ms-3' style={{width: '176px'}}>
                   
                </span>
            </div>
            
        </ListGroupItem>
            {displayData}
        </ListGroup>
    : <div>Aucun utilisateur à affiché.</div>



    //Affichage message erreur
    const displayError = <>
        <AlertDanger errorMsg={listUsers.error}/>
        <div>
            Si c'est une erreur de jeton, veuillez vous déconnecter/reconnecter, merci.
        </div>
    </>
    


    //Affichage des états de la requête GET /users
    const loaderUsers = listUsers.isLoading
    ? <Loader loadingMsg='Chargement des utilisateurs en cours...'/>
    : listUsers.error !== '' ? displayError : displayTableUsers
    
    


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



    const handleChange = event => setUserEdit({...userEdit, [event.target.id]: event.target.value})
    const handleChangeActif = event => setUserEdit({...userEdit, [event.target.id]: event.target.checked})
    const handleChangeRole = event => setUserEdit({...userEdit, [event.target.id]: Number(event.target.value)})



    //activation du modal de double confirmation
    const displayModalEdit = openModalEdit && 
        <ModalEditUser
            hideModal={hideModal} 
            handleConfirm={() => handleEdit(userEdit)}>

                    <Form>
                        <Form.Group className='mb-3 mx-3 text-start'>

                            <Row>
                                <Col sm="3">
                                    <Form.Label className='mb-0 mt-2'>
                                        Identifiant
                                    </Form.Label>  
                                </Col>
                                <Col sm="8">
                                    <Form.Control 
                                        id='identifiant' 
                                        className='mb-3' 
                                        placeholder='identifiant' 
                                        value={userEdit.identifiant}
                                        onChange={handleChange}/>
                                </Col>
                            </Row>
                            
                            <Row>
                                <Col sm="3">
                                    <Form.Label className='mb-0 mt-2'>
                                        Rôle
                                    </Form.Label>
                                </Col>
                                <Col sm="8">
                                    <Form.Select 
                                        id='role'
                                        defaultValue={userEdit.role}
                                        onChange={handleChangeRole}>
                                            <option value="1">User</option>
                                            <option value="2">Admin</option>
                                            <option value="3">Super Admin</option>
                                    </Form.Select> 
                                </Col>
                            </Row>

                            <Row>
                                <Col sm="3">
                                    <Form.Label className='mb-0 mt-4'>
                                        Actif ?
                                    </Form.Label>
                                </Col>
                                <Col sm="8">
                                    <Form.Check
                                        className='mt-4' 
                                        type="switch"
                                        id="actif"
                                        checked={userEdit.actif}
                                        onChange={handleChangeActif}/>
                                </Col>
                            </Row>
                                       

                        </Form.Group>
                     </Form>

        </ModalEditUser>



    //render
    return (
        <>
            <Container>
                <main role='main'>
                    <div className='m-2 p-2 bg-light border rounded-3'>
                        <Container className='text-center justify-content-center'>
                            <div className='display-6'>Gestion des utilisateurs</div>
                        </Container>
                    </div>
                </main>
                <Container className='mt-5'>
                    {loaderUsers}
                </Container>
                
            </Container>

            {displayModalDelete}
            {displayModalEdit}
        </>
    )
}

export default Utilisateurs