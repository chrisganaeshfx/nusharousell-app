import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db} from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
// import SignInwithGoogle from "./signInWIthGoogle";

export const Login = () => {

  const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password); 
      setEmail('');
      setPassword('');
      setError('');
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  }

	return (
		<div className='container'>
			<br />
			<h2>Login</h2>
			<br />
			<form
				autoComplete='off'
				className='form-group'
				onSubmit={handleLogin}>
				<label htmlFor='email'>Email</label>
				<input
					type='email'
					className='form-control'
          placeholder='Enter email'
					required
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
				<br />
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					className='form-control'
          placeholder='Enter password'
					required
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
				<br />
				<button
					type='submit'
					className='btn btn-success btn-md mybtn'>
					LOGIN
				</button>
			</form>
			{error && <span className='error-msg'>{error}</span>}
			<br />
			<span>
				Don't have an account? Register
				<Link to='signup'> Here</Link>
			</span>
		</div>
	);
};

export default Login;
