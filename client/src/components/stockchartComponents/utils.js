import { csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";
import { Parser } from 'json2csv'
// import { stocks } from './currencyTestData'
// import { newRes } from '../../practice'


export function parseData(parse) {
	return function(d) {
        d.open = +d.regularMarketOpen;
        d.date = parse(d['regularMarketTime.date'].split(' ')[0])
		d.high = +d.regularMarketDayHigh;
		d.low = +d.regularMarketDayLow;
		d.close = +d.regularMarketPreviousClose;
        d.volume = +d.regularMarketVolume;

        // console.log('inside parse func', d.date)

		return d;
	};
}

function parseData2(parse) {
	return function(d) {
        d.date = new Date(d.date)
        d.open = +d.open *100;
		d.high = +d.high *100;
		d.low = +d.low *100;
		d.close = +d.close *100;

        // console.log('inside parse func', d.date)

		return d;
	};
}

export const parseDate = timeParse("%Y-%m-%d");

//create fields for csv
// const fields = ["regularMarketDayHigh", "regularMarketDayLow","regularMarketOpen", "regularMarketPreviousClose", "regularMarketVolume", "regularMarketTime.date"]
// const json2csvParser = new Parser({fields})
//parse stock data array of object to csv (all in string form)
// const csv = json2csvParser.parse(stocks)

// console.log(csv)

//testing data is parsed properly
// const practice_data = csvParse(csv, parseData(parseDate))
// console.log('hello', practice_data)

//export getData to useEffect
//parse string data into int and parse date into correct format

// const fields2 = ["date", "high","low", "open", "close"]
// const json2csvParser2 = new Parser({fields2})
// const csv2 = json2csvParser2.parse(newRes)
// const practice_data2 = csvParse(csv2, parseData2(parseDate))
// console.log('mycv',csv2,)
// console.log(practice_data2)

export function DataToCsv(data){
	// return csvParse(csv, parseData(parseDate))
	// const body = {"coin_id": "bitcoin", "days": 14, "vs_currency": "usd"}
	// const res = await fetch('/api/coins/', {
	// 	method: 'PUT',
	// 	headers: {
	// 		'Content-Type': 'application/json'
	// 	},
	// 	body: JSON.stringify(body)
	// })
	// const fetchedData = await res.json()
	const alteredFetchedData = data.map(marketData => {
		return {
		  date: new Date(marketData[0]) + ''.split('T')[0],
		  open: marketData[1],
		  high: marketData[2],
		  low: marketData[3],
		  close: marketData[4]
		}
	  })
	const fields2 = ["date", "high","low", "open", "close"]
	const json2csvParser2 = new Parser({fields2})
	const csv2 = json2csvParser2.parse(alteredFetchedData)
	return csvParse(csv2, parseData2(parseDate))

}
