import React, { useState, useEffect } from 'react';
import Dropdown from '../sell/FormDropdown';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc, getDoc, query, where, getDocs, collection } from 'firebase/firestore';
import { db, storage } from '../../config/firebase';
import { useAuthUser } from '../GLOBAL/contexts/AuthUserContext';

export default function EditProfile() {
  const { user } = useAuthUser();
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [meetupLocation, setMeetupLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const types = ['image/png', 'image/jpeg'];

  useEffect(() => {
    if (user) {
      setUserName(user.userName || '');
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setMeetupLocation(user.meetupLocation || '');
      setPhoneNumber(user.phoneNumber || '');
      setImageUrl(user.imageUrl || '');
      if (user.imageUrl) {
        setImagePreviewUrl(user.imageUrl);
      }
    }
  }, [user]);

  const imageHandler = (e) => {
    let file = e.target.files[0];
    if (file && types.includes(file.type)) {
      setImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
      setError('');
    } else {
      setImageFile(null);
      setImagePreviewUrl('');
      setError('Please select a valid image type (jpg or png)');
    }
  };

  const userImageUploader = (imageFile, userID) => {
    if (!imageFile) {
      return Promise.resolve(imageUrl); // Use existing image URL if no new image is selected
    } else {
      return new Promise((resolve, reject) => {
        const imageRef = ref(storage, `user-images/${userID}_${imageFile.name}`);
        const uploadTask = uploadBytesResumable(imageRef, imageFile);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload Progress:', progress);
            console.log('Successfully uploaded Product image onto Firebase Storage');
          },
          (err) => {
            setError(err.message);
            console.error(err.message);
            reject(err.message);
          },
          async () => {
            try {
              const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
              setImageUrl(imageUrl);
              console.log('New Image URL:', imageUrl);
              console.log('Successfully retrieved image URL from Firebase Storage and set it to imageUrl state!');
              resolve(imageUrl);
            } catch (err) {
              setError(err.message);
              console.error(err.message);
              reject(err.message);
            }
          }
        );
      });
    }
  };

  const updateUserProducts = async (updatedUserName, updatedImageUrl) => {
    try {
      const productsRef = collection(db, 'Products');
      const q = query(productsRef, where('sellerID', '==', user.userID));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (productDoc) => {
        await updateDoc(doc(db, 'Products', productDoc.id), {
          sellerUserName: updatedUserName,
          sellerImageUrl: updatedImageUrl
        });
      });

      console.log('Successfully updated user products with new username and image URL');
    } catch (error) {
      console.error('Error updating user products:', error.message);
    }
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    try {
      const uploadedImageUrl = await userImageUploader(imageFile, user.userID);

      const updatedUserData = {
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        meetupLocation: meetupLocation,
        phoneNumber: phoneNumber,
        imageUrl: uploadedImageUrl,
      };

      const userDoc = doc(db, 'Users', user.userID);
      await updateDoc(userDoc, updatedUserData);

      await updateUserProducts(userName, uploadedImageUrl);

      const latestUserDoc = await getDoc(userDoc);
      console.log('Successfully updated user profile to ', latestUserDoc.data());
      window.location.href = `/userprofile/view/${user.userID}`;
    } catch (err) {
      setError(err.message);
      console.error('Error updating profile:', err.message);
    }
  };

  if (!user) {
    return null; // or any loading indicator or message
  }

  return (
    <>
      <h2>Edit Profile</h2>
      <div className='container edit-profile'>
        <form className='inputs' onSubmit={handleEditProfile}>
          <h5>Profile Photo</h5>
          <div className='image-preview'>
            {imagePreviewUrl && (
              <img src={imagePreviewUrl} alt='Profile' className='preview-image' />
            )}
          </div>
          <input type='file' onChange={imageHandler} />
          {error && <span className='error-msg'>{error}</span>}
          <br />
          <br />
          <h5>Public Profile</h5>
          <label htmlFor='userName'>Username</label>
          <input
            value={userName}
            type='text'
            placeholder='Enter your username'
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
          <button type='submit' className='btn btn-success btn-md mybtn'>
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
}
