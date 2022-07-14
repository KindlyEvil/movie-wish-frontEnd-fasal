import React, { useState } from 'react';
import "./Main.css";
import { Button } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import BrandLogo from '../Assests/BrandLogo.png';



function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await fetch('http://localhost:1337/api/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })

        const data = await response.json();

        console.log(data);
        if (data.user) {
            localStorage.setItem('token', data.user);
            navigate("/");
        } else {
            alert('Please check your username and password')
        }

    }

    return (
        <div>
            <div className='navbar bg-dark' style={{ height: "2cm" }}>
				<p className="navbar-brand text-light">
					<img src={BrandLogo} alt="Movie-Wish" width="50" height="40" />
					Movie-Wish
				</p>
			</div>
            <h1 className='loginHeading text-danger'>Login</h1>
            <form className='form border border-danger bg-dark w-25 position-absolute top-50 start-50 translate-middle'>
                <div className="form-floating mb-3 mt-4">
                    <input type="email"
                        className="form-control" id="floatingInput"
                        placeholder="name@example.com"
                        variant="outlined"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }} />
                    <label className='text-danger' htmlFor="floatingInput">Email</label>
                </div>
                <div className="form-floating danger">
                    <input type="password"
                        className="form-control" id="floatingPassword"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }} />
                    <label className='text-danger' htmlFor="floatingPassword">Password</label>
                </div>

                <div className='submit-btn' margin-top="25px">
                    <Button color="error" sx={{ width: '100%' }} variant="contained" type="submit" onClick={handleSubmit}>Login</Button>
                </div>

                <div className='mt-2 float-end'>
                    <Link className='link-danger' to='/registration'>Click Here To Register</Link>
                </div>
            </form>

        </div>
    )
}

export default Login