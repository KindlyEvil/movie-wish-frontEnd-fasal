import React, { useEffect, useState } from 'react';
import searchIMG from '../Assests/searchImg.gif';
import ImgNotFound from '../Assests/ImgNotFound.gif';
import BrandLogo from '../Assests/BrandLogo.png';
import MovieCard from './MovieCard';
import {Link, useNavigate} from 'react-router-dom';
//import jwt from 'jsonwebtoken';

function Home(props) {

    const [search, setSearch] = useState("");

    const [result, setResult] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();

        fetch(`http://www.omdbapi.com/?s=${search}&apikey=c23fbc54`)
            .then(response => response.json())
            .then(data => { setResult(data); });

    }


    return (
        <>
            <div>
                <nav className="navbar navbar-dark bg-dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">
                            <img src={BrandLogo} alt="" width="50" height="40" />
                            Movie-Wish
                        </Link>
                        <Link className='navbar-brand' to='/watchlist' style={{ marginLeft: "55rem" }}>Watch List</Link>
                        <form className="d-flex" role="search" >
                            <input className="form-control me-2"
                                type="search"
                                aria-label="Search"
                                value={search}
                                placeholder="Search Movie"
                                onChange={(e) => setSearch(e.target.value)} />
                            <button className="btn btn-outline-danger" type="submit" onClick={handleSubmit}>Search</button>
                        </form>
                    </div>
                </nav>
            </div>


            <div className='container my-3'>
                <div className='row'>
                    {
                        result ?
                            result?.Response === "True" ?
                                result?.Search?.map((val, index) =>


                                    <div className='col-3' key={index}>
                                        <MovieCard key={index} Poster={val.Poster} Title={val.Title} Year={val.Year} imdbID={val.imdbID} />
                                    </div>
                                ) : <div><h1 className='position-absolute top-50 start-50 translate-middle' style={{ color: "#dc3545",fontWeight:"bolder" }}>No search result found !!!</h1>
                                    <img className='imageSearch' src={ImgNotFound} alt="search-png" style={{ height: "250px" }} />
                                </div> : <div>
                                <h1 className='position-absolute top-50 start-50 translate-middle' style={{ color: "#dc3545", fontWeight:"bolder"}}>Search Your Favourite Movies!!!</h1>
                                <img className='imageSearch' src={searchIMG} alt="search-png" style={{ height: "250px" }} />
                            </div>
                    }

                </div>

            </div>



        </>
    )
}

export default Home