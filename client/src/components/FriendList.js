import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { load_friends } from '../store/friends'


const FriendList = () => {
    const dispatch = useDispatch()
    const id = useSelector(state => state.session.id);
    const friends = useSelector(state => state.friends)

    useEffect(()=>{
        dispatch(load_friends(id))
      // eslint-disable-next-line
    }, [id])

    if (!id) {
        return <Redirect to="/" />;
    }

    return (
    friends.map(friend => <div>{friend.firstname}</div>)
    )
}

export default FriendList
