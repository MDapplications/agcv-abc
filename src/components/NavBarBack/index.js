import React from 'react'
import { Button, Navbar } from 'react-bootstrap'

const NavBarBack = ({handleBack}) => {
    return (
        <Navbar variant='light' style={{backgroundColor: '#bbbbbb'}}>
            <Button variant='success' className='mx-4' onClick={handleBack}>Retour</Button>
        </Navbar>
    )
}

export default NavBarBack
