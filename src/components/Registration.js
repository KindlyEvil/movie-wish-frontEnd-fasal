import React, { useState } from 'react';
import { Button } from '@mui/material';
import "./Main.css";
import { useNavigate, Link } from 'react-router-dom';
import BrandLogo from '../Assests/BrandLogo.png';

function Registration() {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleRegister(event) {
        event.preventDefault();
        const response = await fetch("http://localhost:1337/api/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
            })
        })
        const data = await response.json();

        if (data.status === 'ok') {
            navigate('/');
        } else {
            alert(data.error);
        }


        console.log(data);
    }


    return (
        <div>
            <div className='navbar bg-dark' style={{ height: "2cm" }}>
                <p className="navbar-brand text-light">
                    <img src={BrandLogo} alt="Movie-Wish" width="50" height="40" />
                    Movie-Wish
                </p>
            </div>
            <h1 className='registrationHeading text-danger'>Registration</h1>
            <form className='formRegister border border-danger bg-dark w-25 position-absolute top-50 start-50 translate-middle'>

                <div className="form-floating mb-3 mt-4">
                    <input type="text"
                        className="form-control" id="floatingInput"
                        placeholder="john"
                        variant="outlined"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }} />
                    <label className='text-danger' htmlFor="floatingInput">Name</label>
                </div>

                <div className="form-floating mb-3 mt-4">
                    <input type="email"
                        className="form-control" id="floatingInput"
                        placeholder="name@example.com"
                        variant="outlined"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }} />
                    <label className='text-danger' htmlFor="floatingInput">Email</label>
                </div>

                <div className="form-floating">
                    <input type="password"
                        className="form-control" id="floatingPassword"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }} />
                    <label className='text-danger' htmlFor="floatingPassword">Password</label>
                </div>


                <div className='submit-btn' margin-top="25px" >
                    <Button color="error" sx={{ width: '100%' }} variant="contained" type="submit" onClick={handleRegister} >Register</Button>
                </div>
                <div className='mt-2 float-end'>
                    <Link className='link-danger' to='/login'>Already Have A Account?</Link>
                </div>
            </form>

        </div>
    )
}

export default Registration