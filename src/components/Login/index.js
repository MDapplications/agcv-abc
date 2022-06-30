import React, { useState } from 'react'
import {Container, Card, Form, Row, Button, Alert} from 'react-bootstrap'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../Redux/actions/user'


const Login = () => {
    
    //Redux
    const user = useSelector(state => state.user)

    //Hooks
    const navigate = useNavigate()
    const dispatch = useDispatch()

    //Constantes
    const data = {
        username: '',
        password: ''
    }
    const errorData = {code: 0, message: '', enabled: false}
    const {REACT_APP_AGCV_API_URL} = process.env
   


    //States
    const [loginData, setLoginData] = useState(data)
    const [errorAlert, setErrorAlert] = useState(errorData)


    const { username, password } = loginData
    
    
     
    
    const handleChange = event => setLoginData({...loginData, [event.target.id]: event.target.value})



    const handleSubmit = e => {
        e.preventDefault()

        axios.post(
            `${REACT_APP_AGCV_API_URL}/login`,
            {   
                username, 
                password
            },
            { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
            //console.log(res)
            setErrorAlert(errorData)
            const dataUser = {
                username: res.data.data.username,
                token: res.data.token
            }
            dispatch(getUser(dataUser))
            navigate("/home")
            setLoginData(data)
        })
        .catch(err => {
            setErrorAlert({code: err.response.status, message: err.response.data.message, enabled: true})
            setLoginData(data)
        })

    }




    const btnConnexion =  username === '' || 
    password === ''
    ? <Button className='mb-4' variant='primary' disabled>Se connecter</Button>
    : <Button className='mb-4' variant='primary' as='input' type='submit' value="Se connecter"/>



    const alertMessage = errorAlert.enabled ?
    <Alert key='danger' variant='danger'>
        {errorAlert.message}
    </Alert>
    : null


    //render
    return (
        <Container className='mt-4 d-flex justify-content-center'>
            <Card style={{ width: '30rem' }}>
                <Card.Header>
                    <h4 className='mt-2'>Connexion</h4>
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

                        </Form.Group>

                        {btnConnexion}

                    </Form>
                </Card.Body>
                <Card.Footer>
                    <Button variant='success' onClick={() => navigate('/signup')}>
                        Créer un nouveau compte
                    </Button>
                </Card.Footer>
            </Card>
            
        </Container>
    )
}

export default Login