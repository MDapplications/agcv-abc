import React from 'react'
import { Container } from 'react-bootstrap'

const Footer = () => {

    const spanMinSize = {fontSize: '0.75em'}

    return (
        <footer className='footer text-white bg-primary bg-gradient mt-5 d-flex flex-row component-footer d-print-none fixed-bottom'>
            <Container className='p-0 text-start'>
                <span style={spanMinSize}>&copy; Gestion de consommation des volants</span> 
            </Container>
        </footer>
    )
}

export default Footer