import propTypes from 'prop-types';
import Dropdown from '../Dropdown/Dropdown';
import shopCart from '../../assets/img/shopping-cart.svg';
import shopCartCheckout from '../../assets/img/shopping-cart-checkout.svg';
import styles from './Head.module.css';
import {Link} from 'react-router-dom';
import {useState} from 'react';

const Head = ({categories}) => {
	const [src, setSrc] = useState(shopCart);

	return (
		<header>
			<div className={styles.head}>
				<h1>Loremazon</h1>
				<input type="search" placeholder='Search' />

				<div className={styles.checkoutContainer} >
					<img src={src} alt='Shopping Cart'
						onMouseEnter={() => setSrc(shopCartCheckout)}
						onMouseLeave={() => setSrc(shopCart)}
					/>
					<span>Checkout</span>
				</div>
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
