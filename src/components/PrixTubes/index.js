import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Icon, Popup, Table as TableSUI} from 'semantic-ui-react'
import { getPage } from '../../Redux/actions/pages'
import { deletePrixtube, getAllPrixtubes, refreshAllPrixtubes } from '../../Redux/actions/prixtubes'
import { getAllTypetubes } from '../../Redux/actions/typetubes'
import AlertDanger from '../AlertDanger'
import Loader from '../Loader'
import Modal2Confirmation from '../Modal2Confirmation'
import ModalCreatePrixtube from '../ModalCreatePrixtube'
import ModalEditPrixtube from '../ModalEditPrixtube'
import { prixtubes as header } from '../../data/headers'
import './index.css'
import Table from '../Table'


const PrixTubes = () => {

        //Hooks
        const dispatch = useDispatch()


        //Redux
        const {token, role} = useSelector(state => state.user)
        const page = useSelector(state => state.page)
        const {prixtubes, isDeleteSuccess, isGetSuccess, error, errorDelete, isLoading} = useSelector(state => state.prixtubes)
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
            if (page !== 'prixtubes') dispatch(getPage('prixtubes'))
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [page])
            
        useEffect(() => {
            if (!isLoading && !isGetSuccess && error === '') {
                dispatch(getAllPrixtubes(token))
                dispatch(getAllTypetubes(token))
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isLoading, isGetSuccess, error, token])
    
        useEffect(() => {
            if (!isLoading && error !== '') {
                setErrorMsg(error)
            }
        }, [error, isLoading])

        useEffect(() => {
            if (!listTypetubes.isLoading && listTypetubes.error !== '') {
                setErrorMsg(listTypetubes.error)
            }
        }, [listTypetubes])
    
        useEffect(() => {
            if (isDeleteSuccess) {
                if (errorDelete !== '') {
                    setRequestDelete(false)
                    setErrorMsg(errorDelete)
                }
            }
        }, [isDeleteSuccess, errorDelete])
    
        useEffect(() => {
            if (requestDelete) {
                setRequestDelete(false)
                dispatch(refreshAllPrixtubes(token))
    
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [requestDelete, token])
    
        //Affichage au format prix
        const currencyLocalPrice = prix => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prix)

        const displayBtnDelete = prixtubeData => role > 2 
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
                <TableSUI.Row id='row-prixtubes' key={data.id} active>
                    <TableSUI.Cell id='cell-prixtubes' className='align-middle' textAlign='left'>
                        {data.TypeTube.name + (data.TypeTube.comment ? ` (${data.TypeTube.comment})` : '')}
                    </TableSUI.Cell>
                    <TableSUI.Cell id='cell-prixtubes' className='align-middle'>{data.marque}</TableSUI.Cell>
                    <TableSUI.Cell id='cell-prixtubes' className='align-middle' textAlign='center'>{currencyLocalPrice(data.prix)}</TableSUI.Cell>
                    <TableSUI.Cell id='cell-prixtubes' className='align-middle' textAlign='center'>{currencyLocalPrice(data.prixMembre)}</TableSUI.Cell>
                    <TableSUI.Cell id='cell-prixtubes' className='align-middle' textAlign='center'>{new Date(data.horodatage).toLocaleString()}</TableSUI.Cell>
                    <TableSUI.Cell id='cell-prixtubes' className='align-middle' textAlign='center'>{displayBoolean(data.actif)}</TableSUI.Cell>
                    <TableSUI.Cell id='cell-prixtubes' className='align-middle' textAlign='center'>{displayAction(data)}</TableSUI.Cell>
                </TableSUI.Row>
            )
        }


        //Affichage de la liste des prixtubes (data)
        const displayData = prixtubes.map(prixtubeData => (togglePrixtubeDisable === false) 
            ? prixtubeData.actif
                ? displayTableRow(prixtubeData)
                : null
            : displayTableRow(prixtubeData)
        )
    
    
    
        //Affichage de la liste des prixtubes (en-tête)
        const displayTablePrixtubes = prixtubes.length !== 0
        ?   <Table 
                table={{className: 'mt-4 me-5', color: 'blue'}}
                body={{style: {borderStyle: 'none'}}}
                header={header}
                displayData={displayData}/>
        : <div className='mt-4'>Aucun prix de tube à afficher.</div>
    
    
    
        //Affichage message erreur
        const displayError = errorMsg !== '' && 
        <Container>
            <AlertDanger className='mt-5' errorMsg={errorMsg}/>
        </Container>
      
    
    
        //Affichage des états de la requête GET /prixtubes
        const loaderPrixtubes = isLoading
        ? <Loader className='mt-5' loadingMsg='Chargement des prixtubes en cours...'/>
        : errorMsg !== '' ? displayError : displayTablePrixtubes
            
    
        //fermeture des modals
        const hideModal = () => {
            setOpenModalCreate(false)
            setOpenModalDelete(false)
            setOpenModalEdit(false)
        }
    
        const showModalCreate = () => setOpenModalCreate(true)


        const loaderTypeTubes = listTypetubes.isLoading
        ? <Button className='me-2' disabled><Icon name='plus'/> Prix d'un tube</Button>
        : errorMsg !== '' ? <Button className='me-2' disabled><Icon name='plus'/> Prix d'un tube</Button>
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
            dispatch(deletePrixtube(token, id))
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