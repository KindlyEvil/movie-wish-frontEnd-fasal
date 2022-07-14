import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import MovieListCard from './MovieListCard';
import jwt_decode from 'jwt-decode';
import BrandLogo from '../Assests/BrandLogo.png';
import { Link } from 'react-router-dom';

function WatchList() {

	const [moviesId, setMoviesId] = useState([]);
	const navigate = useNavigate();
	async function makepublic() {
		const req = await fetch('http://localhost:1337/makepublic', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': localStorage.getItem('token'),
			}
		})
		const data = await req.json()
		if (data.status === 'success') {
			const decoded = jwt_decode(localStorage.getItem("token"));
			navigate(`/watchlist/${decoded.email}`)
			alert("Now You can share the Url with your Friends...")
		}
	}
	async function makeprivate() {
		const res = await fetch('http://localhost:1337/makeprivate', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': localStorage.getItem('token'),
			}
		})
		const data = await res.json()
		if (data.status === 'success') {
			alert('Watchlist is made private.')
		}
	}

	async function moviesAdd() {
		const res = await fetch('http://localhost:1337/watchlist', {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})
		var data = await res.json();
		setMoviesId(data.data);
		console.log(data);
	}

	useEffect(() => {
		moviesAdd();
	}, [])

	return (
		<div>
			<div className='navbar bg-dark' style={{ height: "2cm" }}>
				<Link className="navbar-brand text-light" to="/">
					<img src={BrandLogo} alt="" width="50" height="40" />
					Movie-Wish
				</Link>
				<div className="nav-item text-light me-auto mb-2 mb-lg-0">
					<Link className="nav-link" style={{fontSize:"18px", marginLeft:"1cm"}} to="/">Home</Link>
				</div>
			</div>
			<div className="watclistButtons">
				<button onClick={makepublic} className='btn btn-outline-success' style={{ marginLeft: "28cm" }}>Make Public</button>
				<button onClick={makeprivate} className='btn btn-outline-danger' style={{ marginLeft: "2cm" }}>Make Private</button>
			</div>
			<div>
				{
					moviesId?.map((ele, index) => <MovieListCard imdbID={ele} key={index} />)
				}
			</div>
		</div>
	)
}

export default WatchList;
