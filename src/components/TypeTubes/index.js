import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { Icon, Popup, Table } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { getPage } from '../../Redux/actions/pages'
import { deleteTypetube, getAllTypetubes, refreshAllTypetubes } from '../../Redux/actions/typetubes'
import ModalCreateTypeTube from '../ModalCreateTypeTube'
import Modal2Confirmation from '../Modal2Confirmation'
import AlertDanger from '../AlertDanger'
import toast from 'react-hot-toast'
import Loader from '../Loader'
import './index.css'
import ModalEditTypetube from '../ModalEditTypetube'


const TypeTubes = () => {

    //Hooks
    const dispatch = useDispatch()


    //Redux
    const user = useSelector(state => state.user)
    const listTypetubes = useSelector(state => state.typetubes)


    //States
    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [requestDelete, setRequestDelete] = useState(false)
    const [typetubeDelete, setTypetubeDelete] = useState({})
    const [typetubeEdit, setTypetubeEdit] = useState({})
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
        dispatch(getPage('typetubes'))
        if (listTypetubes.typetubes.length === 0) {
            dispatch(getAllTypetubes(user.token))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, user])



    useEffect(() => {
        if (listTypetubes.error !== '') {
            setErrorMsg(listTypetubes.error)
        }
    }, [listTypetubes])
    


    useEffect(() => {
        if (requestDelete === true) {
            if (listTypetubes.errorDelete !== '') {
                setRequestDelete(false)
                setErrorMsg(listTypetubes.errorDelete)
            }
        }
    }, [requestDelete, listTypetubes])



    useEffect(() => {
        if (listTypetubes.isDeleteSuccess) {
            setRequestDelete(false)
            dispatch(refreshAllTypetubes(user.token))

            toast.success("Suppression du typetube r??alis?? avec succ??s !",
            {
                style: {
                    border: '1px solid #00B35B',
                    padding: '16px',
                    color: '#00B35B',
                },
                duration: 5000,
            })
        }
    }, [dispatch, listTypetubes, user])





    //Bontons action
    const displayAction = typeTubeData => {
        return (
            <>
                <Popup
                    trigger={
                        <Button 
                            className='me-2' 
                            variant="primary"
                            onClick={() => showModalEdit(typeTubeData)}>
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
                            onClick={() => showModalDelete(typeTubeData)}>
                                <Icon name='trash'/>
                        </Button>
                    }
                    style={stylePopupDelete}
                    content={`Supprimer`}
                />           
            </>
        )
    }


    const displayBoolean = value => value ? <Icon name='check' /> : <Icon name='times' /> 


    //Affichage de la liste des typetubes (data)
    const displayData = listTypetubes.typetubes.map(typetubeData => {
        const date = new Date(typetubeData.dateCreation)
        return(
            <Table.Row id='row-typetubes' key={typetubeData.id} active>
                <Table.Cell id='cell-typetubes' className='align-middle'>{typetubeData.id}</Table.Cell>
                <Table.Cell id='cell-typetubes' className='align-middle'>{typetubeData.name}</Table.Cell>
                <Table.Cell id='cell-typetubes' className='align-middle'>{typetubeData.comment}</Table.Cell>
                <Table.Cell id='cell-typetubes' className='align-middle' textAlign='center'>{typetubeData.lowLevel}</Table.Cell>
                <Table.Cell id='cell-typetubes' className='align-middle' textAlign='center'>{date.toLocaleString()}</Table.Cell>
                <Table.Cell id='cell-typetubes' className='align-middle' textAlign='center'>{displayBoolean(typetubeData.orderable)}</Table.Cell>
                <Table.Cell id='cell-typetubes' className='align-middle' textAlign='center'>{displayBoolean(typetubeData.default)}</Table.Cell>
                <Table.Cell id='cell-typetubes' className='align-middle' textAlign='center'>{displayAction(typetubeData)}</Table.Cell>
            </Table.Row>
        )
    })



    //Affichage de la liste des typetubes (en-t??te)
    const displayTableTypetube = listTypetubes.typetubes.length !== 0
    ?   <Table className='mt-4' color='blue' inverted>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell collapsing>#</Table.HeaderCell>
                    <Table.HeaderCell collapsing style={{width: '110px'}}>Type de tube</Table.HeaderCell>
                    <Table.HeaderCell>Commentaire</Table.HeaderCell>
                    <Table.HeaderCell collapsing textAlign='center' style={{width: '110px'}}>Niveau bas</Table.HeaderCell>
                    <Table.HeaderCell collapsing textAlign='center' style={{width: '200px'}}>Cr??er le</Table.HeaderCell>
                    <Table.HeaderCell collapsing textAlign='center' style={{width: '120px'}}>Commandable</Table.HeaderCell>
                    <Table.HeaderCell collapsing textAlign='center' style={{width: '120px'}}>D??faut</Table.HeaderCell>
                    <Table.HeaderCell collapsing textAlign='center' style={{width: '120px'}}>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body style={{borderStyle: 'none'}}>{displayData}</Table.Body>
            
        </Table>
    : <div className='mt-4'>Aucun type de tube ?? afficher.</div>



    //Affichage message erreur
    const displayError = errorMsg !== '' && 
    <Container>
        <AlertDanger className='mt-5' errorMsg={errorMsg}/>
    </Container>
  


    //Affichage des ??tats de la requ??te GET /typetubes
    const loaderTypeTubes = listTypetubes.isLoading
    ? <Loader className='mt-5' loadingMsg='Chargement des type de tubes en cours...'/>
    : listTypetubes.error !== '' ? displayError : displayTableTypetube


    //fermeture des modals
    const hideModal = () => {
        setOpenModalCreate(false)
        setOpenModalDelete(false)
        setOpenModalEdit(false)
    }
    

    const showModalCreate = () => setOpenModalCreate(true)
    

    //Modal de creation d'un typetube
    const displayModalCreate = openModalCreate && <ModalCreateTypeTube hideModal={hideModal}/>


    //Ouverture du modal et recup??ration des infos
    const showModalDelete = (userData) => {
        setTypetubeDelete({id: userData.id, name: userData.name})
        setOpenModalDelete(true)
    }


    const handleDelete = id => {
        setRequestDelete(true)
        dispatch(deleteTypetube(user.token, id))
        setOpenModalDelete(false)
    }


    //activation du modal de double confirmation
    const displayModalDelete = openModalDelete && 
        <Modal2Confirmation 
            hideModal={hideModal} 
            handleConfirm={() => handleDelete(typetubeDelete.id)}
            textValue={
                <p className='text-center'>
                    ??tes-vous s??r de vouloir le supprimer le typetube <b>{typetubeDelete.name}</b> [id: {typetubeDelete.id}] ?
                </p> 
            }/>


    //Ouverture du modal et recup??ration des infos
    const showModalEdit = (typetubeData) => {
        setTypetubeEdit({
            id: typetubeData.id,
            name: typetubeData.name,
            comment: typetubeData.comment,
            orderable: typetubeData.orderable,
            lowLevel: typetubeData.lowLevel,
            default: typetubeData.default
        })
        setOpenModalEdit(true)
    }


    //activation du modal de double confirmation
    const displayModalEdit = openModalEdit && 
        <ModalEditTypetube
            hideModal={hideModal}
            typetubeData={typetubeEdit}/>



    //render
    return (
        <>
            <Container style={{paddingBottom: '50px'}}>
                <main role='main'>
                    <div className='mx-0 my-2 p-2 bg-light border rounded-3'>
                        <Container className='text-center justify-content-center'>
                            <div className='display-6'>Type de tubes</div>
                            <hr/>
                            <div className='d-flex justify-content-start'>
                                <Button onClick={showModalCreate}><Icon name='plus'/> Type de tube</Button>
                            </div>
                        </Container>
                    </div>
                </main>
  
                {loaderTypeTubes}
                       
            </Container>

            {displayModalCreate}  
            {displayModalDelete}
            {displayModalEdit}        
        </>
    )
}

export default TypeTubes