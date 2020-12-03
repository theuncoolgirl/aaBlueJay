import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useStyles } from '../styles'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import * as RIIcons from 'react-icons/ri'
import { addPurchaseHistory } from '../store/purchase'

const BuyingPowerModal = (props) => {
    const dispatch = useDispatch()

    const { onClose, open, bank, qtyOfPurchase, currentPrice, currentUserId, symbol, purchases } = props

    const classes = useStyles();
    const [buySliderValue, setBuySliderValue] = useState(0)
    const [sellSliderValue, setSellSliderValue] = useState(0)

    useEffect(() => {
        console.log('rendering')
    }, [purchases])
    //functions for buying power modal to buy or sell
    const buy = () => {
        dispatch(addPurchaseHistory(currentUserId, symbol, currentPrice * buySliderValue, buySliderValue))
        onClose()
        setBuySliderValue(0)
    }

    const sell = () => {
        //multiplying  by -1 so that the purchase history will reflect as sold or selling
        dispatch(addPurchaseHistory(currentUserId, symbol, currentPrice*sellSliderValue*-1, sellSliderValue*-1))
        onClose()
        setSellSliderValue(0)
    }


    //function to make sure user can't purchase anything if unsufficient funds
    const maxQtyToPurchase = (() => {
        if (bank > currentPrice) {
            //return qty with 2 decimal places
            return Number((bank / currentPrice).toFixed(2))
        } else {
            return 0
        }
    })()

    //set marks/labels for modal slider
    const marksBuy = [
        {
            value: 0,
            label: '0'
        },{
            value: maxQtyToPurchase/2,
            label: `${maxQtyToPurchase/2}`
        },
        {
            value: maxQtyToPurchase,
            label: `${maxQtyToPurchase}`
        }
    ];

    const marksSell = [
        {
            value: 0,
            label: '0'
        },
        {
            value: qtyOfPurchase/2,
            label: `${qtyOfPurchase/2}`
        },
        {
            value: qtyOfPurchase,
            label: `${qtyOfPurchase}`
        }
    ]


    return (
        <div>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className='modal-title'><RIIcons.RiMoneyDollarCircleLine className='money-icon' /></DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        the current price is ${currentPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                    </DialogContentText>
                    <div className={classes.slider}>
                        <Typography id="discrete-slider-small-steps" gutterBottom>
                            Choose Buy Qty (max {maxQtyToPurchase}):
                        </Typography>
                        <Slider
                            defaultValue={0}
                            aria-labelledby="discrete-slider-small-steps"
                            step={0.1}
                            marks={marksBuy}
                            min={0}
                            valueLabelDisplay="auto"
                            max={maxQtyToPurchase}
                            value={buySliderValue}
                            onChange={(e, buyValue) => { setBuySliderValue(buyValue) }}
                        />
                    </div>
                    <div className={classes.slider}>
                        <Typography id="discrete-slider-small-steps" gutterBottom>
                            Choose Sell Qty (max {qtyOfPurchase}):
                        </Typography>
                        <Slider
                            defaultValue={0}
                            aria-labelledby="discrete-slider-small-steps"
                            step={0.1}
                            marks={marksSell}
                            min={0}
                            valueLabelDisplay="auto"
                            max={qtyOfPurchase}
                            value={sellSliderValue}
                            onChange={(e, value) => { setSellSliderValue(value) }}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    {/* disable buy button if there is no money in the bank or if the user doen't have enough money to buy atleast qty of 1 */}
                    {bank === 0 || maxQtyToPurchase === 0 ?
                    <Button onClick={buy} disabled={true} color="primary">
                    Buy
                    </Button>:
                    <Button onClick={buy} color="primary">
                    Buy
                    </Button>}

                    {/*disable sell button if purchase qty is 0 */}
                    {qtyOfPurchase > 0 ? <Button onClick={sell} color="primary" autoFocus>
                        Sell
                       </Button> :
                        <Button onClick={sell} disabled={true} color="primary" autoFocus>
                            Sell
                       </Button>}
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default BuyingPowerModal
