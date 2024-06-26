import React, { useState } from 'react';
import { useAuthUser } from '../GLOBAL/contexts/AuthUserContext';
import { db, storage } from '../../config/firebase';
import { setDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Dropdown from './FormDropdown';
import { v4 as uuidv4 } from 'uuid';
import '../styles/AddProduct.css';

export default function AddProduct() {
	const { user } = useAuthUser();
  console.log('User: ', user);
	const [productName, setProductName] = useState('');
	const [category, setCategory] = useState('');
	const [condition, setCondition] = useState('');
	const [description, setDescription] = useState('');
	const [location, setLocation] = useState('');
	const [price, setPrice] = useState(0);

	const [imageFile, setImageFile] = useState(null);
	const [imagePreviewUrl, setImagePreviewUrl] = useState('');
	const [imageUrl, setImageUrl] = useState('');

	const [error, setError] = useState('');
	const types = ['image/png', 'image/jpeg'];

	const imageHandler = (e) => {
		let file = e.target.files[0];
		if (file && types.includes(file.type)) {
			setImageFile(file);
			setImagePreviewUrl(URL.createObjectURL(file)); // Create a preview URL for the selected image
			setError('');
		} else {
			setImageFile(null);
			setImagePreviewUrl('');
			setError('Please select a valid image type (jpg or png)');
		}
	};

	const productImageUploader = (imageFile, productID) => {
    return new Promise((resolve, reject) => {
      const newImageRef = ref(storage, `product-images/${productID}_${imageFile.name}`);
  
      const uploadTask = uploadBytesResumable(newImageRef, imageFile);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (err) => {
          console.error(err.message);
          reject(err.message);
        },
        async () => {
          try {
            const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
            setImageUrl(imageUrl);
            console.log('Successfully retrieved image URL from Firebase Storage and set it to imageUrl state');
            resolve(imageUrl);
          } catch (err) {
            setError(err.message);
            reject(err.message);
          }
        }
      );
    });
  };
  
	const handleAddProduct = async (e) => {
		e.preventDefault();
		try {
			const productID = uuidv4();
			const imageUrl = await productImageUploader(imageFile, productID); // Await the image upload task here

			const newProductData = {
				sellerUserName: user.userName,
				sellerImageUrl: user.imageUrl,
				sellerID: user.userID,
				sellerEmail: user.email,

				productID: productID,
				productName: productName,
				productPrice: Number(price),
				productCategory: category,
				productCondition: condition,
				productDescription: description,
				productLocation: location,
				productImageUrl: imageUrl,
				createdAt: new Date(),
				productStatus: 'Available',
			};

      // Debugging: log the newProductData to ensure all fields are populated
			console.log('New Product Data:', newProductData);
			await setDoc(doc(db, 'Products', productID), newProductData);
			const userDocRef = doc(db, 'Users', user.userID);
			await updateDoc(userDocRef, {
				userProducts: arrayUnion(productID),
			});
			console.log("Successfully updated user's userProducts collection: ");

			setProductName('');
			setPrice(0);
			setCategory('');
			setCondition('');
			setDescription('');
			setLocation('');
			setImageFile(null);
			setImagePreviewUrl('');
			setImageUrl('');
			setError('');
			document.getElementById('file').value = '';
			// window.location.href = `/userprofile/view/${user.userID}`;
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<>
			<h2>Add product for sale</h2>
			<form
				className='inputs'
				onSubmit={handleAddProduct}>
				<div className='image-preview'>
					{imagePreviewUrl && (
						<img
							src={imagePreviewUrl}
							alt='Product'
							className='preview-image'
						/>
					)}
				</div>
				<label htmlFor='image'>Image</label>
				<input
					type='file'
					id='file'
					onChange={imageHandler}
					required
				/>
				{error && <span className='error-msg'>{error}</span>}
				<br />
				<label htmlFor='productName'>Item Name</label>
				<input
					value={productName}
					type='text'
					placeholder='Item Name'
					onChange={(e) => setProductName(e.target.value)}
					required
				/>
				<br />
				<label htmlFor='price'>Price</label>
				<input
					value={price}
					type='number'
					placeholder='Price'
					onChange={(e) => setPrice(e.target.value)}
					required
				/>
				<br />
				<Dropdown
					label='Category'
					value={category}
					options={['Clothes', 'Electronics', 'Sports', 'Health']}
					onChange={setCategory}
				/>
				<Dropdown
					label='Condition'
					value={condition}
					options={['Brand New', 'Like New', 'Lightly Used', 'Well Used', 'Heavily Used']}
					onChange={setCondition}
				/>
				<br />
				<label htmlFor='description'>Description</label>
				<input
					value={description}
					type='text'
					placeholder='Description'
					onChange={(e) => setDescription(e.target.value)}
				/>
				<Dropdown
					label='Meet-up Location'
					value={location}
					options={['Kent Ridge MRT', 'Temasek Hall', 'UTown']}
					onChange={setLocation}
				/>
				<button
					type='submit'
					className='btn btn-success btn-md mybtn'>
					Submit
				</button>
			</form>
			{error && <span className='error-msg'>{error}</span>}
		</>
	);
}
