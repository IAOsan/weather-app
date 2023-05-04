import PropTypes from 'prop-types';

function TabContent({ id, activeTab, children }) {
	return id === activeTab ? children : null;
}

TabContent.propTypes = {
	id: PropTypes.string.isRequired,
	activeTab: PropTypes.string.isRequired,
	children: PropTypes.element,
};

export default TabContent;
