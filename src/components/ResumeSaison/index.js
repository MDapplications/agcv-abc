import React from 'react'
import { Card, Container, ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useOutletContext } from 'react-router-dom'
import ResumeConsoVolant from './ResumeConsoVolant'
import ResumeGlobal from './ResumeGlobal'



const ResumeSaison = () => {

	const {saison} = useOutletContext();

	//Redux
	const stocks = useSelector(state => state.stocks)
  

	const displayResumeConsoDefault = stocks.length !== 0 
	? stocks.map(conso => {
		if (conso.TypeTube.default) {
			return <ResumeConsoVolant key={conso.id} consoData={conso}/>
		}
		return null
	})
	: <ListGroup.Item>Aucune consommation pour cette saison.</ListGroup.Item>


	const displayResumeConsoTest = stocks.length !== 0 
	? stocks.map(conso => {
		if (!conso.TypeTube.default) {
			return <ResumeConsoVolant key={conso.id} consoData={conso}/>
		}
		return null
	})
	: null


	const displayComponent = saison !== null
	? <div className='text-center d-flex justify-content-center'>
			<Container className='mt-3 mb-5'>

				<ResumeGlobal saison={saison}/>

				<Card border='secondary'>
					<Card.Header>
						<Card.Title className='my-2'>
							Résumé de la consommation des tubes
						</Card.Title>
					</Card.Header>
					<ListGroup>
						{displayResumeConsoDefault}
					</ListGroup>
					<ListGroup>
						{displayResumeConsoTest}
					</ListGroup>
				</Card>
			</Container>
		</div>
	: <p className='mt-3'>Aucune saison active pour le moment 😕</p>


	//render
	return displayComponent

}

export default ResumeSaison