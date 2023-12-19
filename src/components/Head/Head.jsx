import propTypes from 'prop-types';
import Dropdown from '../Dropdown/Dropdown';
import shopCart from '../../assets/img/shopping-cart.svg';
import shopCartCheckout from '../../assets/img/shopping-cart-checkout.svg';
import searchIcon from '../../assets/img/search.svg';
import styles from './Head.module.css';
import {Link, useLoaderData} from 'react-router-dom';
import {useEffect, useRef, useState} from 'react';

const Head = ({categories, cart, setHeight}) => {
	const [src, setSrc] = useState(shopCart);
	const [cartLength, setCartLength] = useState(0);

	// Get cart length
	useEffect(() => {
		let total = 0; // Reset total
		// For each item in cart - Add the quantity
		cart.forEach((item) => total += Number(item.quantity));

		// Set length to total
		setCartLength(total);
	}, [cart]);

	// Set/Send the height to sidebar
	const headerRef = useRef(null);
	useEffect(() => {
		if (headerRef.current) setHeight(headerRef.current.clientHeight);
	});

	return (
		<header ref={headerRef}>
			<div className={styles.head}>
				<h1>Loremazon</h1>
				<SearchBar />

				{/* Change image src on container hover */}
				<div className={styles.checkoutContainer}
					onMouseLeave={() => setSrc(shopCart)}
					onMouseEnter={() => setSrc(shopCartCheckout)}
				>
					<Link to={'/checkout'}>
						<img src={src} alt='Shopping Cart' />
						<span>Checkout</span>
					</Link>

					{ cartLength > 0 &&
						<span className={styles.count}>
							{cartLength}
						</span>
					}
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
									<li key={item} >
										<Link to={`/shop/category/${item.toLowerCase()}`}>
											{item}
										</Link>
									</li>
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
	cart: propTypes.arrayOf(propTypes.object),
	setHeight: propTypes.func,
};

const SearchBar = () => {
	const [search, setSearch] = useState('');
	const [results, setResults] = useState([]);
	const products = useLoaderData();

	// Search Bar
	useEffect(() => {
		// Reset results when bar is empty
		if (search.length == 0) setResults([]);
		else {
			// Filter `products` to find items where the title
			// includes the search query
			setResults(products.filter((v) => (
				v.title.toLowerCase().includes(search) ||
				v.category.toLowerCase().match(search)
			)));
		}
	}, [search, products]);

	return (
		<div className={styles.searchContainer} >
			<input type="search" placeholder='Search'
				value={search} onChange={(e) => setSearch(e.target.value)}
			/>
			<div className={styles.searchIconContainer}>
				<img src={searchIcon} alt='Search'/>
			</div>

			{ results.length > 0 &&
				<ul className={styles.searchResults}>
					{ results.map((item, i) => {
						let last = false;
						if (i + 1 == results.length) last = true;

						return (
							<>
								<li key={'result ' + item.id} onClick={() => setSearch('')} >
									<Link to={'/shop/product/' + item.id} >{item.title}</Link>
								</li>
								{!last && <hr />}
							</>
						);
					})}
				</ul>
			}
		</div>
	);
};

export default Head;
