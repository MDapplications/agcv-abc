import React, { useEffect, useState } from 'react'
import {Container, Card, Form, Row, Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../Redux/actions/user'
import AlertDanger from '../AlertDanger'
import toast from 'react-hot-toast'
import Loader from '../Loader'
import { initPage } from '../../Redux/actions/pages'
import { initStocks } from '../../Redux/actions/stocks'
import { initSaisonActive } from '../../Redux/actions/saisons'


const Login = () => {

    //Hooks
    const navigate = useNavigate()
    const dispatch = useDispatch()

    //Redux
    const User = useSelector(state => state.user)

    //Constantes
    const data = {
        username: '',
        password: ''
    }
    const errorData = {code: 0, message: '', enabled: false}
   

    //States
    const [loginData, setLoginData] = useState(data)
    const [errorAlert, setErrorAlert] = useState(errorData)
    const [userLogOk, setuserLogOk] = useState(false)

    const { username, password } = loginData
    

    useEffect(() => {
        dispatch(initPage())
    }, [dispatch])


    useEffect(() => {
        if (!User.isLoading && User.isGetSuccess) {
            setuserLogOk(true)
            dispatch(initStocks())
            dispatch(initSaisonActive())
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [User])
    

    useEffect(() => {
        if (!User.isLoading && User.hasOwnProperty('error') && User.error.hasOwnProperty('response')) {
            if (User.error.response.status > 0) {
                setErrorAlert({code: User.error.response.status, message: User.error.response.data.message, enabled: true})
            } else {
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
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [User])

    useEffect(() => {
        if (userLogOk) {
            navigate("/home")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userLogOk])

    
    const handleChange = event => setLoginData({...loginData, [event.target.id]: event.target.value})

    const handleSubmit = e => {
        e.preventDefault()
        const dataUser = {   
            username, 
            password
        }
        dispatch(getUser(dataUser))
        setLoginData(data)
    }
   

    const btnConnexion =  username === '' || password === ''
    ? User.isLoading 
        ? <Loader isMsg={false}/>
        : <Button className='mb-4' variant='primary' disabled>Se connecter</Button>
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