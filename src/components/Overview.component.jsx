import PropTypes from 'prop-types';
import { getClassName } from '../utils';

function Overview({ time, temp, icon, condition }) {
	return (
		<article className='overview-card surface text-center'>
			<h4 className='mb-4'>{time}</h4>
			<span className='icon icon--overview'>
				{icon && <img src={icon} alt={condition} />}
			</span>
			<p className='font-f-heading'>
				<b className={getClassName({ 'mr-8': temp.max })}>
					{temp.max || temp}°
				</b>
				{temp.min && <b className='opacity-70'>{temp.min}°</b>}
			</p>
		</article>
	);
}

Overview.propTypes = {
	time: PropTypes.string.isRequired,
	temp: PropTypes.oneOfType([
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		PropTypes.shape({
			min: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
				.isRequired,
			max: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
				.isRequired,
		}),
	]),
	icon: PropTypes.string.isRequired,
	condition: PropTypes.string.isRequired,
};

export default Overview;
