import PropTypes from 'prop-types';
import Range from './common/Range.component';
import Compass from './common/Compass.component';
import Gauge from './common/Gauge.component';

function Detail({ title, label, status, range, compass, gauge }) {
	return (
		<article className='detail-card surface pos-rel flex flex-column flex-jc-sb'>
			<h4 className='font-f-heading font-w-r opacity-70 mb-12'>
				{title}
			</h4>
			{label && (
				<p className='h2 font-f-heading font-w-bold mb-12'>{label}</p>
			)}
			{status && (
				<p className='mb-12'>
					<span className='opacity-70 mr-4'>Status:</span>
					{status}
				</p>
			)}
			{range && <Range {...range} />}
			{compass && <Compass {...compass} />}
			{gauge && <Gauge {...gauge} />}
		</article>
	);
}

Detail.propTypes = {
	title: PropTypes.string.isRequired,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	status: PropTypes.string,
	range: PropTypes.shape({
		value: PropTypes.number.isRequired,
		ticks: PropTypes.arrayOf(
			PropTypes.shape({
				range: PropTypes.string.isRequired,
				gap: PropTypes.string.isRequired,
				position: PropTypes.string,
				label: PropTypes.string,
			})
		).isRequired,
		showTicks: PropTypes.bool,
		showLabels: PropTypes.bool,
	}),
	compass: PropTypes.shape({
		direction: PropTypes.number.isRequired,
		showLabel: PropTypes.bool,
	}),
	gauge: PropTypes.shape({
		min: PropTypes.number.isRequired,
		max: PropTypes.number.isRequired,
		value: PropTypes.number.isRequired,
		label: PropTypes.string,
		showLabels: PropTypes.bool,
	}),
};

export default Detail;
