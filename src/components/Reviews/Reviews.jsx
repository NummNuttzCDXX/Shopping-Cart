import {useEffect, useRef, useState} from 'react';
import styles from './Reviews.module.css';
import propTypes from 'prop-types';
import {useOutletContext} from 'react-router';

// Star imgs
import emptyStar from '../../assets/img/star-empty.svg';
import fullStar from '../../assets/img/star-filled.svg';
import halfStar from '../../assets/img/star-half.svg';

const Reviews = ({avgRate}) => {
	// All users from API (FAKE)
	const [users, setUsers] = useState([]);
	// Current user data + review (REAL)
	const [userReview, setUserReview] = useState(null);
	const [leaveReview, setLeaveReview] = useState(false);
	const getStars = useOutletContext()[1];

	// Robo Hash API for dummy imgs
	const imgUrl = 'https://robohash.org/';

	// Get users from API
	useEffect(() => {
		async function getUsers() {
			const req = await fetch('https://fakestoreapi.com/users?limit=20', {mode: 'cors', method: 'GET'});
			const resp = await req.json();

			return resp;
		}

		// If no users, get users & save
		if (users.length == 0) getUsers().then((data) => setUsers(data));
	});

	// Get the stars/picture for each user review
	useEffect(() => {
		const newUsers = []; // Declare new array for users
		// Determine if stars were added to users
		// Only want to run once
		let ran = false;

		users.forEach((user) => {
			// If user has no star rating
			if (!user.stars) {
				ran = true;
				// Get a random number from 0-3 to determine if the review
				// will have 1, -1, 0.5, or the same stars more/less than average review
				// So all the reviews arent the same star rating
				const random = Math.round(Math.random() * 3);
				let number = random == 0 ? avgRate :
					random == 1 ? avgRate + 1 :
						random == 2 ? avgRate - 1 :
							random == 3 ? avgRate + .5 : '';
				// Error check
				if (number == '') throw new Error('Error getting number');
				else if (number > 5) number = 5;

				// Save array of star images on the user
				user.stars = getStars({rating: {rate: number}});
			}

			// Add profile picture URL
			if (!user.url) {
				ran = true;
				const url = `${imgUrl}${user.name.firstname + user.name.lastname}` +
					`?bgset=bg${Math.round(Math.random() + 1)}`;

				user.url = url;
			}

			newUsers.push(user);
		});

		// If users had no star rating ... now they do
		if (ran) setUsers(newUsers);
	}, [users, avgRate, getStars]);

	// Add current (REAL) user to `users` array/state
	useEffect(() => {
		if (userReview && !users.includes(userReview)) {
			setUsers((u) => [userReview, ...u]);
		}
	}, [userReview, users]);

	return (
		<div className={styles.commentSection} >
			{leaveReview ?
				<LeaveReview addReview={setUserReview} setForm={setLeaveReview} /> :

				<button type='button' className={styles.reviewBtn}
					onClick={() => setLeaveReview(true)} >
					Leave review
				</button>
			}

			<h3>Reviews</h3>

			{/* Load reviews */}
			{ users.map((data) => (
				<div className={styles.review} key={'com' + data.id} >
					{/* Profile: img && username */}
					<div className={styles.profile} >
						<img src={data.url} alt='Profile Picture' />

						<p className={styles.name}>@{data.username}</p>
					</div>

					{/* Star Container */}
					<div className={styles.starContainer} >
						{ data.stars && data.stars.map((src, i) => (
							<img src={src} alt='Star' key={'star' + i + data.id} />
						))}
					</div>

					<div className={styles.content} >
						{data.review ? data.review :
							`Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Assumenda natus modi, culpa at corrupti voluptatem dolorum
							ipsum in ipsa numquam doloremque, dolores earum, quam aspernatur
							saepe voluptates amet facilis. Magni!`
						}
					</div>
				</div>
			)) }
		</div>
	);
};

Reviews.propTypes = {
	avgRate: propTypes.number,
};

