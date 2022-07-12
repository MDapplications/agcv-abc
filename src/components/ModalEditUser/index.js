import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { editUser, refreshAllUsers } from '../../Redux/actions/users'
import ModalEditTemplate from '../ModalEditTemplate'


const ModalEditUser = ({hideModal, userData}) => {

    //Redux
    const {token} = useSelector(state => state.user)
    const listUsers = useSelector(state => state.users)
 

    //States
    const [userEdit, setUserEdit] = useState(userData)

    

    const handleChange = event => setUserEdit({...userEdit, [event.target.id]: event.target.value})
    const handleChangeCheck = event => setUserEdit({...userEdit, [event.target.id]: event.target.checked})
    const handleChangeSelect = event => setUserEdit({...userEdit, [event.target.id]: Number(event.target.value)})


    return (
        <ModalEditTemplate 
            hideModal={hideModal} 
            title="Modification de l'utilisateur"
            styleBody={{width: '500px'}}
            styleAlert={{width: '460px'}}
            stateSelector={listUsers}
            actionRefreshData={() => refreshAllUsers(token)}
            actionEdit={() => editUser(token, userEdit)}>

            {/*children*/}
                <Form>
                    <Form.Group className='mb-3 mx-3 text-start'>

                        <Row>
                            <Col sm="3">
                                <Form.Label className='mb-0 mt-2'>
                                    Identifiant
                                </Form.Label>  
                            </Col>
                            <Col sm="8">
                                <Form.Control 
                                    id='identifiant' 
                                    className='mb-3' 
                                    placeholder='identifiant' 
                                    value={userEdit.identifiant}
                                    onChange={handleChange}/>
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col sm="3">
                                <Form.Label className='mb-0 mt-2'>
                                    Rôle
                                </Form.Label>
                            </Col>
                            <Col sm="8">
                                <Form.Select 
                                    id='role'
                                    defaultValue={userEdit.role}
                                    onChange={handleChangeSelect}>
                                        <option value="1">User</option>
                                        <option value="2">Admin</option>
                                        <option value="3">Super Admin</option>
                                </Form.Select> 
                            </Col>
                        </Row>

                        <Row>
                            <Col sm="3">
                                <Form.Label className='mb-0 mt-4'>
                                    Actif ?
                                </Form.Label>
                            </Col>
                            <Col sm="8">
                                <Form.Check
                                    className='mt-4' 
                                    type="switch"
                                    id="actif"
                                    checked={userEdit.actif}
                                    onChange={handleChangeCheck}/>
                            </Col>
                        </Row>
                                    

                    </Form.Group>
                </Form>

        </ModalEditTemplate>
    )
}

export default ModalEditUser