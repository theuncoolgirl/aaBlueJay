import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import BuyingPowerModal from './BuyingPowerModal'
import Typography from '@material-ui/core/Typography';
import { loadSuccessMessage } from '../store/success_message';


const BuyingPower = (props) => {
    const dispatch = useDispatch()

    const { symbol, currentPrice } = props

    const bank = useSelector(state => state.session.cash)
    const currentUserId = useSelector(state => state.session.id)
    const purchases = useSelector(state => state.purchase)
    const successMessage = useSelector(state => state.success_message.message)

    const [qtyOfPurchase, setQtyOfPurchase] = useState(null)

    //modal logic
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
        dispatch(loadSuccessMessage(null));
    };

    const handleClose = () => {
        setOpen(false);
    };

    //using purchases populated in the store
    //only update purchase qty if symbol changed
    useEffect(() => {
        const getPurchaseQty = () => {
            const foundPurchases = purchases.filter(purchase => purchase.tickerSymbol === symbol)
            if (foundPurchases.length > 0) {
                const totalQtyOfPurchase = foundPurchases.reduce((acc, curr) => {
                    return acc + curr.purchaseQuantity
                }, 0)

                //return qty with 1 decimal place
                setQtyOfPurchase(Number((totalQtyOfPurchase).toFixed(1)))
            } else {
                setQtyOfPurchase(0)
            }
        }
        return getPurchaseQty()
    }, [symbol, purchases])

    return (
        <>
            <Typography variant='subtitle1'>Buying Power:</Typography>
            <Typography variant='subtitle1'>You have $<span style={{ color: "rgba(63,81,181,0.9)" }}>{bank}</span> in your bank</Typography>
            <Typography variant='subtitle2'>and</Typography>
            <Typography variant='subtitle1'>You have <span style={{ color: "rgba(63,81,181,0.9)" }}>{qtyOfPurchase}</span> {symbol.toUpperCase()}</Typography>
            <Button variant="contained" color="primary" onClick={handleOpen} style={{marginTop: 15, marginBottom: 25}}>
                Buy/Sell
            </Button>
            {successMessage ? (
                <Typography variant='subtitle1' style={{ color: 'green' }}>{successMessage}</Typography>
            ) : null}
            <BuyingPowerModal
                onClose={handleClose}
                open={open} bank={bank}
                qtyOfPurchase={qtyOfPurchase}
                currentPrice={currentPrice}
                currentUserId={currentUserId}
                symbol={symbol}
                purchases={purchases}
            />

        </>
    )
}

export default BuyingPower;