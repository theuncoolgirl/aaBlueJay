import React from "react";
import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';

const SearchResults = () => {
    const rows = useLocation().state
    const token = useSelector(state => state.session.id);

    if (!token) {
        return <Redirect to="/" />;
    }

    return (
        <>
        {rows.map((row) => (
            <span style={{margin:'10px'}}>{row.name}</span>
        ))}
      </>
    )
}

export default SearchResults
