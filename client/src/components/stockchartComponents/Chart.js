import React from "react";
import PropTypes from "prop-types";
import { ChartCanvas, Chart } from "react-stockcharts";
import {
	CandlestickSeries,
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

class CandleStickStockScaleChart extends React.Component {
	render() {
		const { type, data: initialData, width, ratio } = this.props;
		// candle styling that is passed into the candleStickSeries component below
        const candlesAppearance = {
            wickStroke: "#000000",
            fill: function fill(d) {
              return d.close > d.open ? "rgba(196, 205, 211, 0.8)" : "rgba(22, 22, 22, 0.8)";
            },
            stroke: "#000000",
            candleStrokeWidth: 1,
            widthRatio: 0.8,
            opacity: 1,
		  }
		//discontinous time scaler option does not show days without data (candles) which are ignored for a more cohesive graph
		//useful for stock data that doesn't display weekends
		const xScaleProvider = discontinuousTimeScaleProvider
			.inputDateAccessor(d => d.date);
		const {
			data,
			xScale,
			xAccessor,
			displayXAccessor,
		} = xScaleProvider(initialData);
		const xExtents = [
			xAccessor(last(data)),
			//starting at index 0 of the data array ensures all data is initially loaded 
            xAccessor(data[0])

		];

		return (
			<ChartCanvas height={400}
				ratio={ratio}
				width={width}
				margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
				type={type}
				seriesName="MSFT"
				data={data}
				xScale={xScale}
				xAccessor={xAccessor}
				displayXAccessor={displayXAccessor}
				xExtents={xExtents}
			>

				<Chart id={1} yExtents={d => [2000,80]}>
					<XAxis axisAt="bottom" orient="bottom" ticks={6}/>
					<YAxis axisAt="left" orient="left" ticks={5} />
					{/* comp that displays all candle stick data */}
					<CandlestickSeries {...candlesAppearance} />
				</Chart>
			</ChartCanvas>
		);
	}
}

//proptypes react package to typecheck that data for graph is valid format
CandleStickStockScaleChart.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleStickStockScaleChart.defaultProps = {
	type: "svg",
};
CandleStickStockScaleChart = fitWidth(CandleStickStockScaleChart);

export default CandleStickStockScaleChart;