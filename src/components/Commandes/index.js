import React, { useEffect, useState } from 'react'
import { Alert, Button, Container, Form } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Icon, Popup, Table as TableSUI } from 'semantic-ui-react'
import { deleteCommande, refreshAllCommandes } from '../../Redux/actions/commandes'
import { refreshAllMembres } from '../../Redux/actions/membres'
import { initSaisons } from '../../Redux/actions/saisons'
import { getTypetubesOrderable } from '../../Redux/actions/typetubes'
import Loader from '../Loader'
import Modal2Confirmation from '../Modal2Confirmation'
import ModalCreateCommande from '../ModalCreateCommande'
import ModalEditCommande from '../ModalEditCommande'
import NavBarBack from '../NavBarBack'
import { commandes as header } from '../../data/headers'
import Table from '../Table'


const Commandes = () => {

    const { idSaison } = useParams()

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

    const styleStatusFalse = {
        backgroundColor: '#db2828',
    }

    const initSaison = {id: Number(idSaison)}

    //Hooks
    const navigate = useNavigate()
    const dispatch = useDispatch()

    //Redux
    const {token, role} = useSelector(state => state.user)
    const {saisonActive, saisons} = useSelector(state => state.saisons)
    const {commandes, isGetSuccess, isLoading, isDeleteSuccess, errorDelete, error} = useSelector(state => state.commandes)

    //States
    const [loadCommandes, setloadCommandes] = useState(false)
    const [saisonSelect, setSaisonSelect] = useState(initSaison)
    const [showError, setShowError] = useState(false)
    const [enableActions, setEnableActions] = useState(false)
    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [requestDelete, setRequestDelete] = useState(false)
    const [commandeDelete, setCommandeDelete] = useState({})
    const [commandeEdit, setCommandeEdit] = useState({})
    const [listMembres, setlistMembres] = useState([])
    const [idMembreOrder, setidMembreOrder] = useState(0)


    useEffect(() => {
    if (token !== '' && saisonSelect.id > 0) {
        dispatch(refreshAllCommandes(token, idSaison))
        dispatch(refreshAllMembres(token))
        dispatch(getTypetubesOrderable(token))
        setloadCommandes(false)
        setlistMembres([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, idSaison, saisonSelect])

    useEffect(() => {
        if (isGetSuccess && !isLoading && !loadCommandes) {
            let lsMembres = [{id: 0, name: "Voir toutes les commandes"}]            
            if (commandes.length > 0) {
                commandes.forEach(order => {
                    let unique = true
                    lsMembres.forEach(membre => {
                        if (membre.id === order.Membre.id) {
                            unique = false
                        }
                    })
                    if (unique) lsMembres.push({id: order.Membre.id, name: order.Membre.prenom + ' ' + order.Membre.nom})
                }) 
            }
            setloadCommandes(true)
            setlistMembres(lsMembres)
        }
    }, [isGetSuccess, isLoading, loadCommandes, commandes, listMembres, saisonSelect, idSaison])
    
    useEffect(() => {if (!isLoading && error !== '') setShowError(true)}, [error, isLoading])
    useEffect(() => {if (saisonActive.id === Number(idSaison)) {
            setEnableActions(true)
            setSaisonSelect(saisonActive)
        } else {
            if (saisons.length > 0) {
                const dataFilter = saisons.filter(data => data.id === Number(idSaison))
                if (dataFilter.length > 0) {
                    setSaisonSelect(dataFilter[0])
                }
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [saisonActive.id, idSaison])

    useEffect(() => {
        if (requestDelete && errorDelete !== '') {
            setRequestDelete(false)
            setShowError(true)
        }
    }, [requestDelete, errorDelete])

    useEffect(() => {
        if (isDeleteSuccess && requestDelete) {
            setRequestDelete(false)
            dispatch(refreshAllCommandes(token, idSaison))

            toast.success("Suppression de la commande réalisé avec succès !",
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
    }, [isDeleteSuccess, requestDelete, token, idSaison])



    
    const handleBack = () => {
        if (saisonSelect.id === initSaison.id) {
            dispatch(initSaisons())
        }
        navigate(-1)
    }

    //Affichage au format prix
    const currencyLocalPrice = prix => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prix)


    const hideModal = () => {
        setOpenModalCreate(false)
        setOpenModalDelete(false)
        setOpenModalEdit(false)
    }

    const showModalCreate = () => setOpenModalCreate(true)
    const displayModalCreate = openModalCreate && <ModalCreateCommande idSaison={Number(idSaison)} hideModal={hideModal}/>


    const handleDelete = id => {
        setRequestDelete(true)
        dispatch(deleteCommande(token, id))
        setOpenModalDelete(false)
    }

    const showModalDelete = commandeData => {
        setCommandeDelete({
            id: commandeData.id,
            membre: commandeData.Membre.prenom + ' ' + commandeData.Membre.nom,
            prix: commandeData.nbTubesOrdered*commandeData.PrixTube.prixMembre
        })
        setOpenModalDelete(true)
    }

    //activation du modal de double confirmation
    const displayModalDelete = openModalDelete && 
    <Modal2Confirmation 
        hideModal={hideModal} 
        handleConfirm={() => handleDelete(commandeDelete.id)}
        textValue={
            <p className='text-center'>
                Êtes-vous sûr de vouloir supprimer la commande de <b>{commandeDelete.membre}</b> d'un montant de {currencyLocalPrice(commandeDelete.prix)}?
            </p> 
        }/>

    //Ouverture du modal et recupération des infos
    const showModalEdit = commandeData => {
        setCommandeEdit({
            id: commandeData.id,
            nbTubesOrdered: commandeData.nbTubesOrdered,
            status: commandeData.status
        })
        setOpenModalEdit(true)
    }

    const displayModalEdit = openModalEdit && 
        <ModalEditCommande
            hideModal={hideModal}
            commandeData={commandeEdit}
            idSaison={idSaison}/>


    const displayBtnDelete = commandeData => role > 2 
        ? <Popup
            trigger={
                <Button 
                    variant="danger"
                    disabled={!enableActions}
                    onClick={() => showModalDelete(commandeData)}>
                        <Icon name='trash'/>
                </Button>
            }
            style={stylePopupDelete}
            content={`Supprimer`}/>
        : null

    //Bontons action
    const displayAction = commandeData => {
        return (
            <>
                <Popup
                    trigger={
                        <Button 
                            className='me-2' 
                            variant="primary"
                            disabled={!enableActions}
                            onClick={() => showModalEdit(commandeData)}>
                                <Icon name='edit'/>
                        </Button>
                    }
                    style={stylePopupEdit}
                    content={`Modifier`}
                />
                {displayBtnDelete(commandeData)}      
            </>
        )
    }

    const optionSelectMembre = listeMembres => listeMembres.length > 0 && listeMembres.map(membre => 
        <option 
            key={membre.id} 
            value={membre.id}>
                {membre.name}
        </option>
    )

    const handleMembre = event => setidMembreOrder(Number(event.target.value))

    const displayBoolean = value => value ? <Icon name='check' /> : <Icon name='times' />

    const activeStyleStatus = data => !data.status ? styleStatusFalse : null
        
    const dataTableRow = data => (
        <TableSUI.Row id='row-commandes' key={data.id} active={data.status}>
                    <TableSUI.Cell className='align-middle' textAlign='center' style={activeStyleStatus(data)}>
                        {new Date(data.horodatage).toLocaleDateString()}
                    </TableSUI.Cell>
                    <TableSUI.Cell className='align-middle' textAlign='center' style={activeStyleStatus(data)}>
                        {data.Membre.prenom + ' ' + data.Membre.nom}
                    </TableSUI.Cell>
                    <TableSUI.Cell className='align-middle' textAlign='center' style={activeStyleStatus(data)}>
                        {data.ConsoMoi.name}
                    </TableSUI.Cell>
                    <TableSUI.Cell className='align-middle' textAlign='center' style={activeStyleStatus(data)}>
                        {data.PrixTube.TypeTube.comment === '' 
                        ? data.PrixTube.TypeTube.name 
                        : data.PrixTube.TypeTube.name + ' - ' + data.PrixTube.TypeTube.comment}
                    </TableSUI.Cell>
                    <TableSUI.Cell className='align-middle' textAlign='center' style={activeStyleStatus(data)}>
                        {data.PrixTube.marque}
                    </TableSUI.Cell>
                    <TableSUI.Cell className='align-middle' textAlign='center' style={activeStyleStatus(data)}>
                        {data.nbTubesOrdered}
                    </TableSUI.Cell>
                    <TableSUI.Cell className='align-middle' textAlign='center' style={activeStyleStatus(data)}>
                        {currencyLocalPrice(data.nbTubesOrdered*data.PrixTube.prixMembre)}
                    </TableSUI.Cell>
                    <TableSUI.Cell className='align-middle' textAlign='center' style={activeStyleStatus(data)}>
                        {displayBoolean(data.status)}
                    </TableSUI.Cell>
                    <TableSUI.Cell className='align-middle' textAlign='center' style={activeStyleStatus(data)}>
                        {displayAction(data)}
                    </TableSUI.Cell>
                </TableSUI.Row>
    )

    const displayData = commandes.map(data => {
        if (idMembreOrder === 0) {
            return dataTableRow(data)
        } else {
            if (idMembreOrder === data.Membre.id) {
                return dataTableRow(data)
            } else {return null}
        }
    })
    
    const displayTableCommandes = (
        <Table 
            table={{className: 'mt-4', color: 'blue'}}
            body={{style: {borderStyle: 'none'}}}
            header={header}
            displayData={displayData}/>
    )


    const displaylistCommandes = !showError && !loadCommandes
    ? <Loader className='mt-5' loadingMsg='Chargement des commandes en cours...'/>
    : loadCommandes && !showError
        ? commandes.length === 0
            ? <p className='mt-4'>Aucune commande pour cette saison.</p>
            : displayTableCommandes
        : <Alert variant='danger'>{error + errorDelete}</Alert>


    const displaySaisonActive = enableActions &&    
    <Button className='me-4' onClick={showModalCreate}>
        <Icon name='plus'/> Commande
    </Button>

    const displaySelectMembre = loadCommandes && listMembres.length > 0 
    ? <span className='d-flex justify-content-start align-middle'>
        <Form.Label className='mt-2 me-2' style={{width: '60px'}}>Filtre :</Form.Label>
        <Form.Select 
            aria-label="Selection d'un membre" 
            defaultValue='0'
            onChange={handleMembre}>
                {optionSelectMembre(listMembres)}
        </Form.Select>
    </span>
    : <Loader isMsg={false}/>


    //render
    return (
        <>
            <div>
                <NavBarBack handleBack={handleBack}/>
                
                <Container className='mt-3 mb-5'>
                    <main role='main'>
                        <div className='mx-0 my-2 p-2 bg-light border rounded-3'>
                            <Container className='text-center justify-content-center'>
                                <div className='display-6'>
                                    Commandes de la saison : {saisonSelect.anneeDebut + ' - ' + saisonSelect.anneeFin}
                                </div>
                                <hr/>
                                <div className='d-flex justify-content-start'>
                                    {displaySaisonActive}
                                    {displaySelectMembre}
                                </div>
                            </Container>
                        </div>
                    </main>

                    {displaylistCommandes}

                </Container>
            </div>

            {displayModalCreate}
            {displayModalDelete}
            {displayModalEdit}
        </>
        
    )
}

export default Commandes