import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom'
import { TextField } from '@material-ui/core/';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useDispatch, useSelector } from 'react-redux'
// import useStyles from '../styles.js';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { loadCurrentResults } from '../store/search_coins'

const theme = createMuiTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiButton: {
      // Name of the rule
      text: {
        // Some CSS
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
    },
    MuiInput: {
      formControl: {
        "label + &": {
          marginTop: "auto",
          marginBottom: "auto"
        }
      }
    },
    MuiInputLabel: {
      formControl: {
        top: -8,
      }
    },
    MuiAutocomplete: {
      root: {
        height: 30,
        maxHeight: 30,
      },
      input: {
        paddingLeft: 0,
        '&:first-child': {
          paddingLeft: 1,
        },
      },
      inputRoot: {
        '&&[class*="MuiFilledInput-root"]': {
          padding: 1
        }
      }
    },
    MuiFilledInput: {
      root: {
        backgroundColor: "white",
        border: "1px solid lightgray",
        borderRadius: 4
      },
      underline: {
        '&:hover': {
          '&:before': {
            borderBottom: "none"
          }
        },
        '&:before': {
          borderBottom: "none"
        },
        '&:after': {
          borderBottom: "none"
        }
      }
    }
  },
});

export default function ComboBox() {
  // const classes = useStyles();
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
    if (e.key === 'Enter') {
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
        history.push(`/results`, results)
      }
    }
  }


  return (
    <ThemeProvider theme={theme}>
      <div style={{ marginLeft: "8.5%", width: "40%" }}>
        <Autocomplete
          id="custom-input-demo"
          size="small"
          value={reset}
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
