import React  from 'react'
import { Table } from 'semantic-ui-react'

const FooterConsoVolants = ({totalUsed, totalOrdered, totalPriceUsed, totalPriceOrdered}) => {

    //Affichage au format prix
    const currencyLocalPrice = prix => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prix)

    return (
        <Table.Row>
            <Table.HeaderCell id='th-total-uc' textAlign='center'>{totalUsed}</Table.HeaderCell>
            <Table.HeaderCell id='th-total-uc' textAlign='center'>{currencyLocalPrice(totalPriceUsed)}</Table.HeaderCell>
            <Table.HeaderCell id='th-total-uc' textAlign='center'>{totalOrdered}</Table.HeaderCell>
            <Table.HeaderCell id='th-total-uc' textAlign='center'>{currencyLocalPrice(totalPriceOrdered)}</Table.HeaderCell>
            <Table.HeaderCell id='th-total-prix' textAlign='center' verticalAlign='middle'></Table.HeaderCell>
        </Table.Row>
    )
}

export default FooterConsoVolants