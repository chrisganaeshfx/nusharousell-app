import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../config/firebase';
import { useAuthUser } from '../GLOBAL/contexts/AuthUserContext';
import Dropdown from './FormDropdown';

export default function EditProduct() {
  const { productID } = useParams();
  const { user } = useAuthUser();
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState(0);
  const [error, setError] = useState('');
  const types = ['image/png', 'image/jpeg'];

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productRef = doc(db, 'Products', productID);
        const docSnapshot = await getDoc(productRef);

        if (docSnapshot.exists()) {
          const productData = docSnapshot.data();
          setProductName(productData.productName);
          setCategory(productData.productCategory);
          setCondition(productData.productCondition);
          setDescription(productData.productDescription);
          setLocation(productData.productLocation);
          setPrice(productData.productPrice);
          setImageUrl(productData.productImageUrl); // Set image URL for preview
        } else {
          setError('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError(error.message);
      }
    };

    fetchProductDetails();
  }, [productID]);

  const imageHandler = (e) => {
    let file = e.target.files[0];
    if (file && types.includes(file.type)) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file)); // Create a preview URL for the selected image
      setError('');
    } else {
      setImage(null);
      setImageUrl('');
      setError('Please select a valid image type (jpg or png)');
    }
  };

  const productImageUploader = (newImageFile, productID) => {
    return new Promise((resolve, reject) => {
      const newImageRef = ref(storage, `product-images/${productID}_${newImageFile.name}`);
      const uploadTask = uploadBytesResumable(newImageRef, newImageFile);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (err) => {
          setError(err.message);
          reject(err.message);
        },
        async () => {
          try {
            const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('Image URL:', imageUrl);
            resolve(imageUrl);
          } catch (err) {
            setError(err.message);
            reject(err.message);
          }
        }
      );
    });
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();

    try {
      // Perform image upload if a new image is selected
      let newImageUrl = imageUrl; // Default to current imageUrl
      if (image) {
        newImageUrl = await productImageUploader(image, productID);
      }

      const productRef = doc(db, 'Products', productID);
      await updateDoc(productRef, {
        productName,
        productPrice: Number(price),
        productCategory: category,
        productCondition: condition,
        productDescription: description,
        productLocation: location,
        productImageUrl: newImageUrl,
      });

      setError('');
      window.location.href = `/product/view/${productID}`;
      console.log('Product updated successfully!');
    } catch (err) {
      console.error('Error editing product:', err);
      setError(err.message);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2>Edit Product</h2>
      <form className='inputs' onSubmit={handleEditProduct}>
      <h5> Image </h5>
        <div className='image-preview'>
          {imageUrl && (
            <img src={imageUrl} alt='Product' className='preview-image' />
          )}
        </div>
        <input type='file' id='file' onChange={imageHandler} />
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
        <button type='submit' className='btn btn-success btn-md mybtn'>
          Submit
        </button>
      </form>
      {error && <span className='error-msg'>{error}</span>}
    </>
  );
}
