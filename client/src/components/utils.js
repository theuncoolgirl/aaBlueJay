import { csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";
import { Parser } from 'json2csv'
import { stocks } from './currencyTestData'

function parseData(parse) {
	return function(d) {
        d.open = +d.regularMarketOpen;
        d.date = parse(d['regularMarketTime.date'].split(' ')[0])
		d.high = +d.regularMarketDayHigh;
		d.low = +d.regularMarketDayLow;
		d.close = +d.regularMarketPreviousClose;
        d.volume = +d.regularMarketVolume;
        
        console.log('inside parse func', d.date)
        
		return d;
	};
}

const parseDate = timeParse("%Y-%m-%d");

//create fields for csv
const fields = ["regularMarketDayHigh", "regularMarketDayLow","regularMarketOpen", "regularMarketPreviousClose", "regularMarketVolume", "regularMarketTime.date"]
const json2csvParser = new Parser({fields})
//parse stock data array of object to csv (all in string form)
const csv = json2csvParser.parse(stocks)

console.log(csv)

//testing data is parsed properly
const practice_data = csvParse(csv, parseData(parseDate))
console.log('hello', practice_data)

//export getData to useEffect
//parse string data into int and parse date into correct format
export function getData(){
    return csvParse(csv, parseData(parseDate))
}
