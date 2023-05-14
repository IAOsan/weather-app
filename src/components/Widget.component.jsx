import WidgetForm from './WidgetForm.component';
import WidgetSkeleton from './skeleton/WidgetSkeleton.component';
import { useAppContext } from '../context/App.context';
import {
	PinIcon,
	TermometerIcon,
	HumidityIcon,
	PrecipitationIcon,
	DropsIcon,
	SnowflakeIcon,
} from '../icons';
import { getImageUrl } from '../utils';

function Widget() {
	const {
		state: {
			isLoading,
			unitSystem,
			entities: {
				location,
				weather: { current: currentWeather },
			},
		},
	} = useAppContext();

	return (
		<section className='widget surface mb-60'>
			<WidgetForm />
			{isLoading ? (
				<WidgetSkeleton />
			) : (
				<div className='row'>
					<div className='col-md-5 col-lg-12'>
						<img
							className='widget__icon mx-auto mb-4'
							src={getImageUrl(`${currentWeather.icon}.svg`)}
							alt=''
						/>
						<p className='widget__degress font-f-heading text-center'>
							<b>{currentWeather.temperature[unitSystem]}</b>
							<small>°</small>
						</p>
						<p className='h5 text-center opacity-70 mb-40'>
							{currentWeather.condition}
						</p>
					</div>
					<div className='col-md-7 col-lg-12 pos-rel'>
						<div className='widget__details'>
							<p className='h5 font-f-heading lineheight-sm mb-4'>
								<span className='icon icon--inline mr-4'>
									<PinIcon />
								</span>
								<b>{location.formatted}</b>
							</p>
							<p className='opacity-70 mb-40'>{location.date}</p>
							<p className='mb-4'>
								<span className='icon icon--inline mr-4'>
									<TermometerIcon />
								</span>
								<span className='opacity-70'>Feels like </span>
								<b className='float-right'>
									{currentWeather.temperature[unitSystem]}°
								</b>
							</p>
							<p className='mb-4'>
								<span className='icon icon--inline mr-4'>
									<HumidityIcon />
								</span>
								<span className='opacity-70'>
									Chance of rain{' '}
								</span>
								<b className='float-right'>
									{currentWeather.precipitationProbability}
								</b>
							</p>
							<p className='mb-4'>
								<span className='icon icon--inline mr-4'>
									<PrecipitationIcon />
								</span>
								<span className='opacity-70'>
									Precipitation{' '}
								</span>
								<b className='float-right'>
									{currentWeather.precipitation[unitSystem]}
								</b>
							</p>
							<p className='mb-4'>
								<span className='icon icon--inline mr-4'>
									<DropsIcon />
								</span>
								<span className='opacity-70'>Rain </span>
								<b className='float-right'>
									{currentWeather.rain[unitSystem]}
								</b>
							</p>
							<p className='mb-4'>
								<span className='icon icon--inline mr-4'>
									<SnowflakeIcon />
								</span>
								<span className='opacity-70'>Snow </span>
								<b className='float-right'>
									{currentWeather.snowfall[unitSystem]}
								</b>
							</p>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}

export default Widget;
