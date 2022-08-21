import React, { useEffect, useState } from 'react'
import { Alert, Button, Container, Navbar } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Icon, Popup, Table } from 'semantic-ui-react'
import { deleteCommande, refreshAllCommandes } from '../../Redux/actions/commandes'
import { refreshAllMembres } from '../../Redux/actions/membres'
import { initSaisons } from '../../Redux/actions/saisons'
import { getTypetubesOrderable } from '../../Redux/actions/typetubes'
import Loader from '../Loader'
import Modal2Confirmation from '../Modal2Confirmation'
import ModalCreateCommande from '../ModalCreateCommande'
import ModalEditCommande from '../ModalEditCommande'


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



    useEffect(() => {
    if (token !== '') {
        dispatch(refreshAllCommandes(token, idSaison))
        dispatch(refreshAllMembres(token))
        dispatch(getTypetubesOrderable(token))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, idSaison])

    useEffect(() => {if (isGetSuccess && !isLoading) setloadCommandes(true)}, [isGetSuccess, isLoading])
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


    const displayBoolean = value => value ? <Icon name='check' /> : <Icon name='times' />

    const activeStyleStatus = data => !data.status ? styleStatusFalse : null

    const displayData = commandes.map(data => {
        return (
            <Table.Row id='row-commandes' key={data.id} active={data.status}>
                <Table.Cell className='align-middle' textAlign='center' style={activeStyleStatus(data)}>
                    {new Date(data.horodatage).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell className='align-middle' textAlign='center' style={activeStyleStatus(data)}>
                    {data.Membre.prenom + ' ' + data.Membre.nom}
                </Table.Cell>
                <Table.Cell className='align-middle' textAlign='center' style={activeStyleStatus(data)}>
                    {data.ConsoMoi.name}
                </Table.Cell>
                <Table.Cell className='align-middle' textAlign='center' style={activeStyleStatus(data)}>
                    {data.PrixTube.TypeTube.comment === '' 
                    ? data.PrixTube.TypeTube.name 
                    : data.PrixTube.TypeTube.name + ' - ' + data.PrixTube.TypeTube.comment}
                </Table.Cell>
                <Table.Cell className='align-middle' textAlign='center' style={activeStyleStatus(data)}>
                    {data.PrixTube.marque}
                </Table.Cell>
                <Table.Cell className='align-middle' textAlign='center' style={activeStyleStatus(data)}>
                    {data.nbTubesOrdered}
                </Table.Cell>
                <Table.Cell className='align-middle' textAlign='center' style={activeStyleStatus(data)}>
                    {currencyLocalPrice(data.nbTubesOrdered*data.PrixTube.prixMembre)}
                </Table.Cell>
                <Table.Cell className='align-middle' textAlign='center' style={activeStyleStatus(data)}>
                    {displayBoolean(data.status)}
                </Table.Cell>
                <Table.Cell className='align-middle' textAlign='center' style={activeStyleStatus(data)}>
                    {displayAction(data)}
                </Table.Cell>
            </Table.Row>
        )
    })

    const displayTableCommandes = (
    <Table className='mt-4' color='blue' inverted>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell collapsing textAlign='center' style={{width: '120px'}}>Date</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>Membre</Table.HeaderCell>
                <Table.HeaderCell collapsing textAlign='center' style={{width: '120px'}}>Mois</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>Type du tube</Table.HeaderCell>
                <Table.HeaderCell collapsing textAlign='center' style={{width: '120px'}}>Marque</Table.HeaderCell>
                <Table.HeaderCell collapsing textAlign='center' style={{width: '80px'}}>Nb de tube</Table.HeaderCell>
                <Table.HeaderCell collapsing textAlign='center' style={{width: '80px'}}>Prix</Table.HeaderCell>
                <Table.HeaderCell collapsing textAlign='center' style={{width: '80px'}}>Réglée</Table.HeaderCell>
                <Table.HeaderCell collapsing textAlign='center' style={{width: '120px'}}>Actions</Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body style={{borderStyle: 'none'}}>{displayData}</Table.Body>
    </Table>
    )


    const displaylistCommandes = () => {if (!showError && !loadCommandes) {
        return <Loader/>
    } else if (loadCommandes && !showError) {
        if (commandes.length === 0) {
            return <p className='mt-4'>Aucune commande pour cette saison.</p>
        } else {
            return displayTableCommandes
        }
    } else return <Alert variant='danger'>{error + errorDelete}</Alert>}


    const displaySaisonActive = enableActions && <> 
        <hr/>
        <div className='d-flex justify-content-start'>
            <Button className='me-2' onClick={showModalCreate}><Icon name='plus'/> Commande</Button>
        </div>
    </>


    //render
    return (
        <>
            <div>
                <Navbar variant='light' style={{backgroundColor: '#bbbbbb'}}>
                    <Button variant='success' className='mx-4' onClick={handleBack}>Retour</Button>
                </Navbar>
                
                <Container className='mt-3 mb-5'>
                    <main role='main'>
                        <div className='mx-0 my-2 p-2 bg-light border rounded-3'>
                            <Container className='text-center justify-content-center'>
                                <div className='display-6'>
                                    Commandes de la saison : {saisonSelect.anneeDebut + ' - ' + saisonSelect.anneeFin}
                                </div>
                                {displaySaisonActive}
                            </Container>
                        </div>
                    </main>

                    {displaylistCommandes()}

                </Container>
            </div>

            {displayModalCreate}
            {displayModalDelete}
            {displayModalEdit}
        </>
        
    )
}

export default Commandes