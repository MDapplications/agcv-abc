import React, { useEffect, useState } from 'react'
import { Alert, Button, Container, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import { refreshAllCommandes } from '../../Redux/actions/commandes'
import { refreshAllMembres } from '../../Redux/actions/membres'
import Loader from '../Loader'
import ModalCreateCommande from '../ModalCreateCommande'


const Commandes = () => {

    //Hooks
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { idSaison } = useParams()

    //Redux
    const {token} = useSelector(state => state.user)
    const {commandes, isGetSuccess, isLoading, error} = useSelector(state => state.commandes)

    //States
    const [loadCommandes, setloadCommandes] = useState(false)
    const [showError, setShowError] = useState(false)
    const [openModalCreate, setOpenModalCreate] = useState(false)


    useEffect(() => {
    if (token !== '') {
        dispatch(refreshAllCommandes(token, idSaison))
        dispatch(refreshAllMembres(token))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, idSaison])

    useEffect(() => {if (isGetSuccess && !isLoading) setloadCommandes(true)}, [isGetSuccess, isLoading])
    useEffect(() => {if (!isLoading && error !== '') setShowError(true)}, [error, isLoading])

    const handleBack = () => navigate(-1)


    const hideModal = () => setOpenModalCreate(false)
    const showModalCreate = () => setOpenModalCreate(true)


    const displayModalCreate = openModalCreate && <ModalCreateCommande idSaison={idSaison} hideModal={hideModal}/>


    const displaylistCommandes = !showError && !loadCommandes
    ? <Loader/>
    : loadCommandes && !showError
        ? commandes.length === 0 
            ? <p>Aucune commande pour cette saison.</p>
            : <p>Il y a des commandes à afficher ici bordel !!!</p>
        : <Alert variant='danger'>{error}</Alert>

    //render
    return (
        <>
            <div>
                <Navbar variant='light' style={{backgroundColor: '#bbbbbb'}}>
                    <Button variant='success' className='mx-4' onClick={handleBack}>Retour</Button>
                    <Button className='me-2' onClick={showModalCreate}><Icon name='plus'/> Commande</Button>
                </Navbar>
                
                <Container className='mt-3 mb-5'>
                    {displaylistCommandes}
                </Container>
            </div>

            {displayModalCreate}
        </>
        
    )
}

export default Commandes