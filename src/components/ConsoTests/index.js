import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { getPage } from '../../Redux/actions/pages'
import { getAllPrixtubes } from '../../Redux/actions/prixtubes'
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
    const {token} = useSelector(state => state.user)
    const {saisonActive, isLoadingGetActive, isGetSaisonActiveSuccess} = useSelector(state => state.saisons)
    const {isLoading, isGetSuccess, error} = useSelector(state => state.prixtubes)
  
    //States
    const [consoTestPresent, setConsoTestPresent] = useState(false)
    const [listConsoVolants, setlistConsoVolants] = useState([])

    useEffect(() => {dispatch(getPage('consoTests'))}, [dispatch])

    useEffect(() => {
        if (!isLoading && !isGetSuccess && error === '') {
            dispatch(getAllPrixtubes(token))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isGetSuccess, error, token])

    useEffect(() => {
        if (!isLoading && !isGetSuccess && error !== '') {
            toast.error('Impossible de récupérer les prix des tubes !',
            {
                style: {
                    border: '1px solid #d61b24',
                    padding: '16px',
                    color: '#d61b24',
                },
                duration: 5000,
            })
        }
    }, [isLoading, isGetSuccess, error])

    useEffect(() => {
        if (isGetSaisonActiveSuccess) {
            setlistConsoVolants(saisonActive.ConsoVolants)
        }
    }, [isGetSaisonActiveSuccess, saisonActive])

    
    const displayConsoVolants = isLoadingGetActive
    ? <Loader loadingMsg='Actualisation des données...'/>
    : isGetSaisonActiveSuccess && listConsoVolants.length > 0 
        ? listConsoVolants.map(consovolant => {
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
        : <p>Aucune consommation de volants pour le moment.</p>


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