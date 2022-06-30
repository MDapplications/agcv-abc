import React, { useState } from 'react'
import {Container, Card, Form, Row, Button, Alert} from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'

const SignUp = () => {

    const data = {
        username: '',
        password: '',
        confirmPassword: ''
    }
    const errorData = {code: 0, message: '', enabled: false}
    const {REACT_APP_AGCV_API_URL} = process.env
   


    //States
    const [loginData, setLoginData] = useState(data)
    const [errorAlert, setErrorAlert] = useState(errorData)


    const { username, password, confirmPassword } = loginData




    const handleChange = event => setLoginData({...loginData, [event.target.id]: event.target.value})




    const handleSubmit = e => {
        e.preventDefault()

        axios.post(
            `${REACT_APP_AGCV_API_URL}/users`,
            {   
                username, 
                password,
                role: 1,
                actif: true
            },
            { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
            console.log(res)
            setErrorAlert(errorData)
        })
        .catch(err => {
            //console.log(err)
            setErrorAlert({code: err.response.status, message: err.response.data.message, enabled: true})
        })
    }




    const alertMessage = errorAlert.enabled ?
    <Alert key='danger' variant='danger'>
        <div>
            <span className='text-decoration-underline'>Code erreur:</span><span> {errorAlert.code}</span>
        </div>
        <div>{errorAlert.message}</div>
    </Alert>
    : null



    
    const btnInscription =  username === '' || 
                            password === '' || 
                            password !== confirmPassword 
    ? <Button variant='success' disabled>S'inscrire</Button>
    : <Button variant='success' as='input' type='submit' value="S'inscrire"/>





    //render
    return (
        <Container className='mt-4 d-flex justify-content-center'>
            <Card style={{ width: '30rem' }}>
                <Card.Header>
                    <h4 className='mt-2'>Inscription</h4>
                </Card.Header>

                <Card.Body>

                    {alertMessage}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} className='mb-3 mx-3'>
                            <Form.Control 
                                id='username' 
                                className='mb-3' 
                                placeholder='identifiant' 
                                value={username}
                                onChange={handleChange}/>

                            <Form.Control 
                                id='password' 
                                className='mb-3' 
                                type='password' 
                                placeholder='Mot de passe' 
                                value={password}
                                onChange={handleChange}/>

                            <Form.Control 
                                id='confirmPassword' 
                                className='mb-3' 
                                type='password' 
                                placeholder='Confirmer mot de passe' 
                                value={confirmPassword}
                                onChange={handleChange}/>

                        </Form.Group>

                        {btnInscription}

                        <div className='d-flex justify-content-center mt-3'>
                            <Link to='/' className='link-secondary' style={{textDecoration: 'none'}}>
                                J'ai déjà un compte
                            </Link>
                        </div>

                    </Form>
                </Card.Body>
            </Card>
            
        </Container>
    )
}

export default SignUp