import React from 'react'
import { useSelector } from 'react-redux'
import { Container } from '@material-ui/core';

const ErrorContainer = () => {
    const errors = useSelector(state => state.session.errors)

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
        for (let e of err[1]) {
            if (err[0] === "confirmpassword" && e === 'Passwords must match') {
                formattedErrors.push(e)
            } else if (err[0] === "confirmpassword") {
                formattedErrors.push(capitalize(err[0]) + e.slice(4))
            } else if (err[0] === "firstname") {
                formattedErrors.push("First name field is required")
            } else if (err[0] === "lastname") {
                formattedErrors.push("Last name field is required")
            } else {
                formattedErrors.push(capitalize(err[0]) + e.slice(4))
            }
        }
    }

    return (
        <Container>
            {formattedErrors.map(err => <div>{err}</div>)}
        </ Container>
    )
}

export default ErrorContainer
