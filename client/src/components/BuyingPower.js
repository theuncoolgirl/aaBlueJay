import React, { useState } from 'react'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { useStyles } from '../App'
import { addPurchase, deletePurchase } from '../store/purchase'
import { useSelector, useDispatch } from 'react-redux';

const BuyingPower = () => {
    const dispatch = useDispatch()

    const [currentStockId, setCurrentStockId] = useState('')
    const [selectedTickerSymbol, setSelectedTickerSymbol] = useState('')

    const bank = useSelector(state => state.session.cash)
    const currentUserId = useSelector(state => state.session.id)
    const purchaseTickerSymbols = useSelector(state => state.purchase)

    const classes = useStyles()

    const handleChange = (e) => {
        //ticker symbol and id in db is stored in the select menu item value as an array so you need to index
        //it to get the specific value -- an example would be [28, "ewt"]
        setCurrentStockId(e.target.value[0])
        setSelectedTickerSymbol(e.target.value[1])
    };

    const buyStock = (e) => {
        //hard coded price qty and price for now
        dispatch(addPurchase(currentUserId, selectedTickerSymbol, 200, 3))
    }

    const deleteStock = (e) => {
        dispatch(deletePurchase(currentUserId, currentStockId))
    }

    return (
        <>
            <h2>Buying Power</h2>
            <h4>you have ${bank} in your bank</h4>
            <h4>You are subscribed to:</h4>
            <form className='buying-power-form'>
                <FormControl variant="outlined" size='small' className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Currency</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={currentStockId}
                        onChange={handleChange}
                        label="currency"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {purchaseTickerSymbols.map((purchase, i) => {
                            return <MenuItem key={i} value={[purchase.id, purchase.tickerSymbol]}>{purchase.tickerSymbol}</MenuItem>
                        }
                        )}

                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" onClick={buyStock}>
                    Buy Stock
                </Button>
                <Button variant="contained" color="secondary" onClick={deleteStock}>
                    Delete Stock
                </Button>
            </form>
        </>
    )
}

export default BuyingPower;