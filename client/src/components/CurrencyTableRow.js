import React from 'react'
import {useHistory} from 'react-router-dom'
import { useSelector } from 'react-redux'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const CurrenceyTableRow = ({row}) => {
    const history = useHistory()
    const coins = useSelector(state => state.search)

    const handleClick = (e) =>{
        const coinId = coins.filter(coin => {
            return (coin.name === e.target.innerHTML.trim())
        })
        history.push(`/coins/${coinId[0].id}`)
    }

    return (
        <TableRow key={row.name}>
            <TableCell component="th" scope="row" onClick={handleClick}> {row.name} </TableCell>
            <TableCell align="right">{row.symbol}</TableCell>
            <TableCell align="right">{row.current_price}</TableCell>
            <TableCell align="right">{row.market_cap_change_percentage_24h}</TableCell>
            <TableCell align="right">{row.market_cap}</TableCell>
        </TableRow>
    )
}

export default CurrenceyTableRow
