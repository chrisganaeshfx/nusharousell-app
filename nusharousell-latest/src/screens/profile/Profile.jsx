import React from 'react';
import '../styles/Profile.css';
import { IoMdMail } from "react-icons/io";
import { FaPhoneAlt, FaStar, FaSchool } from "react-icons/fa";

export default function Profile({ user, userDetails }) {
  console.log('Current user: ', user);
  console.log('Current user details: ', userDetails);
  
  if (!userDetails) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className='profile-page'>
      <div className='profile-column'>
        <div className='avatar'>
          {userDetails.image && <img src={userDetails.image} alt={`${userDetails.userName}'s profile-pic`} />}
        </div>
        <h3>@{userDetails.userName}</h3>
        <p><IoMdMail />: {userDetails.email}</p>
        <p><FaPhoneAlt />: +65 {Number(userDetails.phoneNumber)}</p>
        <p><FaStar />: {userDetails.rating}/5.0</p>
        <p><FaSchool />: {userDetails.meetupLocation}</p>
        <button><a onClick={() => window.location.href = '/profile/edit'}>Edit Profile</a></button>
      </div>
      <div className='listing-column'>
        <h2>My Listings</h2>
        <br/>
      </div>
    </div>
  );
}
