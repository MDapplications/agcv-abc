import React from 'react'
import { Card, Table } from 'react-bootstrap'
import './index.css'

const PanelMois = ({styleStock}) => {

    const listMois = ['Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin']
    const displayListMois = listMois.map(mois => (
      <tr key={mois}>
        <td id='td-mois'>{mois}</td>
      </tr>
    ))


    return (
        <div className='mt-3 ms-auto'>
            <Card className='mb-1' style={{opacity: '0'}}>
                <Card.Header>
                <Card.Title>
                    Colonne mois
                </Card.Title>
                <Card.Body>
                    <Card.Subtitle className='fw-bold' style={styleStock}>
                    Stock
                    </Card.Subtitle>
                </Card.Body>
                </Card.Header>
            </Card>

            <Table bordered>
                <thead>
                <tr id='tr-header'>
                    <th>Mois</th>
                </tr>
                <tr>
                    <th id='th-mois'>Mois</th>
                </tr>
                </thead>
                <tbody>
                    {displayListMois}
                </tbody>

                <thead>
                <tr>
                    <th id='th-mois'>Total</th>
                </tr>
                </thead>
                
            </Table>
        </div>
    )
}

export default PanelMois