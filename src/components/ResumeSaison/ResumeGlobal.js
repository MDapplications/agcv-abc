import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ResumeGlobal = ({saison}) => {

    //Hooks
	const navigate = useNavigate()
    //Redux
    const stocks = useSelector(state => state.stocks)

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
		if (saison.hasOwnProperty('Commandes')) {
			if (saison.Commandes.length !== 0) {
				return saison.Commandes.reduce((prevValue, commande) => {
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

	const getBudgetRestant = () => saison.budget - getTotalPriceUsed() + getTotalPriceOrderedMembre()


	const handleClickCommandes = (idSaison) => navigate(`/commandes/${idSaison}`)
	const handleClickCompetitions = (idSaison) => navigate(`/competitions/${idSaison}`)

    return (
        <Card border='secondary' className='mb-3'>

            <Card.Header>
                <Card.Title className='my-2'>
                    Résumé de la saison
                </Card.Title>
            </Card.Header>

            <Card.Body className='text-start'>
                <Card.Title>
                    <span className='me-3'>Budget prévisionnel :</span><span>{currencyLocalPrice(saison.budget)}</span>
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
                                onClick={()=>handleClickCommandes(saison.id)}>
                                    Commandes membres
                            </Button>
                            <Button 
                                variant='outline-secondary'
                                onClick={()=>handleClickCompetitions(saison.id)}>
                                    Compétitions
                            </Button>
                        </div>
    
                </Card.Title>
            </Card.Body>
        </Card>
    )
}

export default ResumeGlobal
