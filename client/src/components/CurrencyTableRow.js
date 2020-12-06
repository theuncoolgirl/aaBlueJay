import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import RemoveIcon from '@material-ui/icons/Remove';
import { thunks } from '../store/list';
import { Spark } from './SparkLine';

const CurrenceyTableRow = ({ row, deleteIcon, spark, listIdToDelete }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const coins = useSelector(state => state.search.allCoins)

    const handleClick = (e) => {
        const coinId = coins.filter(coin => {
            return (coin.name === e.target.innerHTML.trim())
        })
        history.push(`/coins/${coinId[0].id}`)
    }

    const handleDelete = (symbolToDelete) => {
        dispatch(thunks.deleteWatchlistItem(listIdToDelete, symbolToDelete))
    }

    const plotSparkData = (stockData) => {
        return stockData.sparkline_in_7d.price
    }

    const todayColor = String(row.market_cap_change_percentage_24h)[0] === "-" ? 'red' : 'green';

    return (
        <TableRow key={row.name}>
            <TableCell component="th" scope="row" onClick={handleClick} > {row.name} </TableCell>
            {spark ? <TableCell>
                <Spark data={plotSparkData(row)} id={row.symbolId + "-spark"} />
            </TableCell> : null}
            <TableCell align="right">{row.symbol}</TableCell>
            <TableCell align="right">${row.current_price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
            <TableCell align="right" style={{ color: todayColor }}>% {row.market_cap_change_percentage_24h}</TableCell>
            <TableCell align="right">${row.market_cap.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
            {deleteIcon ? <TableCell align="center" id={row.symbolId}>
                <RemoveIcon onClick={() => handleDelete(row.symbol)} id={row.symbolId} />
            </TableCell>
                : null}
        </TableRow>
    )
}

export default CurrenceyTableRow
