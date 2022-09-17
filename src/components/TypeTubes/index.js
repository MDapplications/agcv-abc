import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { Icon, Popup, Table as TableSUI } from 'semantic-ui-react'
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
import { createConsoVolant, getSaisonActive } from '../../Redux/actions/saisons'
import Table from '../Table'
import { typetubes as header } from '../../data/headers'



const TypeTubes = () => {

    //Hooks
    const dispatch = useDispatch()


    //Redux
    const {token, role} = useSelector(state => state.user)
    const page = useSelector(state => state.page)
    const {saisonActive} = useSelector(state => state.saisons)
    const {typetubes, isLoading, error, errorDelete, isDeleteSuccess, isGetSuccess} = useSelector(state => state.typetubes)


    //States
    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [requestDelete, setRequestDelete] = useState(false)
    const [typetubeDelete, setTypetubeDelete] = useState({})
    const [typetubeEdit, setTypetubeEdit] = useState({})
    const [errorMsg, setErrorMsg] = useState('')
    const [requestCreate, setRequestCreate] = useState(false)
    const [typetubesConso, setTypetubesConso] = useState([])


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
        if (page !== 'typetubes') dispatch(getPage('typetubes'))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    
    useEffect(() => {
        if (!isLoading && !isGetSuccess && error === '') {
            dispatch(getAllTypetubes(token))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isGetSuccess, error, token])


    useEffect(() => {
        if (!isLoading && error !== '') {
            setErrorMsg(error)
        }
    }, [isLoading, error])
    


    useEffect(() => {
        if (requestDelete && errorDelete !== '') {
            setRequestDelete(false)
            setErrorMsg(errorDelete)
        }
    }, [requestDelete, errorDelete])



    useEffect(() => {
        if (requestDelete && isDeleteSuccess) {
            setRequestDelete(false)
            dispatch(refreshAllTypetubes(token))
            dispatch(getSaisonActive(token))

            toast.success("Suppression du typetube réalisé avec succès !",
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
        if (requestCreate 
            && !isLoading
            && error === ''
            && isGetSuccess 
            && saisonActive !== undefined 
            && Object.keys(saisonActive).some(key => key === 'ConsoVolants')) {
                const listTypetubes = []
                saisonActive.ConsoVolants.forEach(data => {
                    listTypetubes.push(data.TypeTube)
                })
                setTypetubesConso(listTypetubes)
                setRequestCreate(false)
        } else {
            if (requestCreate && !isLoading && !isGetSuccess && error === '') {
                setRequestCreate(false)
            }
        }
    }, [requestCreate, isGetSuccess, saisonActive, isLoading, error])
    

    const comparer = (otherArray) => {
        return function(current){
          return otherArray.filter(function(other){
            return other.id === current.id
          }).length === 0;
        }
    }

    useEffect(() => {
        if (typetubesConso.length > 0) {
            if (typetubesConso.length < typetubes.length) {
                const dataFilter = typetubes.filter(comparer(typetubesConso))
                if (dataFilter.length > 0) {
                    dispatch(createConsoVolant(token,{   
                        stock: 0, 
                        idSaison: saisonActive.id,
                        idTypeTube: dataFilter[0].id
                    }, {typeTubeName: 'Compétition'}))
                    setTypetubesConso([])
                    dispatch(getSaisonActive(token))
                } 
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [typetubesConso, typetubes])
    

    //Bontons action
    const displayAction = typeTubeData => {
        return (
            <>
                <Popup
                    trigger={
                        <Button 
                            className='me-2' 
                            variant="primary"
                            disabled={role < 3 && typeTubeData.default}
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
                            disabled={role < 3}
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
    const displayData = typetubes.map(typetubeData => {
        const date = new Date(typetubeData.dateCreation)
        return(
            <TableSUI.Row id='row-typetubes' key={typetubeData.id} active>
                <TableSUI.Cell id='cell-typetubes' className='align-middle'>{typetubeData.name}</TableSUI.Cell>
                <TableSUI.Cell id='cell-typetubes' className='align-middle'>{typetubeData.comment}</TableSUI.Cell>
                <TableSUI.Cell id='cell-typetubes' className='align-middle' textAlign='center'>{typetubeData.lowLevel}</TableSUI.Cell>
                <TableSUI.Cell id='cell-typetubes' className='align-middle' textAlign='center'>{date.toLocaleString()}</TableSUI.Cell>
                <TableSUI.Cell id='cell-typetubes' className='align-middle' textAlign='center'>{displayBoolean(typetubeData.orderable)}</TableSUI.Cell>
                <TableSUI.Cell id='cell-typetubes' className='align-middle' textAlign='center'>{displayBoolean(typetubeData.default)}</TableSUI.Cell>
                <TableSUI.Cell id='cell-typetubes' className='align-middle' textAlign='center'>{displayAction(typetubeData)}</TableSUI.Cell>
            </TableSUI.Row>
        )
    })


    //Affichage de la liste des typetubes (en-tête)
    const displayTableTypetube = typetubes.length !== 0
    ?   <Table 
            table={{className: 'mt-4 me-5', color: 'blue'}}
            body={{style: {borderStyle: 'none'}}}
            header={header}
            displayData={displayData}/>
    : <div className='mt-4'>Aucun type de tube à afficher.</div>



    //Affichage message erreur
    const displayError = errorMsg !== '' && 
    <Container>
        <AlertDanger className='mt-5' errorMsg={errorMsg}/>
    </Container>
  


    //Affichage des états de la requête GET /typetubes
    const loaderTypeTubes = isLoading
    ? <Loader className='mt-5' loadingMsg='Chargement des type de tubes en cours...'/>
    : error !== '' ? displayError : displayTableTypetube


    //fermeture des modals
    const hideModal = () => {
        setOpenModalCreate(false)
        setOpenModalDelete(false)
        setOpenModalEdit(false)
    }

    const hideModalCreate = () => {
        hideModal()
        setRequestCreate(true)
    }
    

    const showModalCreate = () => setOpenModalCreate(true)
    

    //Modal de creation d'un typetube
    const displayModalCreate = openModalCreate && <ModalCreateTypeTube hideModal={hideModalCreate}/>


    //Ouverture du modal et recupération des infos
    const showModalDelete = (userData) => {
        setTypetubeDelete({id: userData.id, name: userData.name})
        setOpenModalDelete(true)
    }


    const handleDelete = id => {
        setRequestDelete(true)
        dispatch(deleteTypetube(token, id))
        setOpenModalDelete(false)
    }


    //activation du modal de double confirmation
    const displayModalDelete = openModalDelete && 
        <Modal2Confirmation 
            hideModal={hideModal} 
            handleConfirm={() => handleDelete(typetubeDelete.id)}
            textValue={
                <p className='text-center'>
                    Êtes-vous sûr de vouloir le supprimer le typetube <b>{typetubeDelete.name}</b> [id: {typetubeDelete.id}] ?
                </p> 
            }/>


    //Ouverture du modal et recupération des infos
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