// Leave a Review Form
const LeaveReview = ({addReview, setForm}) => {
	// Controlled inputs -- state
	const [first, setFirst] = useState('');
	const [last, setLast] = useState('');
	const [review, setReview] = useState('');

	// Initially set all stars to empty -- Before user review
	const [stars, setStars] = useState([
		emptyStar, emptyStar, emptyStar, emptyStar, emptyStar,
	]);
	const [rating, setRating] = useState(0); // Save users rating
	const [starInvalidMsg, setStarInvalidMsg] = useState('');

	// Input references
	const firstRef = useRef(null);
	const lastRef = useRef(null);
	const revRef = useRef(null);

	// Check if form is valid on submit
	function formValidation() {
		let valid = true;

		// Check if form fields are invalid and set custom validity
		if (first == '' && firstRef.current) {
			valid = false;
			firstRef.current.setCustomValidity('Required fields must be filled');
		}

		if (last == '' && lastRef.current) {
			valid = false;
			lastRef.current.setCustomValidity('Required fields must be filled');
		}

		if (review == '' && revRef.current) {
			valid = false;
			revRef.current.setCustomValidity('Required fields must be filled');
		}

		if (rating == 0) {
			valid = false;
			setStarInvalidMsg('Click a star to give a rating');
		}

		// If form is valid reset custom validity messages
		if (valid) {
			firstRef.current.setCustomValidity('');
			lastRef.current.setCustomValidity('');
			revRef.current.setCustomValidity('');
			setStarInvalidMsg('');
		}

		return valid;
	}

	function updateStars(index) {
		setStars((prev) => {
			let total = 0;
			const stars = prev.map((item, i) => {
				// If star is full & is the star that was clicked
				// Change from full star to half star
				if (i == index && item == fullStar) {
					item = halfStar;
					total += 0.5;
				} else if (i <= index) {
					item = fullStar;
					total += 1;
				} else {
					item = emptyStar;
				}

				setRating(total);
				return item;
			});

			return stars;
		});
	}

	return (
		<form>
			<h3>Leave a review!</h3>

			<div className={styles.starContainer} >
				{stars.map((src, i) => (
					<img src={src} alt='Star Review' key={'star' + i + 'b'} data={i}
						onClick={() => updateStars(i)}
					/>
				))}
				<span>{rating}</span>
				<span className={styles.starInvalidMsg}>{starInvalidMsg}</span>
			</div>

			<div className={styles.names} >
				<label>
					<span>First: </span>
					<input type="text" ref={firstRef}
						value={first}
						onChange={(e) => setFirst(e.target.value)}
					/>
				</label>

				<label>
					<span>Last: </span>
					<input type="text" ref={lastRef}
						value={last}
						onChange={(e) => setLast(e.target.value)}
					/>
				</label>
			</div>

			<label htmlFor="review">Review:</label>
			<textarea name="review" id='review' rows="5" ref={revRef}
				value={review}
				placeholder='Leave us a review!'
				onChange={(e) => setReview(e.target.value)}
			/>

			<button type='submit' className={styles.submitBtn}
				onClick={(e) => {
					e.preventDefault();

					// If valid
					if (formValidation()) {
						// Create user data object
						addReview({
							id: review.slice(0, 8) + Math.round(Math.random() * 25),
							name: {firstname: first, lastname: last},
							username: first[0] + last.slice(0, 5), // Auto gen username
							review: review,
							rating: {rate: rating},
							stars: stars,
						});

						// Reset inputs
						setFirst('');
						setLast('');
						setRating(0);
						setReview('');
						setStars([
							emptyStar, emptyStar, emptyStar, emptyStar, emptyStar,
						]);

						setForm(false);
					}
				}}
			>
				Submit
			</button>
		</form>
	);
};

LeaveReview.propTypes = {
	addReview: propTypes.func.isRequired,
	setForm: propTypes.func,
};

export default Reviews;
