import propTypes from 'prop-types';
import styles from './Sidebar.module.css';

// Sidebar Component will show categories and load them onClick
const Sidebar = ({categories, children}) => {
	return (
		<div className={styles.sidebar} >
			{ categories && <>
				<h3>View Categories</h3>

				<ul>
					{categories.map((item) => (
						<li key={item + ' b'} > {item} </li>
					))}
				</ul>
			</> }

			<div >
				{children}
			</div>
		</div>
	);
};

Sidebar.propTypes = {
	categories: propTypes.arrayOf(propTypes.string),
	children: propTypes.element,
};

export default Sidebar;
