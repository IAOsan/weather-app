import { useEffect, useRef } from 'react';
import { LineChart, BarChart } from 'chartist';
import PropTypes from 'prop-types';
import 'chartist/dist/index.css';

function Chart({
	type,
	labels,
	series,
	legends,
	options,
	responsiveOptions,
	event,
}) {
	const chartRef = useRef();
	const legendColors = {
		0: 'red',
		1: 'orangered',
		2: 'purple',
	};

	useEffect(() => {
		if (!labels && !series) return;

		const types = {
			line: LineChart,
			bar: BarChart,
		};

		const chart = new types[type](
			chartRef.current,
			{
				labels: labels,
				series: series,
			},
			options,
			responsiveOptions
		);

		if (event) {
			chart.on(event.type, event.callback);
		}
	}, [type, labels, series, options, responsiveOptions, event]);

	return (
		<article className='chart pos-rel surface'>
			<div className='chart__body'>
				<div ref={chartRef}></div>
			</div>
			{legends && (
				<div className='chart__footer'>
					{legends.map((l, idx) => (
						<small
							key={l}
							style={{ '--legendColor': legendColors[idx] }}
							className='chart__legend'
						>
							{l}
						</small>
					))}
				</div>
			)}
		</article>
	);
}

Chart.propTypes = {
	type: PropTypes.oneOf(['line', 'bar']),
	labels: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.string),
		PropTypes.arrayOf(PropTypes.number),
	]),
	series: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
	legends: PropTypes.arrayOf(PropTypes.string),
	options: PropTypes.object,
	responsiveOptions: PropTypes.arrayOf(PropTypes.array),
	event: PropTypes.shape({
		type: PropTypes.string.isRequired,
		callback: PropTypes.func.isRequired,
	}),
};

export default Chart;
