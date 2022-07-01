import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BtnLogout from '../BtnLogout'

const NavBarSuperAdmin = () => {

    //Redux
    const {username} = useSelector(state => state.user)

    //Style
    const navBarColor = {
        backgroundColor: '#bbbbbb'
    }

    return (
        <Navbar variant='light' expand className='py-sm-0' style={navBarColor}>
            <Container fluid>

                <div>{username}</div>

                <div className='d-flex justify-content-end'>
                    <Nav className='me-5'> 

                        <Link className='nav-link link-secondary' to=''>Aperçu global</Link>  
                        <Link className='nav-link link-secondary' to='users'>Utilisateurs</Link>  
                        <Link className='nav-link link-secondary' to='typetubes'>TypeTubes</Link>  
                        <Link className='nav-link link-secondary' to='/admin'>Retour Admin</Link>
                        <Link className='nav-link link-secondary' to='/home'>Page principale</Link>
                        
                    </Nav>
                    <BtnLogout/>
                </div>
                
            </Container>
        </Navbar>
    )
}

export default NavBarSuperAdmin