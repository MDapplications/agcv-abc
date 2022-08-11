import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import { getAllConsoMois } from '../../Redux/actions/consomois'
import { getAllConsoVolants } from '../../Redux/actions/consovolants'
import { getAllPrixtubes } from '../../Redux/actions/prixtubes'
import { getSaisonActive } from '../../Redux/actions/saisons'
import { getAllTypetubes } from '../../Redux/actions/typetubes'
import NavBarHome from '../NavBarHome'
import Loader from '../Loader'
import { setStock } from '../../Redux/actions/stocks'


const Home = () => {

    //Hooks
    const dispatch = useDispatch()


    //Redux
    const {saisonActive, isLoadingGetActive, isGetSaisonActiveSuccess} = useSelector(state => state.saisons)
    const listConsoVolant = useSelector(state => state.consovolants)
    const listConsoMois = useSelector(state => state.consomois)
    const listTypetube = useSelector(state => state.typetubes)
    const listPrixtube = useSelector(state => state.prixtubes)
    const stocksVolants = useSelector(state => state.stocks)
    const {token} = useSelector(state => state.user)

    const {consovolants} = listConsoVolant
    const {consomois} = listConsoMois
    const {typetubes} = listTypetube
    const {prixtubes} = listPrixtube


    //Récupération de la saison actuelle
    useEffect(() => {
        if (!isLoadingGetActive && !isGetSaisonActiveSuccess)
        if (saisonActive === undefined) {
            dispatch(getSaisonActive(token))
        } else if (saisonActive.id === undefined) {
            dispatch(getSaisonActive(token))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, saisonActive])


    //Récupération des ConsoVolants de la saison actuelle
    useEffect(() => {
        if (saisonActive.id > 0) {
            if (consovolants.length === 0) {
                dispatch(getAllConsoVolants(token, saisonActive.id))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, saisonActive])


    //Récupération des ConsoMois de chaque ConsoVolants
    useEffect(() => {
        if (listConsoVolant.isGetSuccess) {
            if (consomois.length === 0) {
                consovolants.forEach(consoVolant => {
                    dispatch(getAllConsoMois(token, consoVolant.id))
                })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, listConsoVolant.isGetSuccess])


    useEffect(() => {
        if (typetubes.length === 0) {
            dispatch(getAllTypetubes(token))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])


    useEffect(() => {
        if (prixtubes.length === 0) {
            dispatch(getAllPrixtubes(token))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])


    useEffect(() => {
        if (listPrixtube.isGetSuccess && listConsoVolant.isGetSuccess) {
            if (Object.keys(stocksVolants).length === 0) {
                consovolants.forEach(consovolant => {
                    const idConsoVolant = consovolant.id
                    const TypeTube = consovolant.TypeTube
                    const calculConsoVolant = consovolant.ConsoMois.reduce((prevValue, data) => {
                        return {
                            nbUsed: prevValue.nbUsed + data.nbTubesUsed,
                            priceUsed: prevValue.priceUsed + (data.nbTubesUsed * getPrixPrixtubes(data.idPrixTube)),
                            nbOrdered:  prevValue.nbOrdered + data.nbTubesOrdered,
                            priceOrdered: prevValue.priceOrdered + (data.nbTubesOrdered * getPrixPrixtubes(data.idPrixTube)) 
                        }
                    }, {nbUsed:0, priceUsed: 0.0, nbOrdered: 0, priceOrdered: 0.0})

                    const stock = consovolant.stock - calculConsoVolant.nbUsed + calculConsoVolant.nbOrdered
                
                    dispatch(setStock({
                        id: idConsoVolant,
                        nbUsed: calculConsoVolant.nbUsed,
                        priceUsed: Number(calculConsoVolant.priceUsed.toFixed(2)),
                        nbOrdered: calculConsoVolant.nbOrdered,
                        priceOrdered: Number(calculConsoVolant.priceOrdered.toFixed(2)),
                        TypeTube: TypeTube,
                        stock: stock
                    }))
                
                })
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listPrixtube.isGetSuccess, listConsoVolant.isGetSuccess, stocksVolants, consovolants])
    


    const getPrixPrixtubes = idPrixTube => {
        const prixtube = prixtubes.filter(data => data.id === idPrixTube)
        if (prixtube.length !== 0) {
            return prixtube[0].prix
        } else {
            return 0
        }
    }



    const displaySaisonActuelle = saisonActive.id !== undefined ?
    <h1 className='display-4'>Saison : {saisonActive.anneeDebut + ' - ' + saisonActive.anneeFin}</h1>
    : <h1 className='display-6'>Aucune saison active actuellement</h1>


    const displayHome = isLoadingGetActive || listConsoVolant.isLoading || 
    listConsoMois.isLoading || listTypetube.isLoading || listPrixtube.isLoading 
    ? <Loader loadingMsg='Données de la saison actuelle en cours de récupération...'/>
    : <>
        <NavBarHome context='home'/>

        <main role='main'>
            <div className='p-2 bg-light border rounded-3'>
                <Container className='text-center justify-content-center'>
                    {displaySaisonActuelle}
                    <hr className='m-0 mb-2'/>
                    <nav className='nav justify-content-center'>
                        <Link className='nav-link link-secondary' to=''>Résumé</Link>
                        <Link className='nav-link link-secondary' to='consoVolants'>Consommation des volants</Link>
                        <Link className='nav-link link-secondary' to='consoTests'>Consommation des volants d'essais</Link>
                    </nav>
                </Container>
            </div>
        </main>

        <Outlet/>
    </>


    //render
    return displayHome
}

export default Home