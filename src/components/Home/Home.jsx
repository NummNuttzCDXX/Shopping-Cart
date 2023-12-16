import {useEffect, useState} from 'react';
import styles from './Home.module.css';
import propTypes from 'prop-types';
import {useOutletContext} from 'react-router';
import {Link} from 'react-router-dom';

const Home = ({getProducts}) => {
	const [topRated, setTopRated] = useState([]);
	const [setSidebar, getStars] = useOutletContext();

	// Get top 5 rated products
	useEffect(() => {
		getProducts().then((data) => {
			const products = [...data]; // Copy arr

			// Sort products by rate
			const sorted = products.sort((a, b) => {
				return a.rating.rate > b.rating.rate ? -1 :
					a.rating.rate < b.rating.rate ? 1 :
						0;
			});

			// Return top 5
			setTopRated(sorted.slice(0, 5));
		});
	}, [getProducts]);

	// Set sidebar true
	useEffect(() => {
		setSidebar(true);

		return () => setSidebar(false);
	});

	return (
		<div className={styles.home} >
			<div className={styles.head}>
				<h1>Welcome to Loremazon!</h1>
				<p>The go to place for all your shopping needs! (sorta)</p>
			</div>

			<div className={styles.topRatedContainer} >
				<h2>Top Rated Products</h2>
				{topRated.map((data) => (
					// Card
					<div className={styles.card} key={data.id + '-top'} >
						<img src={data.image} alt={data.title} className={styles.itemImg} />

						<p>
							<Link to={'/shop/product/' + data.id}>{data.title}</Link>
						</p>

						<div className={styles.starContainer} >
							{getStars(data).map((src, i) => (
								<img src={src} alt='Star' key={'star ' + i + ' top'} />
							))}
							<span>{data.rating.rate}</span>
						</div>
					</div>
				))}
			</div>

			{/* <div className={styles.byCategory} >
				<h2>Shop by Category</h2>

				<ul>
					{ categories && categories.map((cat) => (
						<li key={cat + ' shop'} >{cat}</li>
					))}
				</ul>
			</div> */}

			<div className={styles.sloganContainer} >
				<p>Buy only the best when you shop with Loremazon</p>
				<div className={styles.slogan}>
					<span>Great People</span>
					<span>Great Products</span>
					<span>Great Prices</span>
				</div>
			</div>
		</div>
	);
};

Home.propTypes = {
	getProducts: propTypes.func.isRequired,
};

export default Home;
