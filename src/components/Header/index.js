import React, { useEffect } from 'react'
import { Navbar, Container } from 'react-bootstrap'
import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'


const Header = () => {

    //Redux
    const {token} = useSelector(state => state.user)
    const page = useSelector(state => state.page)


    //Hooks
    const navigate = useNavigate()

    
    //retour page de connexion si absence de compte utilisateur connecté
    useEffect(() => {
        if (page !== ('')) {
            if (token === '') {
                console.log("perte du jeton d'authentification ou déconnexion.")
                navigate('/')
            }
        }
    }, [token, navigate, page])


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