import React, { useState } from "react";
import ProductList from "./ProductList";
import Dropdown from "./Dropdown";
// import "./AddProduct.css";

// add img part hold on cos nid firebase or sth
export default function AddProduct({ product, setProduct }) {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null);
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const types = ["image/png", "image/jpeg"];

  const imgHandler = (e) => {
    let file = e.target.files[0];
    if (file && types.includes(file.type)) {
      setImg(file);
      setError("");
    } else {
      setImg(null);
      setError("Please select a valid image type (jpg or png)");
    }
  };

  function handleAddProduct(e) {
    e.preventDefault(); // Prevents refreshing
    const newProduct = {
      productName,
      category,
      price,
      condition,
      description,
      location,
    };
    setProduct([newProduct, ...product]);
    // Reset all input fields after submitting
    setProductName("");
    setCategory("");
    setPrice("");
    setCondition("");
    setDescription("");
  }

  return (
    <>
      <br />
      <h2>Add product for sale</h2>
      <form className="inputs" onSubmit={handleAddProduct}>
        <label htmlFor="img">Image</label>
        <input type="file" id="file" onChange={imgHandler} required />
        {error && <span className="error-msg">{error}</span>}
        <br />
        <label htmlFor="productName">Item Name</label>
        <input
          value={productName}
          type="text"
          placeholder="Item Name"
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <br />
        <label htmlFor="price">Price</label>
        <input
          value={price}
          type="number"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <br />
        <Dropdown
          label="Category"
          value={category}
          options={["Clothes", "Electronics", "Sports", "Health"]}
          onChange={setCategory}
        />
        <Dropdown
          label="Condition"
          value={condition}
          options={[
            "Brand New",
            "Like New",
            "Lightly Used",
            "Well Used",
            "Heavily Used",
          ]}
          onChange={setCondition}
        />
        <br />
        <label htmlFor="description">Description</label>
        <input
          value={description}
          type="text"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Dropdown
          label="Meet-up Location"
          value={location}
          options={["Kent Ridge MRT", "Temasek Hall", "UTown"]}
          onChange={setLocation}
        />
        <button type="submit" onClick={(e) => handleAddProduct(e)}>
          Submit
        </button>
      </form>
      <ProductList product={product} setProduct={setProduct} />
    </>
  );
}
