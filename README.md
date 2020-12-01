## Features 
- [Features Overview](#Features-Overview)
- [Purchase histroy](#Purchase-histroy)
- [Dynamically updated crypto currency search bar](#Dynamically-updated-crypto-currency-search-bar)
- [Dynamically generated stockcharts candlestick graph](#Dynamically-generated-stockcharts-candlestick-graph)
   - Coingecko stocks API integration
- [Crypto currency buying power simulator](#Crypto-currency-buying-power-simulator)
- [Sparkline integration](#Sparkline-integration)
- [User crypto currency list (watchlist)](#List)
- [CSRF protection on login and sign up forms](#CSRF-protection-on-login-and-sign-up-forms)
   - User authentication and authorization


## Technologies 
- Flask
- SQLAlchemy
- PostgreSQL
- React/Redux
- Coingecko API
- Docker/Heroku deploy

## Notable packages
- Materialui
- React-Stockchartjs
- React-SparkLines
- React Icons
- Flask Migrate
- WTForms
- pycoingecko (API wrapper)

## Installation
1. Clone the repository

   ```bash
   $ git clone https://github.com/theuncoolgirl/aaBlueJay.git
   ```
2. Install dependencies
   ```bash
   $ pipenv install --dev -r dev-requirements.txt --python=python3 && pipenv install -r requirements.txt
   $ pipenv install alembic Flask-Migrate
   ```

3. Open psql and create user and database

   - Create user "bluejay" with password "<<super_strong_secret_password>>"
   - Create database bluejay_dev_db with owner bluejay


4. Create .flaskenv with:
    ```bash
   FLASK_APP=starter_app
   ```

5. create a .env and add configuration modeled below: 

   ```
   DATABASE_URL=postgresql://username:password@localhost/database_name
   SECRET_KEY=<<super_secret_key>>
   ```


6. migrate to database

   ``` pipenv shell
    $ flask db init
    $ flask db migrate 
    $ flask db upgrade
   ```

5. Activate python shell and seed database

   ```bash
   $ pipenv shell
   ```

   ```
   $ python -m database && flask run
   ```

***
*IMPORTANT!*
   If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
   You can do this by running:
   ```bash
    $ pipenv lock -r > requirements.txt
   ```

*ALSO IMPORTANT!*
   $ psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.



## Features Overview

BlueJay is a robinhood clone meant to explore, retrieve, and graphically model crypto currency data from the Coingecko API of which gives access to current and historical currency/stock information. Major features are highlighted below, but the app has much potenitial in implementing additional goals of social iteraction (friends list), recommendations (made by friends), account profile settings, networth calculations, and dark mode to name a few.

> Current Status: ongoing development

### Purchase histroy
***
Firstly, upon login, you are greeted with a purchase histories page that showscases all the users recent crypto currency transactions apart of the buying power trade simulation on the coin details [page](#Dynamically-generated-stockcharts-candlestick-graph). Sold items (red) and purchased items (green) are displayed with each transaction.

 ![purchases](readmeImages/purchases.png)


### Dynamically updated crypto currency search bar
***
![](readmeImages/searchbar.gif)

Through a series of essential functions called upon keypress (illustrated below), the current search term is lower-cased and cross referenced by the store that houses over 6000 relevant crypto-currencies. The `allCoins` slice of state holds keys referencing their name and ticker symbol. Once enter is pressed `handleSearch` function adds the term onto the history to direct the user to the selected coin details page and cleared using a `reset` boolean state. 

```js
//ComboBox component

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
```

### Dynamically generated stockcharts candlestick graph
***

The stockcharts graph dynamically generates candlestick data modeling `high`, `low`, `open`, and `close` values for the selected crypto currency. [Here](https://www.ig.com/us/trading-strategies/candlestick-trading-explained-181218?&CHID=1&QPID=2934542669&QPPID=1&gclid=Cj0KCQjwufn8BRCwARIsAKzP697iO3QSChfXja0ugFUKuKw0-LtsMDb1NIQzsG2G4HpiSqGta0ASgdwaAm60EALw_wcB&gclsrc=aw.ds) is a link to learn more on how to read candlestick data. Red indicates the close value is higher than the open, while green represents the open value is higher than the close value.

![](readmeImages/stockchart.gif)

The data from the graph is fetched in the backend using a `PUT` request from the `getCoinDetails` thunk to route `/api/coins` which pings the api. An api wrapper is used query the api in two seperate transactions to retrieve general coin information (`cg.get_coin_by_id`) as well as historical market data for the coin (`cg.get_coin_ohlc_by_id`). Both responses are formatted and placed on one object to be easily incorporated into one slice of state in redux store (`data = {**coin_data, "chart_data": chart_data}`) 

```py
@coin_routes.route("/", methods=["PUT"])
def coin():
    coin_id, days, vs_currency = request.json.values()

    coin_data = cg.get_coin_by_id(
        id=coin_id,
        localization="false",
        tickers="false",
        market_data="true",
        community_data="false",
        developer_data="false",
        sparkline="false",
    )

    chart_data = cg.get_coin_ohlc_by_id(id=coin_id, vs_currency=vs_currency, days=days)

    data = {**coin_data, "chart_data": chart_data}

    res = {
        "description": data["description"]["en"],
        "id": data["id"],
        "name": data["name"],
        "symbol": data["symbol"],
        "current_price_usd": data["market_data"]["current_price"],
        "percent_change_usd": data["market_data"][
            "market_cap_change_percentage_24h_in_currency"
        ],
        "price_change_usd": data["market_data"]["price_change_24h_in_currency"],
        "chart_data": data["chart_data"],
    }
    return res
```

The stockcharts candlestick graph requires properly formatted csv data. After the data object containing coin data and chart data is sent back to the getCoinDetail thunk, the data is converted to csv object using the `DataToCsv` function. 

```js
//getCoinDetail thunk

if (response.status >= 200 && response.status < 400) {
                const data = await response.json();
                data.chart_data = DataToCsv(data.chart_data)
                //new formatted data is dispatched to redux store
                dispatch(receiveCoinDetails(data))
            } else {
                console.error('Bad response');
            }
```

```js
//util.js

function parseData2() {
	return function(d) {
        d.date = new Date(d.date)
        d.open = +d.open *100;
		d.high = +d.high *100;
		d.low = +d.low *100;
		d.close = +d.close *100;
		return d;
	};
}

//parsing the date to the correct format for the candlestickchart
export function DataToCsv(data){
	//extracting the correct data from the chart data json object fetched from the api
	const alteredFetchedData = data.map(marketData => {
		return {
		  date: new Date(marketData[0]) + ''.split('T')[0],
		  open: marketData[1],
		  high: marketData[2],
		  low: marketData[3],
		  close: marketData[4]
		}
	  })

	//creating fields for csv data format
	const fields2 = ["date", "high","low", "open", "close"]
	//creating a new instance of csv data with the formatted fields
	const json2csvParser2 = new Parser({fields2})
	const csv2 = json2csvParser2.parse(alteredFetchedData)
	//returning the csv data into formatted objects the chart can use for data inputs
	return csvParse(csv2, parseData2())

}

```

### Crypto currency buying power simulator
***
The buying power simulator allows the user to purchase and sell cryto currencies. We had in mind additional simulation features to scale it up including networth calculations, list displaying all purchased currencies, and the ability to add more money into the bank. The simulation dynamically updates the cash in the user slice of state as well as updating the user's cash and purchase history in the database. 

![](readmeImages/buyingPower.gif)

The `BuyingPower` component calculates the total qty a user has of a paticular cryptocurrency upon mounting, symbol (currency page) change, or update in purchase history by subscribing to the purchase history slice of state. The purchaes history model hold positive values for purchases and negative values for sold currencies so the reducer is used to determine the difference which returns the current quantity possesed. 

```js
useEffect(() => {
   const getPurchaseQty = () => {
      const foundPurchases = purchases.filter(purchase => purchase.tickerSymbol === symbol)
      if (foundPurchases.length > 0) {
            const totalQtyOfPurchase = foundPurchases.reduce((acc, curr) => {
               return acc + curr.purchaseQuantity
            }, 0)

            //return qty with 1 decimal place
            setQtyOfPurchase(Number((totalQtyOfPurchase).toFixed(1)))
      } else {
            setQtyOfPurchase(0)
      }
   }
   return getPurchaseQty()
}, [symbol, purchases])
```

The buying power modal will disable the buy button if the user is out of money or the user doesn't have enough money to purchase atleat one qty. The sell button is disabled if the user doesn't have any amount of the particular crypto currency to sell.

```js
<DialogActions>
   {/* disable buy button if there is no money in the bank or if the user doen't have enough money to buy atleast qty of 1 */}
   {bank == 0 || maxQtyToPurchase === 0 ? 
   <Button onClick={buy} disabled={true} color="primary">
   Buy
   </Button>:
   <Button onClick={buy} color="primary">
   Buy
   </Button>}

   {/*disable sell button if purchase qty is 0 */}
   {qtyOfPurchase > 0 ? <Button onClick={sell} color="primary" autoFocus>
      Sell
      </Button> :
      <Button onClick={sell} disabled={true} color="primary" autoFocus>
            Sell
      </Button>}
</DialogActions>
```

### Sparkline integration
***
Sparkline integration showing 7 day snapshot of crypto currency. The spakline line is green if the overall trend is positive and red if the overall trend is negative. The coingecko api is utilized to retrieve the data to plot on the line graph. 

![sparkline](readmeImages/sparkLine.png)

### List 
***
The `DisplayLists` compoenent dynamically displays all the current lists that the user can create and add any crypto currency to subscribe to so the user doesn't have to search for it each time. The lists are stored in the redux store under the `list` slice of state. 

```js
// DisplayLists component 

const userLists = useSelector(state => state.list.lists);
  const id = useSelector(state=> state.session.id)
  const history = useHistory();


const handleClick = (e) => {
    e.preventDefault();
    const test = escape(e.target.id)
    console.log(test)    // console.log(e.target.id)
    history.push(`/list/${test}`);
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    const listName = e.target.id.split("-")[1]
    console.log(listName)
    dispatch(thunks.deleteListThunk(id, listName))
  }

  return (
    <>
      <Paper className={classes.sideCard} style={{ overflowY: 'scroll' }} elevation={3}>
        <Typography variant="h5">Lists</Typography>
        <Divider style={{marginBottom: 0}} className={classes.divider} />
        <div className={classes.spacer}>
          <Typography variant="subtitle2">
            {userLists ? userLists.map(list => (
               <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} className='list-div' key={list[0]} id={list[0]} onClick={handleClick}>
                  <span style={{marginLeft: '35%'}}>{list[0]}</span>
                  <RemoveIcon onClick={handleDelete} style={{float:"right"}} id={`list-${list[0]}`} />
                  </div>
                     <Divider style={{margin: 0}} className={classes.divider} />
               </>
                     ))
                        : null}
          </Typography>
          <ListModal style={{ position: 'absolute', marginTop: "30" }} />
        </div>
      </Paper>
    </>
  )
}

```


### CSRF protection on login and sign up forms
***
The csrf token is fetched from the backend api and appended to each request for login and signup

```js
 const XSRFTOKEN = await fetch('/api/users/get_csrf')
  const token = (await XSRFTOKEN.json())

  const res = await fetch('/api/users/logout', {
    method: "POST",
    headers: {
      'X-CSRFToken': token.csrfT
    },
  });
```


