import { useState, useEffect } from 'react';
import { getClassName } from '../utils';
import { SearchIcon, GpsIcon } from '../icons';
import { Validator, string } from '../utils';
import { useAppContext } from '../context/App.context';
import geolocationService from '../services/geolocation.service';

function WidgetForm() {
	const { getLocation, isLoading } = useAppContext();
	const [formData, setFormData] = useState({
		query: '',
	});
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [errors, setErrors] = useState({});
	const inputClassname = getClassName('form__control form__control--icon', {
		'form__control--invalid': Object.keys(errors).length,
	});

	useEffect(() => {
		if (isSubmitted && !Object.keys(errors).length) {
			setIsSubmitted(false);
			(async () => {
				try {
					await getLocation(formData.query);
				} catch (error) {
					setErrors({ query: error.message });
				}
			})();
		}
	}, [isSubmitted, errors, getLocation, formData]);

	function validate(data) {
		const errors = {
			query: new Validator(data.query)
				.label('Location')
				.string()
				.trim()
				.required('Please enter the name of a location or an address')
				.error,
		};

		return {
			...(errors.query && { query: errors.query }),
		};
	}

	function handleChange({ target }) {
		if (errors) {
			setErrors({});
			setIsSubmitted(false);
		}

		setFormData((prevState) => ({
			...prevState,
			[target.name]: target.value,
		}));
	}

	async function handleSubmit(e) {
		e.preventDefault();

		const errors = validate(formData);

		if (Object.keys(errors).length) {
			setErrors(errors);
			return;
		}

		setFormData((prevState) => ({
			query: string(prevState.query).trim(),
		}));
		setIsSubmitted(true);
	}

	async function handleGeolocation() {
		setErrors({});
		try {
			const response = await geolocationService.getCurrentPosition();
			await getLocation(`${response.latitude},${response.longitude}`);
		} catch (error) {
			setErrors({ query: error.message });
		}
	}

	return (
		<form onSubmit={handleSubmit} className='form mb-40'>
			<div className='form__group'>
				<span className='icon icon--md icon--input'>
					<SearchIcon />
				</span>
				<input
					onChange={handleChange}
					name='query'
					value={formData.query}
					type='text'
					placeholder='Enter location...'
					className={inputClassname}
					disabled={isLoading}
				/>
				<button
					onClick={handleGeolocation}
					className='button button--icon button--input'
					type='button'
					data-testid='geolocation-button'
				>
					<span className='icon icon--inline'>
						<GpsIcon />
					</span>
					<span className='sr-only'>Get current position</span>
				</button>
				{errors.query && (
					<small className='form__invalid-feedback hidden'>
						{errors.query}
					</small>
				)}
			</div>
		</form>
	);
}

export default WidgetForm;
