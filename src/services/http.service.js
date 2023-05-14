async function getJSON(url, opts = {}) {
	try {
		const request = await fetch(url, opts);

		if (!request.ok) {
			const err = new Error(request.statusText);
			err.status = request.status;
			throw err;
		}

		return await request.json();
	} catch (error) {
		if (error.status >= 400 && error.status < 500) {
			throw error;
		}
		console.error('An error has occurred', error);
	}
}

export default {
	get(url, opts) {
		return getJSON(url, opts);
	},
};
