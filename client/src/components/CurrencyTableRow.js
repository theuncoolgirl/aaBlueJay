import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import RemoveIcon from '@material-ui/icons/Remove';
import { thunks } from '../store/list';
import { Spark } from './SparkLine';
import { Table } from '@material-ui/core';

const CurrenceyTableRow = ({ row, deleteIcon, spark }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const coins = useSelector(state => state.search)

    const handleClick = (e) => {
        const coinId = coins.filter(coin => {
            return (coin.name === e.target.innerHTML.trim())
        })
        history.push(`/coins/${coinId[0].id}`)
    }

    const handleDelete = (currencyListId) => {
        // const currencyListId = e.target.symbol
        console.log(currencyListId)
        dispatch(thunks.deleteWatchlistItem(currencyListId))
    }

    const plotSparkData = (stockData) => {
        return stockData.sparkline_in_7d.price
    }

    return (
        <TableRow key={row.name} id={row.symbolId}>
            <TableCell component="th" scope="row" onClick={handleClick} > {row.name} </TableCell>
            {spark ? <TableCell>
                <Spark data={plotSparkData(row)} id={row.symbolId + "-spark"} />
            </TableCell> : null}
            <TableCell align="right">{row.symbol}</TableCell>
            <TableCell align="right">{row.current_price}</TableCell>
            <TableCell align="right">{row.market_cap_change_percentage_24h}</TableCell>
            <TableCell align="right">{row.market_cap}</TableCell>
            {deleteIcon ? <TableCell align="center" id={row.symbolId}> <RemoveIcon onClick={() => handleDelete(row.symbol)} id={row.symbolId} /> </TableCell> : null}
        </TableRow>
    )
}

export default CurrenceyTableRow
