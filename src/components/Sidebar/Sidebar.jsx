import propTypes from 'prop-types';
import styles from './Sidebar.module.css';
import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import menuIcon from '../../assets/img/menu.svg';

// Sidebar Component will show categories and load them onClick
const Sidebar = ({categories, children, headerHeight, isOpen, setIsOpen}) => {
	const [isMobile, setIsMobile] = useState(false);

	// Check if screen is small (mobile size)
	useEffect(() => {
		if (window.innerWidth <= 500) setIsMobile(true);
	}, []);

	const sidebarStyles = {
		top: headerHeight + 'px',
	};


	return (
		<>
			{/* Render menu icon on mobile sized screens */}
			{isMobile &&
				<img src={menuIcon} alt='Menu Icon' className={styles.menuIcon}
					onClick={() => setIsOpen(!isOpen)} // Open/Close sidebar on icon click
				/>
			}

			<div className={`${styles.sidebar} ${isMobile ? styles.mobile : ''} ` +
			`${isOpen ? styles.open : ''}`}
			style={sidebarStyles}
			>

				{ categories && <>
					<h3>View Categories</h3>

					<ul>
						{categories.map((item) => (
							<Link to={`/shop/category/${item.toLowerCase()}`}
								key={item + ' b'}>
								<li >{item}</li>
							</Link>
						))}
					</ul>
				</> }

				<div >
					{children}
				</div>
			</div>
		</>
	);
};

Sidebar.propTypes = {
	categories: propTypes.arrayOf(propTypes.string),
	children: propTypes.any,
	headerHeight: propTypes.number.isRequired,
	isOpen: propTypes.bool.isRequired,
	setIsOpen: propTypes.func.isRequired,
};

export default Sidebar;
