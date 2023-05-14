import { number } from '../utils';
import { toast } from 'react-toastify';

export const errorCodes = {
	1: 'Your location could not be accessed, permission was not granted',
	2: 'Sorry, your location could not be retrieved',
	3: 'The application took too long to access your location. Perhaps try again later',
};

function geolocationPromise(options) {
	return new Promise((resolve, reject) => {
		if (!navigator.geolocation) {
			const err = new Error(
				'Sorry geolocation is not supported by this browser'
			);
			err.code = 500;
			reject(err);
		}
		navigator.geolocation.getCurrentPosition(resolve, reject, options);
	});
}

async function getCurrentPosition(options) {
	const defaultOpts = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0,
	};
	try {
		const pos = await geolocationPromise(options || defaultOpts);
		return {
			latitude: number(pos.coords.latitude).precision(4),
			longitude: number(pos.coords.longitude).precision(4),
		};
	} catch (error) {
		if (error.code !== 500) {
			const err = new Error(errorCodes[error.code]);
			throw err;
		}
		toast.error(error.message, {
			autoClose: false,
			position: 'top-center',
		});
	}
}

export default { getCurrentPosition };
