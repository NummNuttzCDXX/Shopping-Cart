import propTypes from 'prop-types';
import {useLoaderData, useOutletContext, Link} from 'react-router-dom';
import styles from './Shop.module.css';
import {useEffect, useState} from 'react';

const Shop = () => {
	const shopData = useLoaderData();
	const [setSidebar] = useOutletContext();

	// Show sidebar on mount
	useEffect(() => {
		setSidebar(true);

		// Hide sidebar on dismount
		return () => setSidebar(false);
	});

	return (
		<div className={styles.shopContainer} >
			{shopData && shopData.map((data) => <Card data={data} key={data.id} />)}
		</div>
	);
};


const Card = ({data}) => {
	const [shortDesc] = useState(data.description.substr(0, 100));

	return (
		<div className={styles.card} >
			<img src={data.image} />

			{/* Title links to single product page */}
			<Link to={`/shop/product/${data.id}`} >
				<h3> {data.title} </h3>
			</Link>

			{/* Shortened description -- Also links back to single product page */}
			<p className={styles.desc}>
				<Link to={`/shop/product/${data.id}`}>{shortDesc}{data.description.length > 100 ? '...' : ''}</Link>
			</p>

			<p> ${data.price} </p>

			{/* Rating container */}
			<div>
				<span> {data.rating.rate}/5 </span>
				<span> Total: {data.rating.count} </span>
			</div>
		</div>
	);
};

Card.propTypes = {
	data: propTypes.object.isRequired,
};

export default Shop;
