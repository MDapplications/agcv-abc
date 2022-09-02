import React from 'react'
import { Badge, Card, ListGroup } from 'react-bootstrap'

const ResumeConsoVolant = ({consoData}) => {

    //Affichage au format prix
    const currencyLocalPrice = prix => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prix)
    
    const activeLowLevel = stockVolant => stockVolant.stock <= stockVolant.TypeTube.lowLevel
    ? <Badge bg='danger'>Stock bas</Badge>
    : <Badge bg='light' text='white' style={{opacity:'0'}}>Stock bas</Badge>


    return (
        <ListGroup.Item className='text-start'>
            <Card.Title>
                {consoData.TypeTube.comment !== '' ? `${consoData.TypeTube.name} - ${consoData.TypeTube.comment}` : consoData.TypeTube.name}
            </Card.Title>

            <div className='mb-1'>
                <span className='me-3'>Stock :</span>
                <span className='me-3'>{consoData.stock}</span>
                <span>{activeLowLevel(consoData)}</span>
            </div>
            <div className='mb-1'>
                <span className='me-3'>Tubes Utilisés :</span>
                <span>{currencyLocalPrice(consoData.priceUsed) + ' (' + consoData.nbUsed  + ')'}</span>
            </div>
            <div>
                <span className='me-3'>Tubes Commandés :</span>
                <span>{currencyLocalPrice(consoData.priceOrdered) + ' (' + consoData.nbOrdered  + ')'}</span>
            </div>
        </ListGroup.Item>
    )
}

export default ResumeConsoVolant
