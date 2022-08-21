import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BtnLogout from '../BtnLogout'
import './index.css'


const NavBarAdmin = () => {

    //Redux
    const {username, role} = useSelector(state => state.user)

    //Style
    const navBarColor = {
        backgroundColor: '#bbbbbb'
    }

    const displayLinkUsers = role > 2 && <Link id='a-admin' className='nav-link link-secondary' to='users'>Gestion des utilisateurs</Link> 

    //render
    return (
        <Navbar variant='light' expand className='py-sm-0' style={navBarColor}>
            <Container fluid>
                
                <div className='d-flex justify-content-start'>
                    <div className='py-2 pe-5'>{username}</div>
                </div>

                <div className='d-flex justify-content-end'>
                    <Nav className='me-5'> 

                        <Link id='a-admin' className='nav-link link-secondary' to=''>Paramètres de la saison</Link>
                        {displayLinkUsers}
                        <Link id='a-admin' className='nav-link link-secondary' to='saisons'>Saisons</Link>  
                        <Link id='a-admin' className='nav-link link-secondary' to='membres'>Membres</Link>  
                        <Link id='a-admin' className='nav-link link-secondary' to='prixtubes'>Prix des tubes</Link>
                        <Link id='a-admin' className='nav-link link-secondary' to='typetubes'>TypeTubes</Link>
                         
                        <Link id='back-home' className='nav-link link-secondary' to='/home'>Page principale</Link>
                        
                    </Nav>
                    <BtnLogout/>
                </div>
                
            </Container>
        </Navbar>
    )
}

export default NavBarAdmin