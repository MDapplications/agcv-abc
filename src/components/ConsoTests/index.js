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
    //const page = useSelector(state => state.page)
    const {consovolants} = useSelector(state => state.consovolants)
    const {typetubes} = useSelector(state => state.typetubes)

    //States
    const [consoTestPresent, setConsoTestPresent] = useState(false)


    useEffect(() => {
        dispatch(getPage('consoTests'))
    }, [dispatch])


    const getNameTypeTube = id => {
        const typetube = typetubes.filter(data => data.id === id)
        if (typetube.length > 0) {
            return typetube[0].name
        } else {
            return 'non défini'
        }
    }


    const getDefaultTypeTube = id => {
        const typetube = typetubes.filter(data => data.id === id)
        if (typetube.length > 0) {
        return typetube[0].default
        } else {
            return false
        }
    }
  
  
    const displayConsoVolants = consovolants.length !== 0 ? 
        consovolants.map(consovolant => {
        if (!getDefaultTypeTube(consovolant.idTypeTube)) {
            if (!consoTestPresent) setConsoTestPresent(true)
            return <PanelConsoVolant 
                key={consovolant.id}
                nameTypeTube={getNameTypeTube(consovolant.idTypeTube)}
                consovolant={consovolant}
                styleStock={styleStock}
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