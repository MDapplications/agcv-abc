import React, { useEffect, useState } from 'react'
import {Container, Card, Form, Row, Button} from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getUser } from '../../Redux/actions/user'
import AlertDanger from '../AlertDanger'
import toast from 'react-hot-toast'
import { initPage } from '../../Redux/actions/pages'
import { initStocks } from '../../Redux/actions/stocks'


const Login = () => {

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
    

    useEffect(() => {
        dispatch(initPage())
    }, [dispatch])
     
    
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
                id: res.data.data.id,
                username: res.data.data.username,
                role: res.data.data.role,
                token: res.data.token
            }
            dispatch(getUser(dataUser))
            dispatch(initStocks())
            navigate("/home")
            setLoginData(data)
        })
        .catch(err => {

            setErrorAlert({code: err.response.status, message: err.response.data.message, enabled: true})
            setLoginData(data)

        })
        .catch(err => {
            setErrorAlert({code: 500, message: 'Problème de connexion réseau.', enabled: true})
      
            toast.error('Erreur de connexion !',
            {
                style: {
                    border: '1px solid #d61b24',
                    padding: '16px',
                    color: '#d61b24',
                },
                duration: 5000,
            })
            
            setLoginData(data)
        })

    }




    const btnConnexion =  username === '' || 
    password === ''
    ? <Button className='mb-4' variant='primary' disabled>Se connecter</Button>
    : <Button className='mb-4' variant='primary' as='input' type='submit' value="Se connecter"/>



    const alertMessage = errorAlert.enabled ?
    <AlertDanger errorMsg={errorAlert.message}/>
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