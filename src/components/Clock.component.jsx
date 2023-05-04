import { useEffect, useState } from 'react';

function Clock() {
	const [date, setDate] = useState(new Date());
	const timeFormatter = new Intl.DateTimeFormat('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	});
	const dateFormatter = new Intl.DateTimeFormat('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
	// FIXME minutos desfasados, hay que restar los segundos actuales y luego los 60 segundo sel interval
	useEffect(() => {
		setInterval(() => {
			setDate(new Date());
		}, 1000);
	}, []);

	return (
		<article className='clock'>
			<p className='h3 font-w-xbold font-f-heading'>
				{timeFormatter.format(date)}
			</p>
			<small className='d-block opacity-70'>
				{dateFormatter.format(new Date())}
			</small>
		</article>
	);
}

export default Clock;
