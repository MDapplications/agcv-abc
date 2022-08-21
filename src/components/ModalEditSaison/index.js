import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { editSaison, refreshAllSaisons } from '../../Redux/actions/saisons'
import ModalEditTemplate from '../ModalEditTemplate'

const ModalEditSaison = ({hideModal, saisonData}) => {

    //Redux
    const {token} = useSelector(state => state.user)
    const listSaisons = useSelector(state => state.saisons)

    //States
    const [saisonEdit, setSaisonEdit] = useState(saisonData)


    const handleChangeCheck = event => setSaisonEdit({...saisonEdit, [event.target.id]: event.target.checked})


    return (
        <ModalEditTemplate 
            hideModal={hideModal} 
            title="Modification de la saison"
            styleBody={{width: '700px'}}
            styleAlert={{width: '460px'}}
            stateSelector={listSaisons}
            actionRefreshData={() => refreshAllSaisons(token)}
            actionEdit={() => editSaison(token, saisonEdit)}>

            {/*children*/}
                <Form>
                    <Form.Group className='mb-3 mx-3 text-start'>

                        <Row>
                            <Col sm="3">
                                <Form.Label className='mb-0 mt-3'>
                                    Saison active ?
                                </Form.Label>
                            </Col>
                            <Col sm="5">
                                <Form.Check
                                    className='mt-3' 
                                    type="switch"
                                    id="active"
                                    checked={saisonEdit.active}
                                    onChange={handleChangeCheck}/>
                            </Col>
                        </Row>

                    </Form.Group>
                </Form>

        </ModalEditTemplate>
    )
}

export default ModalEditSaison