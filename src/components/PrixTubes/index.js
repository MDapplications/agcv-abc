import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Icon, Popup, Table } from 'semantic-ui-react'
import { getPage } from '../../Redux/actions/pages'
import { deletePrixtube, getAllPrixtubes, refreshAllPrixtubes } from '../../Redux/actions/prixtubes'
import { getAllTypetubes } from '../../Redux/actions/typetubes'
import AlertDanger from '../AlertDanger'
import Loader from '../Loader'
import Modal2Confirmation from '../Modal2Confirmation'
import ModalCreatePrixtube from '../ModalCreatePrixtube'
import ModalEditPrixtube from '../ModalEditPrixtube'
import './index.css'


const PrixTubes = () => {

        //Hooks
        const dispatch = useDispatch()


        //Redux
        const user = useSelector(state => state.user)
        const listPrixtubes = useSelector(state => state.prixtubes)
        const listTypetubes = useSelector(state => state.typetubes)

    
        //States
        const [togglePrixtubeDisable, setTogglePrixtubeDisable] = useState(false)
        const [openModalCreate, setOpenModalCreate] = useState(false)
        const [openModalDelete, setOpenModalDelete] = useState(false)
        const [openModalEdit, setOpenModalEdit] = useState(false)
        const [requestDelete, setRequestDelete] = useState(false)
        const [prixtubeDelete, setPrixtubeDelete] = useState({})
        const [prixtubeEdit, setPrixtubeEdit] = useState({})
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
            dispatch(getPage('prixtubes'))
            if (listPrixtubes.prixtubes.length === 0) {
                dispatch(getAllPrixtubes(user.token))
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [dispatch, user])


            
        useEffect(() => {
            if (listTypetubes.typetubes.length === 0) {
                dispatch(getAllTypetubes(user.token))
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [dispatch, user])
    
    
    
        useEffect(() => {
            if (listPrixtubes.error !== '') {
                setErrorMsg(listPrixtubes.error)
            }
        }, [listPrixtubes])
        
    
    
        useEffect(() => {
            if (requestDelete === true) {
                if (listPrixtubes.errorDelete !== '') {
                    setRequestDelete(false)
                    setErrorMsg(listPrixtubes.errorDelete)
                }
            }
        }, [requestDelete, listPrixtubes])
    
    
    
        useEffect(() => {
            if (listPrixtubes.isDeleteSuccess) {
                setRequestDelete(false)
                dispatch(refreshAllPrixtubes(user.token))
    
                toast.success("Suppression du prix de tube réalisé avec succès !",
                {
                    style: {
                        border: '1px solid #00B35B',
                        padding: '16px',
                        color: '#00B35B',
                    },
                    duration: 5000,
                })
            }

        }, [dispatch, listPrixtubes, user])
    
    
        //Affichage au format prix
        const currencyLocalPrice = prix => {
            return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prix)
        }



        const getTypeTubeById = idTypeTube => {
            if (listTypetubes.typetubes.length !== 0) {
                const data = listTypetubes.typetubes.filter(typetube => typetube.id === idTypeTube)
                if (data.length !== 0) {
                    return data[0].name + (data[0].comment ? ` (${data[0].comment})` : '')
                } else return ''
            } else {
                return ''
            }
        }


        const displayBtnDelete = prixtubeData => user.role > 2 
        ? <Popup
            trigger={
                <Button 
                    variant="danger"
                    onClick={() => showModalDelete(prixtubeData)}>
                        <Icon name='trash'/>
                </Button>
            }
            style={stylePopupDelete}
            content={`Supprimer`}/>
        : null
    
    
    
        //Bontons action
        const displayAction = prixtubeData => {
            return (
                <>
                    <Popup
                        trigger={
                            <Button 
                                className='me-2' 
                                variant="primary"
                                onClick={() => showModalEdit(prixtubeData)}>
                                    <Icon name='edit'/>
                            </Button>
                        }
                        style={stylePopupEdit}
                        content={`Modifier`}
                    />
                    {displayBtnDelete(prixtubeData)}      
                </>
            )
        }
    
        const displayBoolean = value => value ? <Icon name='check' /> : <Icon name='times' /> 
    
    
        const displayTableRow = (data) => {
            return (
                <Table.Row id='row-prixtubes' key={data.id} active>
                    <Table.Cell id='cell-prixtubes' className='align-middle' textAlign='left'>{getTypeTubeById(data.idTypeTube)}</Table.Cell>
                    <Table.Cell id='cell-prixtubes' className='align-middle'>{data.marque}</Table.Cell>
                    <Table.Cell id='cell-prixtubes' className='align-middle' textAlign='center'>{currencyLocalPrice(data.prix)}</Table.Cell>
                    <Table.Cell id='cell-prixtubes' className='align-middle' textAlign='center'>{currencyLocalPrice(data.prixMembre)}</Table.Cell>
                    <Table.Cell id='cell-prixtubes' className='align-middle' textAlign='center'>{new Date(data.horodatage).toLocaleString()}</Table.Cell>
                    <Table.Cell id='cell-prixtubes' className='align-middle' textAlign='center'>{displayBoolean(data.actif)}</Table.Cell>
                    <Table.Cell id='cell-prixtubes' className='align-middle' textAlign='center'>{displayAction(data)}</Table.Cell>
                </Table.Row>
            )
        }


        //Affichage de la liste des prixtubes (data)
        const displayData = listPrixtubes.prixtubes.map(prixtubeData => (togglePrixtubeDisable === false) 
            ? prixtubeData.actif
                ? displayTableRow(prixtubeData)
                : null
            : displayTableRow(prixtubeData)
        )
    
    
    
        //Affichage de la liste des prixtubes (en-tête)
        const displayTablePrixtubes = listPrixtubes.prixtubes.length !== 0
        ?   <Table className='mt-4' color='blue' inverted>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textAlign='left' collapsing style={{width: '220px'}}>Type</Table.HeaderCell>
                        <Table.HeaderCell textAlign='left'>Marque</Table.HeaderCell>
                        <Table.HeaderCell collapsing textAlign='center' style={{width: '110px'}}>Prix (club)</Table.HeaderCell>
                        <Table.HeaderCell collapsing textAlign='center' style={{width: '110px'}}>Prix (membre)</Table.HeaderCell>
                        <Table.HeaderCell collapsing textAlign='center' style={{width: '200px'}}>horodatage</Table.HeaderCell>
                        <Table.HeaderCell collapsing textAlign='center' style={{width: '120px'}}>Actif</Table.HeaderCell>
                        <Table.HeaderCell collapsing textAlign='center' style={{width: '120px'}}>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
    
                <Table.Body style={{borderStyle: 'none'}}>{displayData}</Table.Body>
                
            </Table>
        : <div className='mt-4'>Aucun prix de tube à afficher.</div>
    
    
    
        //Affichage message erreur
        const displayError = errorMsg !== '' && 
        <Container>
            <AlertDanger className='mt-5' errorMsg={errorMsg}/>
        </Container>
      
    
    
        //Affichage des états de la requête GET /prixtubes
        const loaderPrixtubes = listPrixtubes.isLoading
        ? <Loader className='mt-5' loadingMsg='Chargement des prixtubes en cours...'/>
        : listPrixtubes.error !== '' ? displayError : displayTablePrixtubes
            
    
        //fermeture des modals
        const hideModal = () => {
            setOpenModalCreate(false)
            setOpenModalDelete(false)
            setOpenModalEdit(false)
        }
    
        const showModalCreate = () => setOpenModalCreate(true)


        const loaderTypeTubes = listTypetubes.isLoading
        ? <Button className='me-2' disabled><Icon name='plus'/> Prix d'un tube</Button>
        : listTypetubes.error !== '' ? <Button className='me-2' disabled><Icon name='plus'/> Prix d'un tube</Button>
        : <Button className='me-2' onClick={showModalCreate}><Icon name='plus'/> Prix d'un tube</Button>
    
        
        //Modal de creation d'un prixtube
        const displayModalCreate = openModalCreate && <ModalCreatePrixtube hideModal={hideModal}/>
    
    
        //Ouverture du modal et recupération des infos
        const showModalDelete = (prixtubeData) => {
            setPrixtubeDelete({id: prixtubeData.id, marque: prixtubeData.marque})
            setOpenModalDelete(true)
        }
    
    
        const handleDelete = id => {
            setRequestDelete(true)
            dispatch(deletePrixtube(user.token, id))
            setOpenModalDelete(false)
        }
    
    
        //activation du modal de double confirmation
        const displayModalDelete = openModalDelete && 
            <Modal2Confirmation 
                hideModal={hideModal} 
                handleConfirm={() => handleDelete(prixtubeDelete.id)}
                textValue={
                    <p className='text-center'>
                        Êtes-vous sûr de vouloir le supprimer le prixtube <b>{prixtubeDelete.marque}</b> ?
                    </p> 
                }/>
    
    
        //Ouverture du modal et recupération des infos
        const showModalEdit = (prixtubeData) => {
            setPrixtubeEdit({
                id: prixtubeData.id,
                marque: prixtubeData.marque,
                prix: prixtubeData.prix,
                prixMembre: prixtubeData.prixMembre,
                actif: prixtubeData.actif
            })
            setOpenModalEdit(true)
        }
    
    
        //activation du modal de double confirmation
        const displayModalEdit = openModalEdit && 
            <ModalEditPrixtube
                hideModal={hideModal}
                prixtubeData={prixtubeEdit}/>
    
      
        const displayBtnActif = !togglePrixtubeDisable
        ? <Button variant='success' onClick={() => setTogglePrixtubeDisable(true)}><Icon name='eye'/> Afficher inactif</Button>
        : <Button variant='success' onClick={() => setTogglePrixtubeDisable(false)}><Icon name='eye slash'/> Ne plus afficher inactif</Button>
    
    
    
        return (
            <>
                <Container>
                    <main role='main'>
                        <div className='mx-0 my-2 p-2 bg-light border rounded-3'>
                            <Container className='text-center justify-content-center'>
                                <div className='display-6'>Gestion des prix des tubes</div>
                                <hr/>
                                <div className='d-flex justify-content-start'>
                                    {loaderTypeTubes}
                                    {displayBtnActif}
                                </div>
                            </Container>
                        </div>
                        </main>
      
                    {loaderPrixtubes}
                        
                </Container>
    
                {displayModalCreate}  
                {displayModalDelete}
                {displayModalEdit}
            </>
        )
    }

export default PrixTubes