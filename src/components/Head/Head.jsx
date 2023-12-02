import propTypes from 'prop-types';
import Dropdown from '../Dropdown/Dropdown';
import styles from './Head.module.css';
import {Link} from 'react-router-dom';

const Head = ({categories}) => {
	return (
		<header>
			<div className={styles.head}>
				<h1>Loremazon</h1>
				<input type="search" placeholder='Search' />
				<img src={''} alt='Shopping Cart' />
			</div>

			<nav>
				<ul className={styles.linkContainer}>
					<li> <Link to='/'> Home </Link> </li>
					<li> <Link to='/shop'> Shop </Link> </li>
					<li>
						<Dropdown title='Categories'>
							<ul>
								{categories && categories.map((item) => (
									<li key={item}> {item} </li>
								))}
							</ul>
						</Dropdown>
					</li>
				</ul>
			</nav>
		</header>
	);
};

Head.propTypes = {
	categories: propTypes.arrayOf(propTypes.string),
};

export default Head;
