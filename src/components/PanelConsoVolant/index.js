import React, { useEffect, useState } from 'react'
import { Badge, Card, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'semantic-ui-react'
import FooterConsoVolants from './FooterConsoVolants'
import TableConsoMois from './TableConsoMois'
import { setStock } from '../../Redux/actions/stocks'
import './index.css'

const PanelConsoVolant = ({nameTypeTube, consovolant, styleStock}) => {

    //Redux
    const {prixtubes} = useSelector(state => state.prixtubes)
    const {typetubes} = useSelector(state => state.typetubes)

    //States
    const [totalUsed, setTotalUsed] = useState(0)
    const [totalOrdered, setTotalOrdered] = useState(0)
    const [totalPriceUsed, setTotalPriceUsed] = useState(0.0)
    const [totalPriceOrdered, setTotalPriceOrdered] = useState(0.0)
    const [stockVolant, setStockVolant] = useState(0)

    //Hooks
    const dispatch = useDispatch()

    
    const {id, stock, ConsoMois, idTypeTube} = consovolant


    useEffect(() => {
        const calculConsoVolant = ConsoMois.reduce((prevValue, data) => {
            return {
                nbUsed: prevValue.nbUsed + data.nbTubesUsed,
                priceUsed: prevValue.priceUsed + (data.nbTubesUsed * getPrixPrixtubes(data.idPrixTube)),
                nbOrdered:  prevValue.nbOrdered + data.nbTubesOrdered,
                priceOrdered: prevValue.priceOrdered + (data.nbTubesOrdered * getPrixPrixtubes(data.idPrixTube)) 
            }
        }, {nbUsed:0, priceUsed: 0.0, nbOrdered: 0, priceOrdered: 0.0})

        setTotalUsed(calculConsoVolant.nbUsed)
        setTotalPriceUsed(Number(calculConsoVolant.priceUsed.toFixed(2)))
        setTotalOrdered(calculConsoVolant.nbOrdered)
        setTotalPriceOrdered(Number(calculConsoVolant.priceOrdered.toFixed(2)))
        setStockVolant(stock - calculConsoVolant.nbUsed + calculConsoVolant.nbOrdered)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ConsoMois, stock])


    useEffect(() => {    
        dispatch(setStock({
            id: id,
            nbUsed: totalUsed,
            priceUsed: totalPriceUsed,
            nbOrdered: totalOrdered,
            priceOrdered: totalPriceOrdered,
            idTypeTube: idTypeTube,
            stock: stockVolant
        }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, totalUsed, totalOrdered, totalPriceUsed, totalPriceOrdered, stockVolant])
    


    const getPrixPrixtubes = idPrixTube => {
        const prixtube = prixtubes.filter(data => data.id === idPrixTube)
        if (prixtube.length !== 0) {
            return prixtube[0].prix
        } else {
            return 0
        }
    }

    const getLowLevel = idTypeTube => {
        const typetube = typetubes.filter(data => data.id === idTypeTube)
        if (typetube.length !== 0) {
            return typetube[0].lowLevel
        } else {
            return 0
        }
    }

    const activeLowLevel = stockVolant <= getLowLevel(consovolant.idTypeTube)
    ? <Badge bg='danger'>Stock bas</Badge>
    : <Badge bg='light' text='white' style={{opacity:'0'}}>Stock bas</Badge>

    const displayConsoMois = consovolant => consovolant.ConsoMois.map(moisData => <TableConsoMois key={moisData.id} moisData={moisData}/>)

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