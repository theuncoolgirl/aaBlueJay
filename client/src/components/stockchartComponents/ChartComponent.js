import React from 'react';
import { getData } from "./utils"
import { useDispatch, useSelector } from 'react-redux'
import ChartWrapper from './ChartResizer'

const ChartComponent = (props) => {
	//fetches data after mounting, loading screen is shown until data fetched
	// //get csv data parsed data (now object form) 
	const chartData = useSelector(state => state.coin.chart_data)

	if (chartData == null) {
		return <div>Loading...</div>
	} else {
		return (
			<ChartWrapper type={"svg"} data={chartData} />
		)
	}
}

export default ChartComponent