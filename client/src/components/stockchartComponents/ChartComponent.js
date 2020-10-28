import React from 'react';
import { getData } from "./utils"
import ChartWrapper from './ChartResizer'
// eslint-disable-next-line
import { TypeChooser } from "react-stockcharts/lib/helper";

class ChartComponent extends React.Component {
	//fetches data after mounting, loading screen is shown until data fetched
	componentDidMount() {
	//get csv data parsed data (now object form)
    console.log('in mount', getData())
    const data = getData()
    this.setState({data})
	}
	render() {
		if (this.state == null) {
			return <div>Loading...</div>
		}
		return (
			// typechooser supplies a dropdown to change some display options
				  <ChartWrapper type={"svg"} data={this.state.data} />
		)
	}
}

export default ChartComponent
