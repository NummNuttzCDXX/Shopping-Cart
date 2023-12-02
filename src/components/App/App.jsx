import styles from './App.module.css';
import Head from '../Head/Head';
import {Outlet} from 'react-router-dom';
import {useEffect, useState} from 'react';

function App() {
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

	return (
		<>
			<Head categories={categories} />

			<main >
				<Outlet />
			</main>
		</>
	);
}

export default App;
