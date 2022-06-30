import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BtnLogout from '../BtnLogout'

const NavBarHome = ({context}) => {
    
    //Redux
    const user = useSelector(state => state.user)


    //Style
    const navBarColor = {
        backgroundColor: '#bbbbbb'
    }


    const {username} = user
    

    const displayNav = context === 'home' 
    ? context === 'histoSaison' 
        ? null 
        : <Link className='nav-link link-secondary' to='/histoSaison'>Historiques des saisons</Link>
    : <Link className='nav-link link-secondary' to='/home'>Saison actuelle</Link>
    
    

    //render
    return (
        <Navbar variant='light' expand className='py-sm-0' style={navBarColor}>
            <Container fluid>

                <div>{username}</div>

                <div className='d-flex justify-content-end'>
                    <Nav className='me-5'>    
                        {displayNav}
                        <Link className='nav-link link-secondary' to='/admin'>Admin</Link>
                    </Nav>
                    <BtnLogout/>
                </div>
                
            </Container>
        </Navbar>
    )
}

export default NavBarHome