import React from 'react';
import { useHistory } from 'react-router-dom'
import { TextField } from '@material-ui/core/';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useSelector } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles';
import { theme, useStyles } from '../styles.js';

export default function ComboBox() {
  const classes = useStyles();
  const history = useHistory()
  const coins = useSelector(state => state.search)

  const handleSearch = (e) => {
    e.preventDefault()
    const coinId = coins.filter(coin => {
      return (coin.name === e.target.innerHTML.trim())
    })
    if (coinId.length === 0) {
      return
    }
    history.push(`/coins/${coinId[0].id}`)
  }
  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      const results = coins.filter(coin => {
        return ((coin.name.toLowerCase().includes(e.target.value.toLowerCase().trim()))
          || (coin.symbol.toLowerCase().includes(e.target.value.toLowerCase().trim())))
      })
      const exactResults = results.filter(coin => {
        return ((coin.name.toLowerCase() === (e.target.value.toLowerCase().trim()))
          || (coin.symbol.toLowerCase() === e.target.value.toLowerCase().trim()))
      })

      if (results.length === 0) {
        history.push(`/404`)
      } else if (exactResults.length === 1) {
        history.push(`/coins/${exactResults[0].id}`)
      } else {
        history.push(`/results`, results)
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.searchDiv}>
        <Autocomplete
          id="custom-input-demo"
          size="small"
          onChange={handleSearch}
          options={coins.map((option) => option.name || option.symbol)}
          renderInput={(params) => (
            <TextField {...params} label="Search Coins" variant="filled" onKeyDown={(e) => handleEnter(e)} />
          )}
        />
      </div>
    </ThemeProvider>
  );
}
