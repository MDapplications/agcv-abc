import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getPage } from '../../Redux/actions/pages'
import Loader from '../Loader'
import PanelConsoVolant from '../PanelConsoVolant'
import PanelMois from '../PanelMois'

const ConsoTests = () => {

    //Styles
    const styleStock = {
      textAlign: 'left',
      fontSize: '1.2rem'
  }
  
    //Hooks
    const dispatch = useDispatch()

    //Redux
    const {consovolants} = useSelector(state => state.consovolants)
  
    //States
    const [consoTestPresent, setConsoTestPresent] = useState(false)


    useEffect(() => {
        dispatch(getPage('consoTests'))
    }, [dispatch])

    
    const displayConsoVolants = consovolants.length !== 0 ? 
        consovolants.map(consovolant => {
        if (!consovolant.TypeTube.default) {
            if (!consoTestPresent) setConsoTestPresent(true)
            return <PanelConsoVolant 
                key={consovolant.id}
                nameTypeTube={`${consovolant.TypeTube.name} - ${consovolant.TypeTube.comment}`}
                consovolant={consovolant}
                styleStock={styleStock}
                orderable={consovolant.TypeTube.orderable}
            />
        }
        return null
        })
        : <Loader loadingMsg='Actualisation des données...'/>


    return (
        <>
            {!consoTestPresent && <p className='mt-3'>Aucune consommation d'essais actuellement.</p>}

            <div className='d-flex justify-content-center'>

            {consoTestPresent && <PanelMois styleStock={styleStock}/>}

            <Container className='mt-3 ms-1 mb-5'>
                <Row>
                    {displayConsoVolants}
                </Row>
            </Container>
            </div>
        </>        
    )
}

export default ConsoTests