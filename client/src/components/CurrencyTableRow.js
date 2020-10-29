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

    const handleDelete = (e) => {
        const currencyListId = e.target.id
        dispatch(thunks.deleteWatchlistItem(currencyListId))
    }

    const plotSparkData = (stockData) => {
        return stockData.sparkline_in_7d.price
    }

    return (
        <TableRow key={row.name}>
            <TableCell component="th" scope="row" onClick={handleClick}> {row.name} </TableCell>
            {spark ? <TableCell>
                <Spark data={plotSparkData(row)} id={row.symbolId + "-spark"} />
            </TableCell> : null}
            <TableCell align="right">{row.symbol}</TableCell>
            <TableCell align="right">{row.current_price}</TableCell>
            <TableCell align="right">{row.market_cap_change_percentage_24h}</TableCell>
            <TableCell align="right">{row.market_cap}</TableCell>
            {deleteIcon ? <RemoveIcon onClick={handleDelete} id={row.symbolId} /> : null}
        </TableRow>
    )
}

export default CurrenceyTableRow
