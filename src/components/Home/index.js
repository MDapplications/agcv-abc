import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import { getSaisonActive } from '../../Redux/actions/saisons'
import NavBarHome from '../NavBarHome'
import Loader from '../Loader'
import { addStock, initStocks, setStock } from '../../Redux/actions/stocks'
import AlertDanger from '../AlertDanger'
import { getPage } from '../../Redux/actions/pages'
import ModalChangePassword from '../ModalChangePassword'


const Home = () => {

    //Hooks
    const dispatch = useDispatch()


    //Redux
    const {saisonActive, isLoadingGetActive, isGetSaisonActiveSuccess, errorGetActive} = useSelector(state => state.saisons)
    const stocks = useSelector(state => state.stocks)
    const {token} = useSelector(state => state.user)
    const page = useSelector(state => state.page)

    //States
    const [saisonSelect, setSaisonSelect] = useState(null)
    const [openModalChangePassword, setOpenModalChangePassword] = useState(false)


    useEffect(() => {
		if (page !== 'home') {dispatch(getPage('home'))}
    // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page])

    //Récupération de la saison actuelle
    useEffect(() => {
        if (!isLoadingGetActive && !isGetSaisonActiveSuccess && errorGetActive ==='') {
            if (saisonActive === undefined || saisonActive.id === undefined) {
                dispatch(getSaisonActive(token))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, saisonActive, isLoadingGetActive, isGetSaisonActiveSuccess, errorGetActive])

    
    useEffect(() => {
        if (isGetSaisonActiveSuccess && saisonActive !== undefined) {
            setSaisonSelect(saisonActive)
            dispatch(initStocks())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGetSaisonActiveSuccess, saisonActive])


    useEffect(() => {
        if (isGetSaisonActiveSuccess && saisonSelect !== null) {
            if (saisonSelect.id > 0) {
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
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stocks, saisonSelect, isGetSaisonActiveSuccess])


    const displayModalChangePassword = openModalChangePassword && <ModalChangePassword hideModal={() => setOpenModalChangePassword(false)}/>

    const displaySaisonActuelle = saisonSelect !== null 
    ? <h1 className='display-4'>Saison : {saisonSelect.anneeDebut + ' - ' + saisonSelect.anneeFin}</h1>
    : <h1 className='display-6'>Aucune saison active actuellement</h1>

    const displayLinkHome = saisonSelect !== null
    ? <>
            <hr className='m-0 mb-2'/>
            <nav className='nav justify-content-center'>
                <Link className='nav-link link-secondary' to=''>Résumé</Link>
                <Link className='nav-link link-secondary' to='consoVolants'>Consommation des volants</Link>
                <Link className='nav-link link-secondary' to='consoTests'>Consommation des volants d'essais</Link>
            </nav>
        </> 
    : null


    return isLoadingGetActive && !isGetSaisonActiveSuccess && errorGetActive === ''
	? <Loader loadingMsg='Récupération de la saison actuelle...'/>
	: !isLoadingGetActive && errorGetActive !== ''
		? <AlertDanger errorMsg={errorGetActive}/>
		: !isLoadingGetActive && isGetSaisonActiveSuccess && saisonSelect !== null
			? <>
                <NavBarHome context='home' showModalChangePassword={() => setOpenModalChangePassword(true)}/>
        
                <main role='main'>
                    <div className='p-2 bg-light border rounded-3'>
                        <Container className='text-center justify-content-center'>
                            {displaySaisonActuelle}
                            {displayLinkHome}
                        </Container>
                    </div>
                </main>
        
                
                <Outlet context={{saison: saisonSelect}}/>

                {displayModalChangePassword}
            </>
            : <>
                <NavBarHome context='home'/>
                <p className='mt-3'>Aucune saison active pour le moment 😕</p>
                {displayModalChangePassword}
            </>
            

}

export default Home