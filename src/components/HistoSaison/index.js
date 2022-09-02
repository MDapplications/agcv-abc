import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import { getPage } from '../../Redux/actions/pages'
import { getAllSaisons } from '../../Redux/actions/saisons'
import { addStock, initStocks, setStock } from '../../Redux/actions/stocks'
import Loader from '../Loader'
import NavBarBack from '../NavBarBack'


const HistoSaison = () => {
    
    const { idSaison } = useParams()

    //Hooks
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    //Redux
    const {token} = useSelector(state => state.user)
    const stocks = useSelector(state => state.stocks)
    const {saisons, isLoading, isGetSuccess, error} = useSelector(state => state.saisons)

    //States
    const [saisonSelect, setSaisonSelect] = useState(null)


    useEffect(() => {
        dispatch(getPage('histoSaison'))
        dispatch(initStocks())
    }, [dispatch])

    
    useEffect(() => {
        if (saisonSelect === (undefined || null) && saisons.length > 0) {
            const dataFilter = saisons.filter(data => data.id === Number(idSaison))
            setSaisonSelect(dataFilter[0])
        }
    }, [saisons, idSaison, saisonSelect])

    useEffect(() => {
        if (saisons.length === 0 && !isLoading && !isGetSuccess && error === '') {
            dispatch(getAllSaisons(token))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [saisons, isLoading, isGetSuccess, error, token])

    useEffect(() => {
        if (saisonSelect !== null) {
            if (Object.keys(stocks).length === 0) {
                saisonSelect.ConsoVolants.forEach(consovolant => {
                    const idConsoVolant = consovolant.id
                    const TypeTube = consovolant.TypeTube
                    const calculConsoVolant = consovolant.ConsoMois.reduce((prevValue, data) => {
                        if (data.PrixTube !== null) {
                            return {
                                nbUsed: prevValue.nbUsed + data.nbTubesUsed,
                                priceUsed: prevValue.priceUsed + (data.nbTubesUsed * data.PrixTube.prix),
                                nbOrdered:  prevValue.nbOrdered + data.nbTubesOrdered,
                                priceOrdered: prevValue.priceOrdered + (data.nbTubesOrdered * data.PrixTube.prix) 
                            }
                        } else {
                            return {
                                nbUsed: prevValue.nbUsed + data.nbTubesUsed,
                                priceUsed: prevValue.priceUsed + (data.nbTubesUsed * 0),
                                nbOrdered:  prevValue.nbOrdered + data.nbTubesOrdered,
                                priceOrdered: prevValue.priceOrdered + (data.nbTubesOrdered * 0) 
                            }
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
                
                saisonSelect.Commandes.forEach(commande => {
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

                saisonSelect.Stocks.forEach(stock => {
                    stock.Restocks.forEach(restock => {
                        const idConsoVolant = restock.ConsoMoi.idConsoVolant
                        const nbUsed = restock.value
                        const priceUsed = restock.value * restock.ConsoMoi.PrixTube.prix

                        dispatch(addStock({
                            id: idConsoVolant,
                            nbUsed: nbUsed,
                            priceUsed: Number(priceUsed.toFixed(2)),
                            nbOrdered: 0,
                            priceOrdered: 0,
                            stock: nbUsed
                        }))
                    })
                })  
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stocks, saisonSelect])



    const handleBack = () => {
        navigate('/admin/saisons')
    }


    const displaySaisonActuelle = saisonSelect !== null 
    ? saisonSelect['id'] !== undefined 
        ? <h1 className='display-4'>Saison : {saisonSelect.anneeDebut + ' - ' + saisonSelect.anneeFin}</h1>
        : <h1 className='display-6'>Aucune saison active actuellement</h1>
    : <h1 className='display-6'>Aucune saison active actuellement</h1>

    const displayLinkHome = saisonSelect !== undefined
    ? <nav className='nav justify-content-center'>
        <Link className='nav-link link-secondary' to=''>Résumé</Link>
        <Link className='nav-link link-secondary' to='consoVolants'>Consommation des volants</Link>
        <Link className='nav-link link-secondary' to='consoTests'>Consommation des volants d'essais</Link>
    </nav>
    : null




    return saisonSelect === null 
        ? <Loader loadingMsg='Chargement de la saison en cours...'/>
        : <>
            <NavBarBack handleBack={handleBack}/>
            <main role='main'>
                <div className='p-2 bg-light border rounded-3'>
                    <Container className='text-center justify-content-center'>
                        {displaySaisonActuelle}
                        <hr className='m-0 mb-2'/>
                        {displayLinkHome}
                    </Container>
                </div>
            </main>

            <Outlet context={{saison: saisonSelect}}/>
        </>

}

export default HistoSaison