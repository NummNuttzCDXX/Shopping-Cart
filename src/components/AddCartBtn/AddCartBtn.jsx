import {useOutletContext} from 'react-router';
import propTypes from 'prop-types';
import styles from './AddCartBtn.module.css';
import {useState} from 'react';

const AddToCartBtn = ({itemData}) => {
	// Value for number input
	const [numInp, setNumInp] = useState(1);

	const setCart = useOutletContext()[4];
	const cart = useOutletContext()[5];

	return (
		<div className={styles.addCartContainer} >
			<input type='number' value={numInp}
				onChange={(e) => setNumInp(e.target.value)}
				min={1}
			/>

			<button type="button"
				className={styles.addCartBtn}
				onClick={() => {
					let copy = [...cart]; // Copy cart

					// Add 'quantity' prop to data object
					const item = {
						...itemData,
						quantity: numInp,
					};

					// Determine if an item is in the cart twice
					const twice = (() => {
						let double = false;
						copy.forEach((data) => {
							if (data.title == item.title) double = true;
						});

						return double;
					})();

					// If item was added twice, add the quantities together
					if (twice) {
						// Update copy with added quantities
						copy = copy.map((v) => {
							if (v.title == item.title) {
								v.quantity = Number(v.quantity);
								v.quantity += Number(item.quantity);
							}

							return v;
						});
					} else {
						copy.push(item);
					}

					setCart(copy);

					// Reset input
					setNumInp(1);
				}}
			>
				Add to Cart
			</button>
		</div>
	);
};

AddToCartBtn.propTypes = {
	itemData: propTypes.object,
};

export default AddToCartBtn;
