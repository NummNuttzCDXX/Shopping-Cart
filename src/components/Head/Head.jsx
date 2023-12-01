import styles from './Head.module.css';
import {Link} from 'react-router-dom';

const Head = () => {
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
				</ul>
			</nav>
		</header>
	);
};

export default Head;
