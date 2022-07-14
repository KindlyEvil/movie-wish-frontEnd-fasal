import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieListCard from "./MovieListCard";
import NotAccess from '../Assests/NotAccess.gif'

function PublicWatchList() {

    let { email } = useParams();
    const [visible, setVisible] = useState(false);
    const [moviesID, setMovieID] = useState([]);
    async function reqwatchlist() {
        const req = await fetch(`http://localhost:1337/watchlist/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
            }
        })
        const data = await req.json()
        if (data.message) {

        } else {
            setMovieID(data);
            setVisible(true);
        }
    }
    useEffect(() => {
        reqwatchlist();
    }, [])

    return (
        <div style={{ color: "white" }}>
            <h1>
                {email} Watchlist
            </h1>
            <div className="centerMovies">
                {
                    visible ? moviesID.map((ele, index) => <MovieListCard imdbID={ele} key={index}/>) : <div>You cannot acces this watchlist
                        <div style={{marginTop:"2cm"}}>
                        <img src={NotAccess} alt="Not Access"/>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default PublicWatchList