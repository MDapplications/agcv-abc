import React from 'react'
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BtnLogout from '../BtnLogout'
import './index.css'


const NavBarAdmin = ({showModalChangePassword}) => {

    //Redux
    const {username, role} = useSelector(state => state.user)

    //Style
    const navBarColor = {
        backgroundColor: 'rgb(80, 80, 80)',
    }

    const styleLink = {
        fontSize: '1.3em',
        color: 'white'
    }

    const expand = 'xl'

    const displayLinkUsers = role > 2 && <Link  id='a-admin' 
                                                className='nav-link link-secondary' 
                                                to='users'
                                                style={styleLink}>
                                                    Gestion des utilisateurs
                                                </Link> 

    //render
    return (
        <Navbar variant='dark' expand={expand} className='py-sm-0' style={navBarColor}>
            <Container fluid>
                
                <div className='d-flex justify-content-start'>
                    <div id='a-admin' className='py-2 nav-link link-dark' onClick={showModalChangePassword} style={styleLink}>{username}</div>
                </div>

                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="end">

                        <Offcanvas.Body className='justify-content-end'>
                            
                            <Nav className='me-5'> 

                                <Link id='a-admin' className='nav-link link-secondary' to='' style={styleLink}>Paramètres de la saison</Link>
                                {displayLinkUsers}
                                <Link id='a-admin' className='nav-link link-secondary' to='saisons' style={styleLink}>Saisons</Link>  
                                <Link id='a-admin' className='nav-link link-secondary' to='membres' style={styleLink}>Membres</Link>  
                                <Link id='a-admin' className='nav-link link-secondary' to='prixtubes' style={styleLink}>Prix des tubes</Link>
                                <Link id='a-admin' className='nav-link link-secondary' to='typetubes' style={styleLink}>Types de tube</Link>
                                
                                <Link id='back-home' className='nav-link link-secondary' to='/home' style={styleLink}>Page principale</Link>

                            </Nav>
                            <BtnLogout/>

                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                
            </Container>
        </Navbar>
    )
}

export default NavBarAdmin