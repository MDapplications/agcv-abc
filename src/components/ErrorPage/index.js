import React from 'react'
import {useNavigate} from 'react-router-dom'
import { Container } from 'react-bootstrap'

const ErrorPage = () => {

    //Hooks
    const navigate = useNavigate()

    //redirection au bout de 3sec
    setTimeout(() => {
      navigate('/home')
    }, 3000)

    //render
    return (
        <Container className='mt-3 component-center'>
            <h2>Vous êtes perdu ?</h2>

            <div className="alert alert-warning mt-3" role="alert">
              <strong>Oups !</strong> Cette page n'existe pas ! Redirection dans 3sec.
            </div>
        </Container>
    )
}

export default ErrorPage