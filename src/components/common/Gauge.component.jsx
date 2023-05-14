import { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Gauge({ value, label, min, max, showLabels }) {
	const [progress, setProgress] = useState('0deg');

	useLayoutEffect(() => {
		const range = max - min;
		const correctedStartValue = value - min;
		const percentage = correctedStartValue / range;
		const template = (deg) => `${deg}deg`;

		if (value < min) setProgress(template(0));
		if (value > max) setProgress(template(180));

		setProgress(template(180 * percentage));
	}, [max, min, value]);

	return (
		<div className='pos-rel'>
			<div
				style={{
					'--progress': progress,
				}}
				className='gauge__dial pos-rel bgcolor-light-600'
			></div>
			<div className='gauge__mask pos-abs bgcolor-light-50'>
				{showLabels && (
					<p className='gauge__value h3 pos-abs font-f-heading text-center'>
						<b>{label}</b>
					</p>
				)}
			</div>
			{showLabels && (
				<div className='flex flex-jc-sb opacity-70'>
					<small className='text-center'>{min}</small>
					<small className='text-center'>{max}</small>
				</div>
			)}
		</div>
	);
}

Gauge.defaultProps = {
	showLabels: false,
};

Gauge.propTypes = {
	min: PropTypes.number.isRequired,
	max: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
	label: PropTypes.string,
	showLabels: PropTypes.bool,
};

export default Gauge;
