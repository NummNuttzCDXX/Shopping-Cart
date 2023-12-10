import propTypes from 'prop-types';
import styles from './MayAlsoLike.module.css';
import {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import arrow from '../../assets/img/chevron-right.svg'; // Right arrow

const YouMayLike = ({data}) => {
	// Data for products to show
	const [productData, setProductData] = useState([]);

	// Get product data
	useEffect(() => {
		// Get the products from the category of the item given by `Product.jsx`
		async function getDataByCategory() {
			const request = await fetch(`https://fakestoreapi.com/products/category/${data.category}`,
				{mode: 'cors', method: 'GET'});

			const response = await request.json();

			return response;
		}

		getDataByCategory().then((items) => {
			// Filter data -- remove the Current selected product
			return items.filter((item) => item.title != data.title);
		}).then((data) => setProductData(data));
	}, [data]);

	// Calc Slideshow Wrapper height
	// Set card width to wrapper width
	const card = useRef(null);
	const wrapper = useRef(null);
	const [wrapperStyles, setWrapperStyles] = useState({});
	useEffect(() => {
		if (card.current && wrapper.current) {
			// Set wrapper height
			const copyWrapperStyles = {...wrapperStyles};
			copyWrapperStyles.height = card.current.clientHeight + 'px';
			// Set width custom prop
			copyWrapperStyles['--width'] = wrapper.current.clientWidth + 'px';
			setWrapperStyles(copyWrapperStyles);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [card.current, wrapper.current]);

	// Add slideshow effect
	const container = useRef(null);
	const [containerStyles, setContainerStyles] = useState({left: '0px'});
	useEffect(() => {
		let key;
		if (container.current && wrapper.current) {
			key = setInterval(() => {
				changeSlide();
			}, 5000);
		}

		return () => clearInterval(key);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [container.current, wrapper.current, productData]);

	function changeSlide(forward = true) {
		const width = wrapper.current.clientWidth;
		setContainerStyles((prev) => {
			const current = Number(prev.left.split('px')[0]);

			let newLeft;
			// Reset slideshow once its at the end
			if (current <= width * (productData.length - 1) * -1 && forward) {
				// Go to first image
				newLeft = '0px';
			} else if (current >= 0 && !forward) {
				// Go to last image
				newLeft = (width + 10) * (productData.length - 1) * -1 + 'px';
			} else {
				// Go to next image
				newLeft = forward ? current - width - 10 + 'px' :
					current + width + 10 + 'px';
			}

			return {...prev, left: newLeft};
		});
	}

	return (
		<div className={styles.container} >
			<h3 > You might also like... </h3>

			{/* Slideshow Wrapper -- Main container */}
			<div className={styles.slideshowWrapper} ref={wrapper}
				style={wrapperStyles} >
				{/* Slideshow Container -- Container holding all Imgs/Cards */}
				<div className={styles.slideshowContainer} ref={container}
					style={containerStyles}
				>
					{productData.map((data) => {
						return (
							<div className={styles.card} key={data.id} ref={card} >
								<img src={data.image} alt={data.title} />
								{/* Title links to product page */}
								<Link to={'/shop/product/' + data.id} >
									<p> {data.title} </p>
								</Link>
							</div>
						);
					})}
				</div>

				{/* Arrows */}
				<div className={`${styles.arrowContainer} ${styles.left}`}
					onClick={() => changeSlide(false)} >
					<img src={arrow} alt='Go left' className={styles.left} />
				</div>
				<div className={`${styles.arrowContainer} ${styles.right}`}
					onClick={changeSlide} >
					<img src={arrow} alt='Go right' className={styles.right} />
				</div>
			</div>
		</div>
	);
};

YouMayLike.propTypes = {
	data: propTypes.object.isRequired,
};

export default YouMayLike;
