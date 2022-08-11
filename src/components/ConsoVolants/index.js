import React, { useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getPage } from '../../Redux/actions/pages'
import Loader from '../Loader'
import PanelMois from '../PanelMois'
import PanelConsoVolant from '../PanelConsoVolant'


const ConsoVolants = () => {

    //Styles
    const styleStock = {
        textAlign: 'left',
        fontSize: '1.2rem'
    }
    
    //Hooks
    const dispatch = useDispatch()

    //Redux
    const page = useSelector(state => state.page)
    const {consovolants} = useSelector(state => state.consovolants)


    useEffect(() => {if (page !== 'consoVolants') dispatch(getPage('consoVolants'))}, [dispatch, page])

  
    const displayConsoVolants = consovolants.length !== 0 
    ? consovolants.map(consovolant => {
        if (consovolant.TypeTube.default) {
            return <PanelConsoVolant 
                key={consovolant.id}
                nameTypeTube={consovolant.TypeTube.name}
                consovolant={consovolant}
                styleStock={styleStock}
                orderable={consovolant.TypeTube.orderable}
            />
        }
        return null
    })
    : <Loader loadingMsg='Actualisation des données...'/>


    return (
        <div className='d-flex justify-content-center'>
        
            <PanelMois styleStock={styleStock}/>

            <Container className='mt-3 ms-1 mb-5'>
                <Row>
                    {displayConsoVolants}
                </Row>
            </Container>
        </div>
        
    )
}

export default ConsoVolants