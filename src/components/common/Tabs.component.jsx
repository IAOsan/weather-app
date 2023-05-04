import PropTypes from 'prop-types';
import { getClassName } from '../../utils';

function Tabs({ tabsList, activeTab, onSelect, children, customClass }) {
	const className = getClassName(
		{ tabs: !customClass },
		{ [customClass]: !!customClass }
	);

	return (
		<div className={className}>
			<nav className='tabs__navigation mb-44'>
				<ul className='list-style-none flex'>
					{!!tabsList &&
						tabsList.map((l) => (
							<li key={l} className='tabs__item'>
								<button
									onClick={onSelect}
									data-id={l}
									className={getClassName(
										'tabs__button d-block font-f-heading font-w-bold',
										{
											active: activeTab === l,
										}
									)}
									type='button'
								>
									{l}
								</button>
							</li>
						))}
				</ul>
			</nav>
			<div className='tabs__content'>{children}</div>
		</div>
	);
}

Tabs.propTypes = {
	tabsList: PropTypes.array,
	activeTab: PropTypes.string.isRequired,
	onSelect: PropTypes.func,
	customClass: PropTypes.string,
	children: PropTypes.any,
};

export default Tabs;
