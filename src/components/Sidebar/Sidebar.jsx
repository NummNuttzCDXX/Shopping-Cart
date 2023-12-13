import propTypes from 'prop-types';
import styles from './Sidebar.module.css';
import {Link} from 'react-router-dom';

// Sidebar Component will show categories and load them onClick
const Sidebar = ({categories, children}) => {
	return (
		<div className={styles.sidebar} >
			{ categories && <>
				<h3>View Categories</h3>

				<ul>
					{categories.map((item) => (
						<Link to={`/shop/category/${item.toLowerCase()}`} key={item + ' b'}>
							<li >{item}</li>
						</Link>
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
	children: propTypes.any,
};

export default Sidebar;
