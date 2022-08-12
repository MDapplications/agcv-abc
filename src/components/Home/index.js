import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import { getSaisonActive } from '../../Redux/actions/saisons'
import NavBarHome from '../NavBarHome'
import Loader from '../Loader'
import { addStock, initStocks, setStock } from '../../Redux/actions/stocks'


const Home = () => {

    //Hooks
    const dispatch = useDispatch()


    //Redux
    const {saisonActive, isLoadingGetActive, isGetSaisonActiveSuccess, errorGetActive} = useSelector(state => state.saisons)
    const stocks = useSelector(state => state.stocks)
    const {token} = useSelector(state => state.user)


    //Récupération de la saison actuelle
    useEffect(() => {
        if (!isLoadingGetActive && !isGetSaisonActiveSuccess && errorGetActive ==='') {
            if (saisonActive === undefined) {
                dispatch(getSaisonActive(token))
                dispatch(initStocks())
            } else if (saisonActive.id === undefined) {
                dispatch(getSaisonActive(token))
                dispatch(initStocks())
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, saisonActive, isLoadingGetActive, isGetSaisonActiveSuccess, errorGetActive])


    useEffect(() => {
        if (isGetSaisonActiveSuccess) {
            if (saisonActive.id > 0) {
                if (Object.keys(stocks).length === 0) {
                    saisonActive.ConsoVolants.forEach(consovolant => {
                        const idConsoVolant = consovolant.id
                        const TypeTube = consovolant.TypeTube
                        const calculConsoVolant = consovolant.ConsoMois.reduce((prevValue, data) => {
                            return {
                                nbUsed: prevValue.nbUsed + data.nbTubesUsed,
                                priceUsed: prevValue.priceUsed + (data.nbTubesUsed * data.PrixTube.prix),
                                nbOrdered:  prevValue.nbOrdered + data.nbTubesOrdered,
                                priceOrdered: prevValue.priceOrdered + (data.nbTubesOrdered * data.PrixTube.prix) 
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
                    
                    saisonActive.Commandes.forEach(commande => {
                        const idConsoVolant = commande.ConsoMoi.idConsoVolant
                        const nbUsed = commande.nbTubesOrdered
                        const priceUsed = commande.nbTubesOrdered * commande.PrixTube.prix //(commande.PrixTube.prix - commande.PrixTube.prixMembre)
                    
                        dispatch(addStock({
                            id: idConsoVolant,
                            nbUsed: nbUsed,
                            priceUsed: Number(priceUsed.toFixed(2)),
                            nbOrdered: 0,
                            priceOrdered: 0,
                            stock: nbUsed
                        }))
                    })
                }  
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stocks, saisonActive, isGetSaisonActiveSuccess])


    const displaySaisonActuelle = saisonActive.id !== undefined ?
    <h1 className='display-4'>Saison : {saisonActive.anneeDebut + ' - ' + saisonActive.anneeFin}</h1>
    : <h1 className='display-6'>Aucune saison active actuellement</h1>


    const displayHome = isLoadingGetActive && errorGetActive !== ''
    ? <Loader loadingMsg='Données de la saison actuelle en cours de récupération...' isMsg={true}/>
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