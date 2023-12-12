import propTypes from 'prop-types';
import {useLoaderData, useOutletContext, Link} from 'react-router-dom';
import styles from './Shop.module.css';
import {useEffect, useRef, useState} from 'react';
import AddToCartBtn from '../AddCartBtn/AddCartBtn';

const Shop = () => {
	const shopData = useLoaderData();
	const [setSidebar, getStarSrc] = useOutletContext();

	// Show sidebar on mount
	useEffect(() => {
		setSidebar(true);

		// Hide sidebar on dismount
		return () => setSidebar(false);
	});

	return (
		<div className={styles.shopContainer} >
			{shopData && shopData.map((data) => (
				<Card key={data.id} data={data} getStars={getStarSrc} />
			))}
		</div>
	);
};


const Card = ({data, getStars}) => {
	// References for Description parent and Desc text
	const descTxt = useRef(null);
	const descContainer = useRef(null);
	const [overflow, setOverflow] = useState(false);

	// Check for Description Overflow
	useEffect(() => {
		const txtHeight = descTxt.current.scrollHeight;
		const containerHeight = descContainer.current.clientHeight;

		if (txtHeight > containerHeight) setOverflow(true);
	}, []);

	// Fix fucked up Description on one product
	if (data.id == 20 && data.title.includes('DANVOUY')) {
		data.description = data.description.replaceAll(',', ', ');
		data.description = data.description.replaceAll('/', ', ');
	}

	return (
		<div className={styles.card} >
			<img src={data.image} />

			{/* Title links to single product page */}
			<Link to={`/shop/product/${data.id}`} >
				<h3> {data.title.substr(0, 50)}{data.title.length > 50 && '...'} </h3>
			</Link>

			{/* Shortened description -- Also links back to single product page */}
			<Link to={`/shop/product/${data.id}`}>
				{/* Desc Parent Container */}
				<p className={styles.desc} ref={descContainer} >
					{/* Keep Desc txt in span to compare heights and check if overflow */}
					<span ref={descTxt} > {data.description} </span>
				</p>
				{ overflow && <span className={styles.overflowBtn} > See More </span> }
			</Link>

			<div className={styles.priceContainer} >
				<span> ${data.price} </span>
				<AddToCartBtn itemData={data} />
			</div>

			{/* Rating container */}
			<div>
				{/* Star container */}
				<div className={styles.starContainer} >
					<div className={styles.starWrapper} > {/* Star wrapper */}
						{getStars(data).map((src, i) => (
							<img key={'star' + i} className={styles.star} src={src} />
						))}
					</div>
					<span> {data.rating.rate}/5 </span>
				</div>
				<span className={styles.totalRates} >
					{data.rating.count} total rates
				</span>
			</div>
		</div>
	);
};

Card.propTypes = {
	data: propTypes.object.isRequired,
	getStars: propTypes.func.isRequired,
};

export default Shop;
