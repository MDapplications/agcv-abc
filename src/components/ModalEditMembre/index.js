import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { editMembre, refreshAllMembres } from '../../Redux/actions/membres'
import ModalEditTemplate from '../ModalEditTemplate'

const ModalEditMembre = ({hideModal, membreData}) => {

    //Redux
    const {token} = useSelector(state => state.user)
    const listMembres = useSelector(state => state.membres)
    

    //States
    const [membreEdit, setMembreEdit] = useState(membreData)

    const handleChangeCheck = event => setMembreEdit({...membreEdit, [event.target.id]: event.target.checked})


    return (
        <ModalEditTemplate 
            hideModal={hideModal} 
            title="Modification du membre"
            styleBody={{width: '700px'}}
            styleAlert={{width: '460px'}}
            stateSelector={listMembres}
            actionRefreshData={() => refreshAllMembres(token)}
            actionEdit={() => editMembre(token, membreEdit)}>

            {/*children*/}
                <Form>
                    <Form.Group className='mb-3 mx-3 text-start'>

                        <Row>
                            <Col sm="3">
                                <Form.Label className='mb-0 mt-4'>
                                    Actif ?
                                </Form.Label>
                            </Col>
                            <Col sm="5">
                                <Form.Check
                                    className='mt-4' 
                                    type="switch"
                                    id="actif"
                                    checked={membreEdit.actif}
                                    onChange={handleChangeCheck}/>
                            </Col>
                        </Row>
                             
                    </Form.Group>
                </Form>

        </ModalEditTemplate>
    )
}

export default ModalEditMembre