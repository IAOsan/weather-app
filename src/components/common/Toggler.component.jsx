import PropTypes from 'prop-types';

function Toggler({ label, onChange }) {
	return (
		<div className='switch pos-rel'>
			<input
				onChange={onChange}
				type='checkbox'
				className='switch__checkbox pos-abs'
				id='switch-checkbox'
			/>
			<label
				htmlFor='switch-checkbox'
				className='switch__label pos-rel flex flex-jc-sb bgcolor-primary-500'
			>
				{label.on()}
				{label.off()}
				<span className='switch__ball pos-abs bgcolor-light-50'></span>
			</label>
		</div>
	);
}

Toggler.propTypes = {
	label: PropTypes.shape({
		on: PropTypes.func.isRequired,
		off: PropTypes.func.isRequired,
	}).isRequired,
	onChange: PropTypes.func.isRequired,
};

export default Toggler;
