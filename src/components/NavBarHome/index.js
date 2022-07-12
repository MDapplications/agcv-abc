import React from 'react'
import { Container, Nav, Navbar, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BtnLogout from '../BtnLogout'
import './index.css'

const NavBarHome = () => {
    
    //Redux
    const {username, role} = useSelector(state => state.user)
    const page = useSelector(state => state.page)


    //Style
    const navBarColor = {
        backgroundColor: '#bbbbbb'
    }


    const displayNav = page === 'home' 
    ? page === 'histoSaison' 
        ? null 
        : <Link id='a-home' className='nav-link link-secondary align-middle' to='/histoSaison'>Historiques des saisons</Link>
    : <Link id='back-home' className='nav-link link-secondary align-middle' to='/home'>Page principale</Link>
    
    
    const displayLinkAdmin = role > 1 && <Link id='go-admin' className='nav-link link-secondary align-middle' to='/admin'>Admin</Link>


    //render
    return (
        <Navbar variant='light' expand className='py-sm-0' style={navBarColor}>
            <Container fluid>

                <div>{username}</div>

                <div className='d-flex justify-content-end'>
                    <Nav className='me-5'>    
                        {displayNav}
                        {displayLinkAdmin}
                    </Nav>
                    <BtnLogout/>
                </div>
                
            </Container>
        </Navbar>
    )
}

export default NavBarHome