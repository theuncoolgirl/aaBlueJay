import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { load_purchase_history } from '../store/purchase'


const PurchaseHistory = () => {
    const dispatch = useDispatch()
    const id = useSelector(state => state.session.id);

    useEffect(()=>{
        dispatch(load_purchase_history(id))
      // eslint-disable-next-line
    }, [id])

    if (!id) {
        return <Redirect to="/" />;
    }

    return (
        <h1>test</h1>
    )
}

export default PurchaseHistory