const LOAD_ALL_FRIENDS = 'bluejay/friends/LOAD_ALL_FRIENDS'

const loadAll = (friends) => {
    return {
        type: LOAD_ALL_FRIENDS,
        friends
    }
}

export const load_friends = (id) => async dispatch => {
    const res = await fetch(`/api/users/friends/${id}`)
    if (res.ok) {
        const friends = await res.json()
        dispatch(loadAll(friends))
      }
}

export default function reducer(state=[], action) {
    switch (action.type) {
      case LOAD_ALL_FRIENDS:
        return action.friends.friends;
      default:
        return state;
    }
  }
