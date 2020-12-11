import { csvParse } from  "d3-dsv";
// import { timeParse } from "d3-time-format";
import { Parser } from 'json2csv'

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
