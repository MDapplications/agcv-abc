import React from 'react'
import { Link } from 'react-router-dom'

const ForgetPassword = () => {
    return (
        <>
            <div className='mt-5 display-4'>CHEH !</div>
            <div className='mt-2 display-6'>Bah fallait pas l'oublier, tant pis pour vous.</div>
            <div className='d-flex justify-content-center mt-5'>
                <Link to='/' className='link-secondary' style={{textDecoration: 'none'}}>Revenir sur la page de connexion.</Link>
            </div>
        </>
    )
}

export default ForgetPassword