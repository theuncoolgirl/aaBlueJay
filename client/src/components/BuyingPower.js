import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import BuyingPowerModal from './BuyingPowerModal'

const BuyingPower = (props) => {
    const { symbol, currentPrice } = props

    const bank = useSelector(state => state.session.cash)
    const currentUserId = useSelector(state => state.session.id)
    const purchases = useSelector(state => state.purchase)

    const [qtyOfPurchase, setQtyOfPurchase] = useState(null)

    //modal logic
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //using purchases populated in the store
    //only update purchase qty if symbol changed
    useEffect(() => {
        const getPurchaseQty = () => {
            const foundPurchases = purchases.filter(purchase => purchase.tickerSymbol == symbol)
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
            <h2>Buying Power</h2>
            <h4>you have $<span style={{ color: "rgba(255,0,0,0.9)" }}>{bank}</span> in your bank</h4>
            <h4>You have a purchase quantity of <span style={{ color: "rgba(255,0,0,0.9)" }}>{qtyOfPurchase}</span> in {symbol.toUpperCase()}</h4>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Buy/Sell
            </Button>
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