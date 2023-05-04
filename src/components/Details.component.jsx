import Detail from './Detail.component';
import DetailsSkeleton from './skeleton/DetailsSkeleton.component';

function Details() {
	return (
		<section className='mb-60'>
			<h3 className='mb-44'>More details of today`s weather</h3>
			<div className='details flex'>
				<Detail
					title='Humidity'
					label='50%'
					status='Optimal'
					range={{
						value: 50,
						ticks: [
							{
								range: '0-40',
								gap: '40%',
								position: '40%',
								label: 'Too dry',
							},
							{
								range: '40-60',
								gap: '20%',
								position: '60%',
								label: 'Optimal',
							},
							{
								range: '60-100',
								gap: '40%',
								position: '100%',
								label: 'Too humid',
							},
						],
						showTicks: true,
						showLabels: true,
					}}
				/>
				<Detail
					title='Wind'
					label='25 km'
					compass={{
						direction: 200,
						showLabel: true,
					}}
				/>
				<Detail
					title='Visibility'
					label='24 km'
					status='Clear'
					range={{
						value: 24,
						ticks: [
							{
								range: '0-2',
								gap: '25%',
								position: '25%',
								label: 'Foggy',
							},
							{
								range: '2-10',
								gap: '25%',
								position: '50%',
								label: 'Hazy',
							},
							{
								range: '10-50',
								gap: '50%',
								position: '100%',
								label: 'Clear',
							},
						],
						showTicks: true,
						showLabels: true,
					}}
				/>
				<Detail
					title='UV Index'
					label='1.9'
					status='Low'
					range={{
						value: 1.9,
						ticks: [
							{
								range: '0-3',
								gap: '25%',
								position: '25%',
								label: 'Low',
							},
							{
								range: '3-6',
								gap: '25%',
								position: '50%',
								label: 'Moderate',
							},
							{
								range: '6-8',
								gap: '25%',
								position: '75%',
								label: 'High',
							},
							{
								range: '8-10',
								gap: '25%',
								position: '100%',
								label: 'Very high',
							},
						],
						showTicks: true,
						showLabels: true,
					}}
				/>
				<Detail
					title='Pressure'
					gauge={{
						value: 1000,
						label: '1080 hpa',
						min: 960,
						max: 1060,
						showLabels: true,
					}}
				/>
			</div>
		</section>
	);
}

export default Details;

// 	<article className='detail-card surface'>
// 	<h4 className='font-f-heading font-w-r opacity-70 mb-12'>
// 		Sunrise & sunset
// 	</h4>
// 	<div className='flex flex-ai-c'>
// 		<SunriseIcon className='mr-20' />
// 		<div>
// 			<p className='h5 font-f-heading font-w-b'>6:30 AM</p>
// 			<small className='opacity-70'>4 hours ago</small>
// 		</div>
// 	</div>
// 	<div className='flex flex-ai-c'>
// 		<SunsetIcon className='mr-20' />
// 		<div>
// 			<p className='h5 font-f-heading font-w-b'>5:45 PM</p>
// 			<small className='opacity-70'>in 9 hours</small>
// 		</div>
// 	</div>
// </article>
