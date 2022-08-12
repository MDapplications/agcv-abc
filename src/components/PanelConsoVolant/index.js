import React, { useEffect, useState } from 'react'
import { Badge, Card, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Table } from 'semantic-ui-react'
import FooterConsoVolants from './FooterConsoVolants'
import TableConsoMois from './TableConsoMois'
import './index.css'

const PanelConsoVolant = ({nameTypeTube, consovolant, styleStock, orderable}) => {


    //Redux
    const stocks = useSelector(state => state.stocks)
    
    //States
    const [totalUsed, setTotalUsed] = useState(0)
    const [totalOrdered, setTotalOrdered] = useState(0)
    const [totalPriceUsed, setTotalPriceUsed] = useState(0.0)
    const [totalPriceOrdered, setTotalPriceOrdered] = useState(0.0)
    const [stockVolant, setStockVolant] = useState(0)
   

    useEffect(() => {
        if (Object.keys(stocks).length > 0) {
            const dataFilter = stocks.filter(data => data.id === consovolant.id)[0]
            setTotalUsed(dataFilter.nbUsed)
            setTotalPriceUsed(dataFilter.priceUsed)
            setTotalOrdered(dataFilter.nbOrdered)
            setTotalPriceOrdered(dataFilter.priceOrdered)
            setStockVolant(dataFilter.stock)
        }
    }, [stocks, consovolant])
    

    const activeLowLevel = stockVolant <= consovolant.TypeTube.lowLevel
    ? <Badge bg='danger'>Stock bas</Badge>
    : <Badge bg='light' text='white' style={{opacity:'0'}}>Stock bas</Badge>

    const displayConsoMois = consovolant => consovolant.ConsoMois.map(moisData => <TableConsoMois   key={moisData.id} 
                                                                                                    moisData={moisData}
                                                                                                    orderable={orderable}/>)

    return (
        <Col className='px-1'>
            <Card
            bg='primary'>
                <Card.Header>
                    <Card.Title style={{color: 'white'}}>
                        {nameTypeTube}
                    </Card.Title>
                </Card.Header>

                <Card.Body text='black' style={{backgroundColor: 'rgb(243, 243, 243)'}}>
                    <Card.Subtitle className='fw-bold d-flex justify-content-start' style={styleStock}>
                        <span className='me-2'>
                            Stock : {stockVolant}
                        </span>
                        {activeLowLevel}
                    </Card.Subtitle>
                </Card.Body>
            </Card>

            <Table celled structured className='mt-0' color='blue' key='blue'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell id='th-ucp' colSpan='2' textAlign='center'>Utilisés</Table.HeaderCell>
                        <Table.HeaderCell id='th-ucp' colSpan='2' textAlign='center'>Commandés</Table.HeaderCell>
                        <Table.HeaderCell id='th-ucp' rowSpan='2' textAlign='center' verticalAlign='middle'>Prix</Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell id='th-nb-cout' textAlign='center'>Nb</Table.HeaderCell>
                        <Table.HeaderCell id='th-nb-cout' textAlign='center'>Coût</Table.HeaderCell>
                        <Table.HeaderCell id='th-nb-cout' textAlign='center'>Nb</Table.HeaderCell>
                        <Table.HeaderCell id='th-nb-cout' textAlign='center'>Coût</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {displayConsoMois(consovolant)}
                </Table.Body>

                {/* FOOTER */}
                <Table.Header>
                    <FooterConsoVolants 
                        totalUsed={totalUsed}
                        totalOrdered={totalOrdered}
                        totalPriceUsed={totalPriceUsed}
                        totalPriceOrdered={totalPriceOrdered}/>
                </Table.Header>
            </Table>
        </Col>
    )
}

export default PanelConsoVolant