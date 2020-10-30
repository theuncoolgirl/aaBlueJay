import React from 'react'
import { useSelector } from 'react-redux'
import { Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core';

const ErrorContainer = () => {
    const errors = useSelector(state=> state.session.errors)

    if (!errors) {
        return null
    }
    const errArr = Object.entries(errors)
    const formattedErrors = []

    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s[0].toUpperCase() + s.slice(1)
    }

    for (let err of errArr) {
        for(let e of err[1]) {
            formattedErrors.push(capitalize(err[0]) + e.slice(4))
        }
    }

    return(
    <Container>
    {formattedErrors.map(err => <div>{err}</div>)}
    </ Container>
    )
}

export default ErrorContainer
