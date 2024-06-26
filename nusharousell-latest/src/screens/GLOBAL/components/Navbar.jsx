import React, { useState } from 'react';
import { auth } from '../../../config/firebase';
import { useAuthUser } from '../contexts/AuthUserContext';

import logo from '../assets/logos/horizontal-logo.png';
import { FaSearch, FaRegHeart } from 'react-icons/fa';
import { MdChatBubbleOutline } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import '../../styles/Navbar.css';

export default function Navbar() {

  const { user, setUser } = useAuthUser();
	
  const [search, setSearch] = useState('');
	const handleSearch = (e) => {
		e.preventDefault();
	};

  async function handleLogout() {
    try {
      await auth.signOut();
      console.log("User successfully logged out!");
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }
    

	return (
		<div className='header'>
			<div className='top-header'>
				<div className='leftside-header'>
					<a href='/'>
						<img
							src={logo}
							alt='logo'
						/>
          </a>
        </div>
        {user ? (
          <div className='rightside-header'>
            <div className='dropdown'>
              <a className='dropbtn'>Hello, {user.userName} <CgProfile /></a>
              <div className='dropdown-content'>
                <Link to={`/userprofile/view/${user.userID}`}>Profile</Link>
                <Link to="/">Manage Listings</Link>
                <Link to="/">Settings</Link>
                <a onClick={() => {handleLogout()}}>Logout</a>
              </div>
            </div>
            <a href='/'><FaRegHeart /></a>
            <Link to="/chats"><MdChatBubbleOutline/></Link>
            <Link to="/product/add">Sell</Link>
          </div>
        ) : (
          <div className='rightside-header'>
            <Link to="/login">Login</Link>
            <Link to="/signup">Register</Link>
          </div>
        )}
      </div>       
			<div className='bottom-header'>
				<div className='search_box'>
					<input
						type='text'
						value={search}
						placeholder='Search'
						onChange={(e) => setSearch(e.target.value)}></input>
					<button onClick={handleSearch}>
						<FaSearch />{' '}
					</button>
				</div>
			</div>
		</div>
  );
}