import React from 'react';
import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useSelector } from 'react-redux'

export default function ComboBox() {
  const history = useHistory()
  const coins = useSelector(state => state.search)

  const handleSearch = (e) =>{
    e.preventDefault()
    const coinId = coins.filter(coin => {
      return (coin.name === e.target.innerHTML.trim())
    })
    history.push(`/coins/${coinId[0].id}`)
  }

  const handleEnter = (e) =>{
      if (e.key === 'Enter') {
          console.log(e.target.value)
          const results = coins.filter(coin => {
            return ((coin.name.toLowerCase().includes(e.target.value.toLowerCase().trim()))
                    ||(coin.symbol.toLowerCase() === e.target.value.toLowerCase().trim()))
          })
          const exactResults = results.filter(coin => {
            return ((coin.name.toLowerCase() === (e.target.value.toLowerCase().trim()))
            ||(coin.symbol.toLowerCase() === e.target.value.toLowerCase().trim()))
          })
          console.log(results.length)
          console.log(exactResults.length)

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
    <div style={{ width: 300 }}>
        <Autocomplete
        id="free-solo-demo"
        onChange={handleSearch}
        options={coins.map((option) => option.name || option.symbol)}
        renderInput={(params) => (
        <TextField {...params} label="Search Coins" margin="normal" onKeyDown={(e) => handleEnter(e)} variant="outlined" />
        )}
        />
    </div>
  );
}
