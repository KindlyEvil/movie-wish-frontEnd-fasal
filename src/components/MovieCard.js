import React from 'react'

function MovieCard(props) {

    const { Poster, Title, Year, imdbID } = props;

   async function handleAddToWachList(e) {
        e.preventDefault();
        console.log(imdbID);
        const req = await fetch("http://localhost:1337/api/addToWacthlist", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                imdbID,
            }),
        })
        const data = await req.json()
        if (data.status === 'ok') {
            alert('Movie Added to watchlist')
        } else {
            alert(data.error)
        }

    }

    return (
        <div>
            <div className="card text-danger bg-dark border-danger mb-3" style={{ width: '18rem', height: 'auto', padding: '5px' }}>
                <img src={Poster} className="card-img-top" alt={Title}
                    style={{ width: 'auto', height: "22rem", padding: '2px' }} />
                <div className="card-body">
                    <h5 className="card-title" >{Title}</h5>
                    <p className="card-text">{Year}</p>
                    <a href="# " className="btn btn-outline-danger" onClick={handleAddToWachList}>Add To watch List</a>
                </div>
            </div>
        </div>
    )
}

export default MovieCard