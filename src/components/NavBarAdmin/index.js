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


    const displayLinkSuperAdmin = role > 2 && <Link id='super-admin' className='nav-link link-secondary' to='/superAdmin'>Super Admin</Link>

    //render
    return (
        <Navbar variant='light' expand className='py-sm-0' style={navBarColor}>
            <Container fluid>
                
                <div className='d-flex justify-content-start'>
                    <div className='py-2 pe-5'>{username}</div>
                    {displayLinkSuperAdmin}
                </div>

                <div className='d-flex justify-content-end'>
                    <Nav className='me-5'> 

                        <Link id='a-admin' className='nav-link link-secondary' to=''>Paramètres de la saison</Link>  
                        <Link id='a-admin' className='nav-link link-secondary' to='saisons'>Saisons</Link>  
                        <Link id='a-admin' className='nav-link link-secondary' to='membres'>Membres</Link>  
                        <Link id='a-admin' className='nav-link link-secondary' to='prixtubes'>Prix des tubes</Link>
                        <Link id='back-home' className='nav-link link-secondary' to='/home'>Page principale</Link>
                        
                    </Nav>
                    <BtnLogout/>
                </div>
                
            </Container>
        </Navbar>
    )
}

export default NavBarAdmin