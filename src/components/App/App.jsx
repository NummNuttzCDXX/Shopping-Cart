import styles from './App.module.css';
import Head from '../Head/Head';
import {Outlet} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Sidebar from '../Sidebar/Sidebar';
import starEmpty from '../../assets/img/star-empty.svg';
import star from '../../assets/img/star-filled.svg';
import starHalf from '../../assets/img/star-half.svg';

function App() {
	const [sidebar, setSidebar] = useState(false);
	const [categories, setCategories] = useState(null);

	// Get categories
	useEffect(() => {
		async function getCategories() {
			const res = await fetch('https://fakestoreapi.com/products/categories', {mode: 'cors', method: 'GET'});
			const raw = await res.json(); // Raw data -- Un-Capitalized

			// Capitalize the first letter of every word
			const data = raw.map((item) => {
				// If `item` is 2 words
				if (item.includes(' ')) {
					const words = item.split(' ');
					const cappedWords = words.map((lower) => (
						lower.replace(lower[0], lower[0].toUpperCase())
					));

					return cappedWords.join(' ');
				} else {
					return item.replace(item[0], item[0].toUpperCase());
				}
			});

			setCategories(data);

			return data;
		}

		getCategories();
	}, []);

	// Get the star images
	const getStarSrc = (data) => {
		const rating = data.rating.rate;
		const stars = [];

		// Round the rating and loop that many times
		for (let i = Math.round(rating); i > 0; i--) {
			stars.push(star); // Push filled star icon
		}

		// Get the number after the decimal
		const decimal = rating.toString().split('.')[1];
		if (decimal) {
			// If rating is close to half, replace last item with half star
			if (decimal > 3 && decimal < 7) {
				stars[stars.length - 1] = starHalf;
			}
		}

		// Push empty stars until length is 5
		if (stars.length < 5) {
			for (let i = 5 - stars.length; i > 0; i--) stars.push(starEmpty);
		}

		return stars;
	};

	return (
		<>
			<Head categories={categories} />

			<div className={styles.content} >
				{ sidebar && categories && <Sidebar categories={categories} /> }
				<main >
					<Outlet context={[setSidebar, getStarSrc]} />
				</main>
			</div>
		</>
	);
}

export default App;
