import { useState, useEffect } from 'react';
import { getClassName } from '../utils';
import { SearchIcon, GpsIcon } from '../icons';

function WidgetForm() {
	const [formData, setFormData] = useState({
		query: '',
	});
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [error, setError] = useState(null);
	const inputClassname = getClassName('form__control form__control--icon', {
		'form__control--invalid': !!error,
	});

	// useEffect(() => {
	// 	if (isSubmitted && !error) {
	// 		setIsSubmitted(false);
	// 		(async () => {
	// 			try {
	// 				await getLocation(formData.query);
	// 			} catch (error) {
	// 				setError(error.message);
	// 			}
	// 		})();
	// 	}
	// }, [isSubmitted, error, formData, getLocation]);

	// function validate(data) {
	// 	const error = {
	// 		query: new Validator(data.query)
	// 			.label('Location')
	// 			.string()
	// 			.trim()
	// 			.required('Please enter the name of a location or an address')
	// 			.error,
	// 	};
	// 	return error.query;
	// }

	// function handleChange({ target }) {
	// 	if (!!error) setError(null);
	// 	setFormData((prevState) => ({
	// 		...prevState,
	// 		[target.name]: target.value,
	// 	}));
	// }

	// async function handleSubmit(e) {
	// 	e.preventDefault();

	// 	const error = validate(formData);

	// 	if (error) {
	// 		setError(error);
	// 		return;
	// 	}

	// 	setFormData((prevState) => ({
	// 		query: string(prevState.query).trim(),
	// 	}));
	// 	setIsSubmitted(true);
	// }

	// async function handleGeolocation() {
	// 	setError(null);
	// 	try {
	// 		const coords = await geolocationService.getCurrentPosition();
	// 		await getLocation(`${coords.latitude}, ${coords.longitude}`);
	// 	} catch (error) {
	// 		setError(error.message);
	// 	}
	// }

	return (
		<form className='form mb-40'>
			<div className='form__group'>
				<span className='icon icon--md icon--input'>
					<SearchIcon />
				</span>
				<input
					name='query'
					type='text'
					placeholder='Enter location...'
					className={inputClassname}
				/>
				<button
					className='button button--icon button--input'
					type='button'
					data-testid='geolocation-button'
				>
					<span className='icon icon--inline'>
						<GpsIcon />
					</span>
					<span className='sr-only'>Get current position</span>
				</button>
				{error && (
					<small className='form__invalid-feedback hidden'>
						{error}
					</small>
				)}
			</div>
		</form>
	);
}

export default WidgetForm;
