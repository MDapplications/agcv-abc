import React from 'react'
import { Table as TableSUI } from 'semantic-ui-react'

const Table = ({table, body, header, displayData}) => {

    const displayHeader = header.map(headerCell => {
        return (
            <TableSUI.HeaderCell 
                key={headerCell.index}
                collapsing={headerCell.collapsing} 
                textAlign={headerCell.textAlign}
                style={headerCell.style}>
                    {headerCell.caption}
            </TableSUI.HeaderCell>
        )
    })

    return (
        <TableSUI className={table.className} color={table.color} inverted>
            <TableSUI.Header>
                <TableSUI.Row>
                    {displayHeader}
                </TableSUI.Row>
            </TableSUI.Header>
            
            <TableSUI.Body style={body.style}>
                {displayData}
            </TableSUI.Body>
        </TableSUI>
    )
}

export default Table
