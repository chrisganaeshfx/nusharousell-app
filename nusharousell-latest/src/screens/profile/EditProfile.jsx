import React, { useState } from 'react';
import Dropdown from '../sell/FormDropdown';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db, storage } from '../../config/firebase';

export default function EditProfile({ user, userDetails }) {
	const [imageUrl, setImageUrl] = useState(user?.image || '');
	const [newImageFile, setNewImageFile] = useState(null);
	const [userName, setUserName] = useState(user?.userName || '');
	const [firstName, setFirstName] = useState(user?.firstName || '');
	const [lastName, setLastName] = useState(user?.lastName || '');
	const [meetupLocation, setMeetupLocation] = useState(user?.meetupLocation || '');
	const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
	const [error, setError] = useState('');

  const updatedUserDoc = {
    userName: userName,
    firstName: firstName,
    lastName: lastName,
    meetupLocation: meetupLocation,
    phoneNumber: phoneNumber,
    image: imageUrl,
  };

  console.log('Updated user details: ', updatedUserDoc);
  console.log('newImageFile is', newImageFile);

	const imageHandler = (e) => {
    const types = ['image/png', 'image/jpeg'];
    let file = e.target.files[0];
    if (file && types.includes(file.type)) {
        setNewImageFile(file);
        setError('');
    } else {
        setNewImageFile(null);
        setError('Please select a valid image type (jpg or png)');
    }
  };

	const userImageUploader = (newImageFile, userId) => {
		if (!newImageFile) {
			return null;
		} else {
			return new Promise((resolve, reject) => {
				const newImageRef = ref(storage, `user-images/${userId}_${newImageFile.name}`);
				const uploadTask = uploadBytesResumable(newImageRef, newImageFile);

				uploadTask.on(
					'state_changed',
					(snapshot) => {
						const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						console.log('Upload Progress:', progress);
					},
					(err) => {
						setError(err.message);
						reject(err.message);
					},
					async () => {
						try {
							const newImageUrl = await getDownloadURL(uploadTask.snapshot.ref);
							console.log('New Image URL:', newImageUrl);
							setImageUrl(newImageUrl);
							console.log('Successfully set useState imageUrl to newImageUrl!');
							resolve(newImageUrl);
						} catch (err) {
							setError(err.message);
							reject(err.message);
						}
					}
				);
			});
		}
	};

	const handleEditProfile = async (e) => {
		e.preventDefault();
		try {  
			// Update Firestore document
			const userDoc = doc(db, 'Users', user.uid);
			await updateDoc(userDoc, updatedUserDoc);
      const latestUserDoc = await getDoc(userDoc);
			console.log('Successfully updated user profile to ', latestUserDoc.data());
      window.location.href = '/profile';
		} catch (err) {
			setError(err.message);
			console.error('Error updating profile:', err.message);
		}
	};

	if (!user) {
		return null; // or any loading indicator or message
	}

	return (
		<div className='container edit-profile'>
			<h2>Edit Profile</h2>
			<form
				className='inputs'
				onSubmit={handleEditProfile}>
				<h5>Profile Photo</h5>
				<input
					type='file'
          onChange={imageHandler}/>
				{newImageFile ? (
					<button
						type='button'
						className='btn btn-success'
						onClick={() => userImageUploader(newImageFile, user.uid)}>
						Upload picture
					</button>
				) : (
					<button
						type='button'
						className='btn btn-secondary'>
						Choose file
					</button>
				)}
				{error && <span className='error-msg'>{error}</span>}
				<br />
				<br />
				<h5>Public Profile</h5>
				<label htmlFor='userName'>Username</label>
				<input
					value={userName}
					type='text'
					placeholder={userDetails.userName}
					onChange={(e) => setUserName(e.target.value)}
				/>
				<br />
				<label htmlFor='firstName'>First Name (required)</label>
				<input
					value={firstName}
					type='text'
					placeholder='Enter your first name'
					onChange={(e) => setFirstName(e.target.value)}
				/>
				<br />
				<label htmlFor='lastName'>Last Name</label>
				<input
					value={lastName}
					type='text'
					placeholder='Enter your last name'
					onChange={(e) => setLastName(e.target.value)}
				/>
				<br />
				<br />
				<h5>Private Information</h5>
				<Dropdown
					label='Preferred Meet-up Location'
					value={meetupLocation}
					options={['Kent Ridge MRT', 'Temasek Hall', 'UTown']}
					onChange={setMeetupLocation}
				/>
				<label htmlFor='phoneNumber'>Phone number</label>
				<input
					value={phoneNumber}
					type='number'
					placeholder='+65 '
					onChange={(e) => setPhoneNumber(e.target.value)}
				/>
				<button
					type='submit'
					className='btn btn-success btn-md mybtn'>
					Save Changes
				</button>
			</form>
		</div>
	);
}
