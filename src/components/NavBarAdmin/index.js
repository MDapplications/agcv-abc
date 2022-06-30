import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BtnLogout from '../BtnLogout'


const NavBarAdmin = ({context}) => {

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

                        <Link className='nav-link link-secondary' to=''>Paramètres de la saison</Link>  
                        <Link className='nav-link link-secondary' to='saisons'>Saisons</Link>  
                        <Link className='nav-link link-secondary' to='membres'>Membres</Link>  
                        <Link className='nav-link link-secondary' to='prixtubes'>Prix des tubes</Link>
                        <Link className='nav-link link-secondary' to='/home'>Page principale</Link>
                        
                    </Nav>
                    <BtnLogout/>
                </div>
                
            </Container>
        </Navbar>
    )
}

export default NavBarAdmin