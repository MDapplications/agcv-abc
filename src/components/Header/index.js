import React, { useEffect } from 'react'
import { Navbar, Container } from 'react-bootstrap'
import { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { initCommandes } from '../../Redux/actions/commandes'
import { initCompetitions } from '../../Redux/actions/competitions'
import { initConsoMois } from '../../Redux/actions/consomois'
import { initConsoVolants } from '../../Redux/actions/consovolants'
import { initMembres } from '../../Redux/actions/membres'
import { initPrixtubes } from '../../Redux/actions/prixtubes'
import { initRestocks } from '../../Redux/actions/restocks'
import { initSaisons } from '../../Redux/actions/saisons'
import { initTypetubes } from '../../Redux/actions/typetubes'
import { initUser } from '../../Redux/actions/user'
import { initUsers } from '../../Redux/actions/users'


const Header = () => {

    //Redux
    const {id, token} = useSelector(state => state.user)
    const page = useSelector(state => state.page)


    //Hooks
    const navigate = useNavigate()
    const dispatch = useDispatch()

    
    //retour page de connexion si absence de compte utilisateur connecté
    useEffect(() => {
        if (page !== '' && token === '' && id === 0) {
            console.log("perte du jeton d'authentification ou déconnexion.")
            dispatch(initUser())
            dispatch(initUsers())
            dispatch(initTypetubes())
            dispatch(initPrixtubes())
            dispatch(initMembres())
            dispatch(initSaisons())
            dispatch(initConsoVolants())
            dispatch(initConsoMois())
            dispatch(initRestocks())
            dispatch(initCommandes())
            dispatch(initCompetitions())
            navigate('/')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, page])


    //render
    return (
        <>
            <Navbar bg="primary" className='d-print-none'>
                <Container fluid>
                    <Navbar.Brand>
                        <Link to='/home' className='text-decoration-none text-white'>
                            Gestion de consommation des volants
                        </Link>
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <Toaster position="top-center" reverseOrder={false}/>
        </>   
    )
}

export default Header