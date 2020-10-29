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
    const bank = useSelector(state => state.session.cash)
    const [stocksHeld, setStocksHeld] = useState([
        'dogecoin',
        'bitcoin'
    ])
    const [currentStock, setCurrentStock] = useState('')
    const currentUserId = useSelector(state => state.session.id)
    const currentTime = new Date()
    const classes = useStyles()

    const handleChange = (event) => {
        setCurrentStock(event.target.value);
    };

    const buyStock = (e) => {
        //hard coded price qty and price for now
        dispatch(addPurchase(currentUserId, 200, 3))
    }

    const deleteStock = (e) => {
        // dispatch(deletePurchase(currentUserId, ))
        console.log(currentStock)
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
                        value={currentStock}
                        onChange={handleChange}
                        label="currency"
                    >
                        <MenuItem value="">
                            <em>Select One</em>
                        </MenuItem>
                        {stocksHeld.map((stock, i) => {
                            return <MenuItem key={i} value={stock}>{stock}</MenuItem>
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
            <h4>the current time is: <br /> {`${new Date()}`}</h4>
        </>
    )
}

export default BuyingPower;