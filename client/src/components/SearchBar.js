import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { TextField } from '@material-ui/core/';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useDispatch, useSelector } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles';
import { loadCurrentResults } from '../store/search_coins'
import { theme, useStyles } from '../styles.js';

export default function ComboBox() {
  const classes = useStyles();
  const history = useHistory()
  const dispatch = useDispatch()
  const coins = useSelector(state => state.search.allCoins)
  const [reset, setReset] = useState(false)

  const handleSearch = (e) => {
    const coinId = coins.filter(coin => {
      return (coin.name === e.target.innerHTML.trim())
    })

    if (coinId.length === 0) {
      return
    }
    setReset(!reset)
    history.push(`/coins/${coinId[0].id}`)
  }
  const handleEnter = (e) => {
    // console.log(e)
    if (e.key === 'Enter') {
      e.preventDefault()
      const results = coins.filter(coin => {
        return ((coin.name.toLowerCase().includes(e.target.value.toLowerCase().trim()))
          || (coin.symbol.toLowerCase().includes(e.target.value.toLowerCase().trim())))
      })
      const exactResults = results.filter(coin => {
        return ((coin.name.toLowerCase() === (e.target.value.toLowerCase().trim()))
          || (coin.symbol.toLowerCase() === e.target.value.toLowerCase().trim()))
      })

      setReset(!reset)

      if (results.length === 0) {
        history.push(`/404`)
      } else if (exactResults.length === 1) {
        history.push(`/coins/${exactResults[0].id}`)
      } else {
        dispatch(loadCurrentResults(results))
        history.push(`/results`)
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.searchDiv}>
        <Autocomplete
          id="custom-input-demo"
          size="small"
          key={`autocomplete-${reset}`}
          freeSolo={true}
          onChange={handleSearch}
          onKeyDown={(e) => handleEnter(e)}
          options={coins.map((option) => option.name || option.symbol)}
          renderInput={(params) => (
            <TextField {...params} placeholder="Search Coins" variant="filled" />
          )}
        />
      </div>
    </ThemeProvider>
  );
}
