import { toast } from 'react-toastify';
import { date, number } from '../utils';
import httpService from './http.service';

const baseUrl = 'https://api.opencagedata.com/geocode/v1/json';
const apikey = '8a5d0586ea794b2c8c9cfad7ba1f31e5';
const errors = {
	400: 'Sorry, the location cannot be determined, please try another',
	402: 'Sorry, try again later',
	404: 'Sorry, location not found',
	408: 'Sorry the request take a long time, try again',
	410: 'Sorry, request too long, try another one',
	429: 'Sorry, too many requests, please try again later',
};

function getFormattedDate(timezone) {
	return date(new Date())
		.convertTimezone(timezone)
		.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
}

async function getByNameOrCoords(query) {
	const encodedURI = encodeURI(query);
	const parameters = `limit=1&pretty=1&address_only&key=${apikey}`;
	const url = `${baseUrl}?q=${encodedURI}&${parameters}`;

	try {
		const response = await httpService.get(url);

		if (response.status.code !== 200 || !response.total_results) {
			const err = new Error(response.status.message);
			err.status =
				response.status.code === 200
					? 404
					: number(response.status.code).value;
			throw err;
		}

		const {
			annotations,
			formatted,
			geometry: { lat, lng },
		} = response.results[0];

		return {
			formatted,
			date: getFormattedDate(annotations.timezone.name),
			lat: number(lat).precision(4),
			lng: number(lng).precision(4),
		};
	} catch (error) {
		if (errors[error.status]) {
			error.message = errors[error.status];
			throw error;
		}
		toast.error(
			'Sorry but the location could not be obtained, please try again later',
			{
				autoClose: false,
				position: 'top-center',
			}
		);
	}
}

export default { getByNameOrCoords };
