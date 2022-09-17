import React from 'react'
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BtnLogout from '../BtnLogout'
import './index.css'

const NavBarHome = ({showModalChangePassword}) => {
    
    //Redux
    const {username, role} = useSelector(state => state.user)

    //Style
    const navBarColor = {
        backgroundColor: '#bbbbbb'
    }

    const expand = 'xl'

    const displayLinkAdmin = role > 1 && <Link  id='go-admin' 
                                                className='nav-link link-secondary align-middle' 
                                                to='/admin'
                                                style={{fontSize: '1.3em'}}>
                                                    Admin
                                            </Link>

    //render
    return (
        <Navbar variant='light' expand={expand} className='py-sm-0' style={navBarColor}>
            <Container fluid>
                    
                <div id='a-home' className='py-2 nav-link link-dark align-middle' onClick={showModalChangePassword} style={{fontSize: '1.3em'}}>
                    {username}
                </div>

                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="end">

                        <Offcanvas.Body className='justify-content-end'>
                            <Nav className='me-5'>    
                                {displayLinkAdmin}
                            </Nav>
                            <BtnLogout/>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                
            </Container>
        </Navbar>
    )
}

export default NavBarHome