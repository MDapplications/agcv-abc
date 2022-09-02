import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { changePassword } from '../../Redux/actions/user'
import AlertDanger from '../AlertDanger'
import Loader from '../Loader'
import ModalTemplate from '../ModalTemplate'

const ModalChangePassword = ({hideModal}) => {

    const md = 4

    const initData = {
        password: '',
        newPassword: '',
        confirmPassword: ''
    }

    //Hooks
    const dispatch = useDispatch()

    //Redux
    const {id, token, isLoadingPassword, isPasswordSuccess, errorPassword} = useSelector(state => state.user)

    //States
    const [editData, setEditData] = useState(initData)
    const [errorMsg, setErrorMsg] = useState('')
    const [requestChange, setRequestChange] = useState(false)


    useEffect(() => {
        if (requestChange && isPasswordSuccess) {
            hideModal()
            toast.success("Modification de votre mot de passe réalisé avec succès !",
            {
                style: {
                    border: '1px solid #00B35B',
                    padding: '16px',
                    color: '#00B35B',
                },
                duration: 8000,
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requestChange, isPasswordSuccess])
    
    useEffect(() => {
        if (requestChange && errorPassword !== '') {
            setErrorMsg(errorPassword)
        }
    }, [requestChange, errorPassword])



    const displayError = errorMsg !== '' && 
    <AlertDanger errorMsg={errorMsg} style={{width: '460px'}}/>


    const handleConfirm = () => {
        const data = {
            id,
            password: editData.password,
            newPassword: editData.newPassword
        }
        dispatch(changePassword(token, data))
        setRequestChange(true)
    }


    const handleChange = event => setEditData({...editData, [event.target.id]: event.target.value})


    const optionDisableBtnConfirm = editData.password === '' || editData.newPassword === '' || editData.confirmPassword === ''
    || editData.newPassword !== editData.confirmPassword || editData.password === editData.newPassword

    const displayBtnConfirm = isLoadingPassword
    ? <Loader isMsg={false}/> : <Button variant='primary' disabled={optionDisableBtnConfirm} onClick={handleConfirm}>Modifier</Button>


    return (
        <ModalTemplate 
            hideModal={hideModal} 
            styleBody={{width: '700px'}}
            title='Changement de mot de passe'
            btnConfirm={displayBtnConfirm}>

                {displayError}

                <Form>
                    <Form.Group className='mb-3 mx-3 text-start'>
                       
                        <Row>
                            <Col md={md}>
                                <Form.Label className='mb-0 mt-2'>
                                    Mot de passe actuelle
                                </Form.Label>  
                            </Col>
                            <Col md={md}>
                                <Form.Control 
                                    id='password' 
                                    type='password'
                                    className='mb-3'
                                    value={editData.password}
                                    onChange={handleChange}/>
                            </Col>
                        </Row>
 
                        <Row>
                            <Col md={md}>
                                <Form.Label className='mb-0 mt-2'>
                                    Nouveau mot de passe
                                </Form.Label>  
                            </Col>
                            <Col md={md}>
                                <Form.Control 
                                    id='newPassword' 
                                    type='password'
                                    className='mb-3'
                                    value={editData.newPassword}
                                    onChange={handleChange}/>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={md}>
                                <Form.Label className='mb-0 mt-2'>
                                    Confirmation mot de passe
                                </Form.Label>  
                            </Col>
                            <Col md={md}>
                                <Form.Control 
                                    id='confirmPassword' 
                                    type='password'
                                    value={editData.confirmPassword}
                                    onChange={handleChange}/>
                            </Col>
                        </Row>
                                    

                    </Form.Group>
                </Form>
        </ModalTemplate>
    )
}

export default ModalChangePassword
