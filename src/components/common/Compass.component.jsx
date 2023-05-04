import React from 'react';
import PropTypes from 'prop-types';
import { getClassName } from '../../utils';

function Compass({ direction, showLabel }) {
	const containerClassname = getClassName({
		'flex flex-ai-c': showLabel,
	});

	function getCardinalDirection(degrees) {
		if (
			(degrees >= 337 && degrees <= 360) ||
			(degrees >= 0 && degrees <= 23)
		) {
			return 'N';
		} else if (degrees >= 24 && degrees <= 68) {
			return 'NE';
		} else if (degrees >= 69 && degrees <= 113) {
			return 'E';
		} else if (degrees >= 114 && degrees <= 158) {
			return 'SE';
		} else if (degrees >= 159 && degrees <= 203) {
			return 'S';
		} else if (degrees >= 204 && degrees <= 248) {
			return 'SW';
		} else if (degrees >= 249 && degrees <= 293) {
			return 'W';
		} else {
			return 'NW';
		}
	}

	return (
		<div className={containerClassname}>
			<div
				style={{ '--degress': `${direction}deg` }}
				className='compass pos-rel d-inline-block mr-12'
			></div>
			{showLabel && <span>{getCardinalDirection(direction)}</span>}
		</div>
	);
}

Compass.propTypes = {
	direction: PropTypes.number.isRequired,
	showLabel: PropTypes.bool,
};

export default Compass;
