import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
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

    const displayLinkAdmin = role > 1 && <Link id='go-admin' className='nav-link link-secondary align-middle' to='/admin'>Admin</Link>

    //render
    return (
        <Navbar variant='light' expand className='py-sm-0' style={navBarColor}>
            <Container fluid>

                <div id='a-home' className='py-2 nav-link link-dark align-middle' onClick={showModalChangePassword}>{username}</div>

                <div className='d-flex justify-content-end'>
                    <Nav className='me-5'>    
                        {displayLinkAdmin}
                    </Nav>
                    <BtnLogout/>
                </div>
                
            </Container>
        </Navbar>
    )
}

export default NavBarHome