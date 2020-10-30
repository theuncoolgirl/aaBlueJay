import { Container } from "@material-ui/core";
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
        <Container>
            {rows.map((row) => (
                <span style={{margin:'10px'}} key={row.name}>{row.name}</span>
            ))}
        </Container>
      </>
    )
}

export default SearchResults
