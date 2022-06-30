import React from 'react'
import { Navbar, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <Navbar bg="primary" className='d-print-none'>
            <Container fluid>
                <Navbar.Brand>
                    <Link to='/home' className='text-decoration-none text-white'>
                        Gestion de consommation des volants
                    </Link>
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default Header