import React, { useState } from 'react'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { useStyles } from '../App'
import { addPurchase } from '../store/purchase'
import { useSelector, useDispatch } from 'react-redux';

const BuyingPower = () => {
    const dispatch = useDispatch()
    const [bank, setBank] = useState(1000)
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
        e.preventDefault()
        //hard coded price qty and price for now
        dispatch(addPurchase(currentUserId, 200, 3))
        console.log(currentStock)
    }

    return (
        <>
            <h2>buying power comp</h2>
            <h4>you have ${bank} in your bank</h4>
            <h4>You are subscribed to:</h4>
            <form onSubmit={buyStock} className='buying-power-form'>
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
                <Button variant="contained" color="primary" type='submit'>
                    Buy Stock
                </Button>
            </form>
            <h4>the current time is: <br /> {`${new Date()}`}</h4>
        </>
    )
}

export default BuyingPower;