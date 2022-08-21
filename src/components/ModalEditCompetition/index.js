import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { editCompetition, refreshAllCompetitions } from '../../Redux/actions/competitions'
import ModalEditTemplate from '../ModalEditTemplate'

const ModalEditCompetition = ({hideModal, competitionData, idSaison}) => {

    const md = 4

    //Redux
    const listCompetitions = useSelector(state => state.competitions)
    const {token} = useSelector(state => state.user)

    //States
    const [competitionEdit, setCompetitionEdit] = useState(competitionData)

    const handleChange = event => setCompetitionEdit({...competitionEdit, [event.target.id]: event.target.value})
    const handleChangeNumber = event => setCompetitionEdit({...competitionEdit, [event.target.id]: Number(event.target.value)})

    const disableBtnConfirm = competitionEdit.name.length < 2 || competitionEdit.nbTubesUsed <= 0

    return (
        <ModalEditTemplate 
            hideModal={hideModal} 
            title="Modification de la compétition"
            styleBody={{width: '700px'}}
            styleAlert={{width: '460px'}}
            stateSelector={listCompetitions}
            actionRefreshData={() => refreshAllCompetitions(token, idSaison)}
            actionEdit={() => editCompetition(token, competitionEdit)}
            disableBtnConfirm={disableBtnConfirm}>

            {/*children*/}
                <Form> 
                    <Form.Group className='mb-3 mx-3 text-start'>
                    
                        <Row>
                            <Col md={md}>
                                <Form.Label className='mb-0 mt-2'>
                                    Nom de la compétition
                                </Form.Label>
                            </Col>
                            <Col md={md}>
                                <Form.Control 
                                    id='name'
                                    value={competitionEdit.name}
                                    onChange={handleChange}/>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={md}>
                                <Form.Label className='mb-0 mt-3'>
                                    Nb de tube(s) utilisés
                                </Form.Label>
                            </Col>
                            <Col md={md}>
                                <Form.Control 
                                    id='nbTubesUsed'
                                    type='number'
                                    className='mt-2'
                                    min={1}
                                    value={competitionEdit.nbTubesUsed}
                                    onChange={handleChangeNumber}/>
                            </Col>
                        </Row>

                    </Form.Group>
                </Form>

        </ModalEditTemplate>
    )
}

export default ModalEditCompetition
