import WidgetForm from './WidgetForm.component';
import WidgetSkeleton from './skeleton/WidgetSkeleton.component';
import {
	PinIcon,
	TermometerIcon,
	HumidityIcon,
	PrecipitationIcon,
	DropsIcon,
	SnowflakeIcon,
} from '../icons';

function Widget() {
	return (
		<section className='widget surface mb-60'>
			<WidgetForm />
			<div className='row'>
				<div className='col-md-5 col-lg-12'>
					<img
						className='widget__icon mx-auto mb-4'
						src='https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png'
						alt=''
					/>
					<p className='widget__degress font-f-heading text-center'>
						<b>30.5</b>
						<small>&#176;</small>
					</p>
					<p className='h5 text-center opacity-70 mb-40'>
						Party Cloudy
					</p>
				</div>
				<div className='col-md-7 col-lg-12 pos-rel'>
					<div className='widget__details'>
						<p className='h5 font-f-heading lineheight-sm mb-4'>
							<span className='icon icon--inline mr-4'>
								<PinIcon />
							</span>
							<b>Osaka, japan</b>
						</p>
						<p className='opacity-70 mb-40'>
							Monday, April 12, 2023
						</p>
						<p className='mb-4'>
							<span className='icon icon--inline mr-4'>
								<TermometerIcon />
							</span>
							<span className='opacity-70'>Feels like </span>
							<b className='float-right'>30.8 &#176;</b>
						</p>
						<p className='mb-4'>
							<span className='icon icon--inline mr-4'>
								<HumidityIcon />
							</span>
							<span className='opacity-70'>Chance of rain </span>
							<b className='float-right'>0%</b>
						</p>
						<p className='mb-4'>
							<span className='icon icon--inline mr-4'>
								<PrecipitationIcon />
							</span>
							<span className='opacity-70'>Precipitation </span>
							<b className='float-right'>0 mm</b>
						</p>
						<p className='mb-4'>
							<span className='icon icon--inline mr-4'>
								<DropsIcon />
							</span>
							<span className='opacity-70'>Rain </span>
							<b className='float-right'>0 mm</b>
						</p>
						<p className='mb-4'>
							<span className='icon icon--inline mr-4'>
								<SnowflakeIcon />
							</span>
							<span className='opacity-70'>Snow </span>
							<b className='float-right'>0 cm</b>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Widget;
