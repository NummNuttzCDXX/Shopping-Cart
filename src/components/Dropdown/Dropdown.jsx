import propTypes from 'prop-types';
import styles from './Dropdown.module.css';

const Dropdown = ({children, title}) => {
	return (
		<div className={styles.dropdown} >
			<div> {title} </div>

			<div className={styles.dropdownContent} >
				{children}
			</div>
		</div>
	);
};

Dropdown.propTypes = {
	children: propTypes.element,
	title: propTypes.string.isRequired,
};

export default Dropdown;
