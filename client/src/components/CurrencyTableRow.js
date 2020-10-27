import React from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const CurrenceyTableRow = ({row}) => {
    return (
        <TableRow key={row.name}>
            <TableCell component="th" scope="row">
            {row.name}
            </TableCell>
            <TableCell align="right">{row.symbol}</TableCell>
            <TableCell align="right">{row.current_price}</TableCell>
            <TableCell align="right">{row.market_cap_change_percentage_24h}</TableCell>
            <TableCell align="right">{row.market_cap}</TableCell>
        </TableRow>
    )
}

export default CurrenceyTableRow
