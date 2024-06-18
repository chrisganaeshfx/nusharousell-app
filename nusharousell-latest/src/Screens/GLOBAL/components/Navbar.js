import React, { useState } from "react";
import "./Navbar.css";
import { FaSearch, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdChatBubbleOutline } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

export default function Navbar({ searchproduct }) {
  const [search, setSearch] = useState("");
  const searchlength = search.length == 0;

  const handleSearchProduct = () => {
    if (searchlength) {
      alert("What would you like to find today?");
    } else {
      searchproduct(search);
    }
  };

  return (
    <>
      <div className="header">
        <div className="left_header">
          <b>
            {" "}
            <a href="/">NUSharousell</a>{" "}
          </b>
        </div>
        <div className="mid_header">
          <div className="search_box">
            <input
              type="text"
              value={search}
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            ></input>
            <button onClick={searchproduct}>
              <FaSearch />{" "}
            </button>
          </div>
        </div>
        <div className="right_header">
          <div className="Likeb">
            <a href="/sell-product/AddProduct">
              <FaRegHeart />
            </a>
          </div>
          <div className="Chatb">
            <a href="/screens/chats/Chat">
              <MdChatBubbleOutline />
            </a>
          </div>
          <div className="dropdown">
            <a className="dropbtn">
              {" "}
              Hello, user <CgProfile />
              <i className="fa fa-caret-down"></i>
            </a>
            <div className="dropdown-content">
              <a href="#">Profile </a>
              <a href="#">Manage Listings</a>
              <a href="#">Settings</a>
              <a href="#">LogOut</a>
            </div>
          </div>
          <div className="Sellb">
            <a href="/screens/sell-product/AddProduct">Sell</a>
          </div>
        </div>
      </div>
    </>
  );
}

/* to make drpdown for user
jic u nid 
  const navsell = useNavigate();

  const handleSellButton = () => {  
  navsell('/NewProductListing/AddProduct');
};
<button onClick={handleSellButton}>Sell </button>

*/
