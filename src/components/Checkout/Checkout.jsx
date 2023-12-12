import {useOutletContext, Link} from 'react-router-dom';
import styles from './Checkout.module.css';
import propTypes from 'prop-types';
import {useEffect, useState} from 'react';

const Checkout = () => {
	const setCart = useOutletContext()[4];
	const cart = useOutletContext()[5];

	function getSubtotal(cart) {
		let total = 0;
		cart.forEach((item) => {
			total += item.price * item.quantity;
		});

		return Math.round(total * 100) / 100;
	}

	return (
		<div className={styles.cartContainer} >
			<div className={styles.items} >
				<ul>
					{ cart.length > 0 ?
						cart.map((item) => (
							<li key={item.id} className={styles.item} >
								<img src={item.image} alt={item.title} />

								<QuantitySelect item={item} />

								<span className={styles.title} > {item.title} </span>

								<span className={styles.price} > ${item.price} </span>

								{/* Subtotal container -- Add price * quantity */}
								<div className={styles.subtotal}>
									<span className={styles.head}>Subtotal:</span>
									<span>
										{/* Round number to nearest 2 decimals */}
									${Math.round((item.price * item.quantity) * 100) / 100}
									</span>
								</div>
							</li>
						)) :
						<p>
							Your cart is empty... <br />
							<Link to={'/shop'}>
								Click here to buy some stuff!
							</Link>
						</p>
					}
				</ul>
			</div>

			<div className={styles.subtotal}>
				<span className={styles.head}>Subtotal:</span>
				<span>
					${getSubtotal(cart)}
				</span>

				<button type='button' className={styles.checkoutBtn}
					onClick={() => setCart([])} >
					Checkout
				</button>
			</div>
		</div>
	);
};

// Create QuantitySelect Component to control the state on each one
const QuantitySelect = ({item}) => {
	// Input value
	const [quantity, setQuantity] = useState(item.quantity);
	// Is quantity greater than 10?
	const [largeQuantity, setLargeQuantity] = useState(false);
	const setCart = useOutletContext()[4];

	useEffect(() => {
		if (quantity == 'remove') {
			// Remove item from cart
			setCart((prev) => prev.filter((v) => v != item));
		} else if (quantity >= 10) setLargeQuantity(true);
		else if (quantity < 10 && largeQuantity) setLargeQuantity(false);
	}, [item, quantity, largeQuantity, setCart]);

	function onChange(e) {
		// Update quantity on change
		setQuantity(e.target.value);

		// Update cart with the updated items quantity
		setCart((prev) => prev.map((val) => {
			if (val == item) val.quantity = e.target.value;

			return val;
		}));
	}

	return (
		<>
			{ !largeQuantity ?
				<select className={styles.quantity}
					value={quantity}
					onChange={onChange}
				>
					<option value="remove">0 (delete)</option>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
					<option value="6">6</option>
					<option value="7">7</option>
					<option value="8">8</option>
					<option value="9">9</option>
					<option value="10">10+</option>
				</select> :
				<input type='number' value={quantity}
					onChange={onChange}
					min={0}
				/>
			}
		</>
	);
};

QuantitySelect.propTypes = {
	item: propTypes.object.isRequired,
};

export default Checkout;
