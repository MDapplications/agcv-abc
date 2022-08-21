import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, Container, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {getPage} from '../../Redux/actions/pages'
import AlertDanger from '../AlertDanger'
import Loader from '../Loader'

const ResumeSaison = () => {

	//Hooks
	const dispatch = useDispatch()
	const navigate = useNavigate()

	//Redux
    const {saisonActive, isLoadingGetActive, isGetSaisonActiveSuccess, errorGetActive} = useSelector(state => state.saisons)
	const stocks = useSelector(state => state.stocks)
	const page = useSelector(state => state.page)

	const [saisonSelect, setSaisonSelect] = useState(null)


	useEffect(() => {
		if (page !== 'resumeSaison') {
			dispatch(getPage('resumeSaison'))
		}
	}, [dispatch, page])


	useEffect(() => {
		if (!isLoadingGetActive && isGetSaisonActiveSuccess && saisonActive !== undefined) {
			setSaisonSelect(saisonActive)
		}
	}, [isLoadingGetActive, isGetSaisonActiveSuccess, saisonActive])
	

	//Affichage au format prix
    const currencyLocalPrice = prix => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prix)
  

	const getTotalPriceUsed = () => {
		if (stocks.length !== 0) {
			return stocks.reduce((prevValue, data) => {
				return prevValue + data.priceUsed
			}, 0.0)
		}	
		return 0.0
	}

	const getTotalPriceOrdered = () => {
		if (stocks.length !== 0) {
			return stocks.reduce((prevValue, data) => {
				return prevValue + data.priceOrdered
			}, 0.0)
		}	
		return 0.0
	}

	const getTotalPriceOrderedMembre = () => {
		if (saisonSelect.hasOwnProperty('Commandes')) {
			if (saisonSelect.Commandes.length !== 0) {
				return saisonSelect.Commandes.reduce((prevValue, commande) => {
					if (commande.status) {
						return prevValue + (commande.nbTubesOrdered * commande.PrixTube.prixMembre)
					}
					return prevValue
				}, 0.0)
			}
			return 0.0
		}
		return 0.0
	}

	const getBudgetRestant = () => saisonSelect.budget - getTotalPriceUsed() + getTotalPriceOrderedMembre()

	const handleClickCommandes = (idSaison) => navigate(`/commandes/${idSaison}`)
	const handleClickCompetitions = (idSaison) => navigate(`/competitions/${idSaison}`)

    const activeLowLevel = stockVolant => stockVolant.stock <= stockVolant.TypeTube.lowLevel
    ? <Badge bg='danger'>Stock bas</Badge>
    : <Badge bg='light' text='white' style={{opacity:'0'}}>Stock bas</Badge>


	const displayResumeConso = stocks.length !== 0 
	? stocks.map(conso => {
		return <ListGroup.Item key={conso.id} className='text-start'>
			<Card.Title>
				{conso.TypeTube.comment !== '' ? `${conso.TypeTube.name} - ${conso.TypeTube.comment}` : conso.TypeTube.name}
			</Card.Title>

			<div className='mb-1'>
				<span className='me-3'>Stock :</span>
				<span className='me-3'>{conso.stock}</span>
				<span>{activeLowLevel(conso)}</span>
			</div>
			<div className='mb-1'>
				<span className='me-3'>Tubes Utilisés :</span>
				<span>{currencyLocalPrice(conso.priceUsed) + ' (' + conso.nbUsed  + ')'}</span>
			</div>
			<div>
				<span className='me-3'>Tubes Commandés :</span>
				<span>{currencyLocalPrice(conso.priceOrdered) + ' (' + conso.nbOrdered  + ')'}</span>
			</div>

		</ListGroup.Item>
	})
	: <ListGroup.Item>Aucune consommation pour cette saison.</ListGroup.Item>


	const displayComponent = isLoadingGetActive && !isGetSaisonActiveSuccess && errorGetActive === ''
	? <Loader loadingMsg='Récupération de la saison actuelle...'/>
	: !isLoadingGetActive && errorGetActive !== ''
		? <AlertDanger errorMsg={errorGetActive}/>
		: !isLoadingGetActive && isGetSaisonActiveSuccess && saisonSelect !== null
			? <div className='text-center d-flex justify-content-center'>
				<Container className='mt-3 mb-5'>

					<Card border='secondary' className='mb-3'>
						<Card.Header>
							<Card.Title className='my-2'>
								Résumé de la saison
							</Card.Title>
						</Card.Header>
						<Card.Body className='text-start'>
							<Card.Title>
								<span className='me-3'>Budget prévisionnel :</span><span>{currencyLocalPrice(saisonSelect.budget)}</span>
							</Card.Title>
							
							<div>
								<span className='me-3'>Coût des volants commandés :</span>
								<span>{currencyLocalPrice(getTotalPriceOrdered())}</span>
							</div>
							<div>
								<span className='me-3'>Coût des volants utilisés :</span>
								<span>{currencyLocalPrice(getTotalPriceUsed())}</span>
							</div>
							<div>
								<span className='me-3'>Revenu des volants commandés par les membres :</span>
								<span>{currencyLocalPrice(getTotalPriceOrderedMembre())}</span>
							</div>
							
							<hr/>
							<Card.Title className='d-flex justify-content-between mb-0'>
				
									<div style={{paddingTop: '6px'}}>
										<div>
											<span className='me-3'>Budget restant :</span>
											<span>{currencyLocalPrice(getBudgetRestant())}</span>
										</div>
									</div>

									<div className='d-flex justify-content-end'>
										<Button 
											className='me-2' 
											variant='outline-secondary'
											onClick={()=>handleClickCommandes(saisonSelect.id)}>
												Commandes membres
										</Button>
										<Button 
											variant='outline-secondary'
											onClick={()=>handleClickCompetitions(saisonSelect.id)}>
												Compétitions
										</Button>
									</div>
				
							</Card.Title>
						</Card.Body>
					</Card>

					<Card border='secondary'>
						<Card.Header>
							<Card.Title className='my-2'>
								Résumé de la consommation des tubes
							</Card.Title>
						</Card.Header>
						<ListGroup>
							{displayResumeConso}
						</ListGroup>
					</Card>
				</Container>
			</div>
		: <p className='mt-3'>Aucune saison active pour le moment 😕</p>


	//render
	return displayComponent

}

export default ResumeSaison