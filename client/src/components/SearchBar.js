import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useSelector } from 'react-redux'

export default function ComboBox() {
  const coins = useSelector(state => state.search)

  const handleSearch = (e) =>{
      e.preventDefault()
    console.log(e.target.innerHTML)
  }

  const handleEnter = (e) =>{
      if (e.key = 'Enter') {
          console.log(e.target.value)
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


// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom'

// const SearchBar = () => {
//   const history = useHistory();
//   const dispatch = useDispatch();
// //   const query = useSelector(state => state.search.query)
//   const coins = useSelector(state => state.search)
// //   const titles = useSelector(state => state.articles.list.map(article => article.title))

// //   const updateSearch = (x) => dispatch(SearchActions.updateQuery(x))
// //   const updateResults = (sresults) => dispatch(SearchActions.updateSearchResultsTHUNK(sresults))
//     const [query, setQuery] = useState()

//   function filterList(q, list) {
//     function escapeRegExp(s) {
//       return s.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
//     }
//     const words = q
//       .split(/\s+/g)
//       .map(s => s.trim())
//       .filter(s => !!s);
//     const hasTrailingSpace = q.endsWith(" ");
//     const searchRegex = new RegExp(
//       words
//         .map((word, i) => {
//           if (i + 1 === words.length && !hasTrailingSpace) {
//             // The last word - ok with the word being "startswith"-like
//             return `(?=.*\\b${escapeRegExp(word)})`;
//           } else {
//             // Not the last word - expect the whole word exactly
//             return `(?=.*\\b${escapeRegExp(word)}\\b)`;
//           }
//         })
//         .join("") + ".+",
//       "gi"
//     );
//     return list.filter(coin => {
//       if (searchRegex.test(coin.symbol)){
//           return true
//       } else if (searchRegex.test(coin.name)) {
//           return true
//       } else {
//           return false
//       }
//       return searchRegex.test(coin.symbol);
//     });
//   }

//   const searchResultsHandler = e => {
//     e.preventDefault();
//     const results = filterList(query, coins)
//     console.log(results)
//     // updateResults(results)
//     // history.push('/articles')
//   }

//   const handleUpdate = e => {
//     e.preventDefault()
//     setQuery(e.target.value)
//     // const results = filterList(query, coins)
//     // updateSearch(e.target.value)
//   }

//   return (
//     <form onSubmit={searchResultsHandler} >
//     <input
//       onChange={handleUpdate}
//       value={query}
//       className="Search-bar"
//       type="text"
//       placeholder="Search Coins" />
//   </form>
//   )
// }

// export default SearchBar;
