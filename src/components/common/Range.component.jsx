import { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { number } from '../../utils';

function Range({ value, ticks, showTicks, showLabels }) {
	const [progress, setProgress] = useState('0%');

	useLayoutEffect(() => {
		let prevGapCount = 0;

		for (let i = 0; i < ticks.length; i++) {
			const [min, max] = ticks[i].range.split('-');
			if (value >= +min && value <= +max) {
				const range = number(max).value - number(min).value;
				const correctedStartValue = value - number(min).value;
				const percentage = correctedStartValue / range;
				setProgress(
					`${number(ticks[i].gap).value * percentage + prevGapCount}%`
				);
			}
			prevGapCount += number(ticks[i].gap).value;
		}
	}, [ticks, value]);

	return (
		<div className='range'>
			<div className='range__track pos-rel bgcolor-light-600'>
				<div
					style={{ '--progress': progress }}
					className='range__progress bgcolor-warning-600'
				></div>
				{showTicks &&
					ticks.map((t) => (
						<div
							key={t.range}
							style={{ '--position': t.position }}
							className='range__tick pos-abs bgcolor-light-50'
						></div>
					))}
			</div>
			{showLabels && (
				<div className='flex flex-jc-sb opacity-70'>
					{ticks.map((t) => (
						<small
							key={t.label}
							style={{ '--size': t.gap }}
							className='range__label text-center'
						>
							{t.label}
						</small>
					))}
				</div>
			)}
		</div>
	);
}

Range.propTypes = {
	value: PropTypes.number.isRequired,
	ticks: PropTypes.arrayOf(
		PropTypes.shape({
			range: PropTypes.string.isRequired,
			gap: PropTypes.string.isRequired,
			position: PropTypes.string.isRequired,
			label: PropTypes.string,
		})
	).isRequired,
	showTicks: PropTypes.bool,
	showLabels: PropTypes.bool,
};

export default Range;
