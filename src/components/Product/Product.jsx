import styles from './Product.module.css';
import {useLoaderData, useOutletContext} from 'react-router-dom';
import starEmpty from '../../assets/img/star-empty.svg';
import star from '../../assets/img/star-filled.svg';
import starHalf from '../../assets/img/star-half.svg';
import AddToCartBtn from '../AddCartBtn/AddCartBtn';
import {useEffect} from 'react';

// Page for individual product
const Product = () => {
	const data = useLoaderData();
	const [
		setSidebar,
		getStarSrc,
		setShowCategories,
		setData,
	] = useOutletContext();

	// Show Sidebar on mount / Hide on dismount
	useEffect(() => {
		setShowCategories(false);
		setSidebar(true);

		return () => {
			setShowCategories(true);
			setSidebar(false);
		};
	});

	// Send the product data to `<YouMayLike/>` comp through state
	useEffect(() => setData(data), [data, setData]);

	const starSrc = getStarSrc(data);

	return (
		<div className={styles.productContainer} >
			<img src={data.image} alt={data.title + 'image'} />

			<h2> {data.title} </h2>
			<div className={styles.priceContainer} >
				<span> ${data.price} </span>
				<AddToCartBtn />
			</div>

			<p className={styles.desc} > {data.description} </p>

			<div>
				{/* Star rating */}
				<div>
					{starSrc.map((src, i) => (
						<img src={src} alt={src == star ? 'Filled Star' :
							src == starHalf ? 'Half Star' : src == starEmpty ? 'Empty Star' :
								''}
						key={i}
						/>
					))}
				</div>
				<span> Total Rates: {data.rating.count} </span>
			</div>
		</div>
	);
};

export default Product;
