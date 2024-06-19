import React from 'react';
import logo from '../assets/logos/logo.png';
import "./Footer.css";

export default function Footer(){
    return(
        <div className='footer'>
            <div className='logo'>
                <img src={logo} alt="logo" />
            </div>
            <div className='About'> 
                <h3> About </h3>
                <p>
                    NUSharousell is a hyper-local, peer-to-peer waste reduction marketplace accessible via web. 
                    It enables users to buy, sell, swap, donate and claim pre-loved items instead of disposing of them or purchasing new ones.
                </p>
            </div>
            <div className='Creators'>
                <h3>Creators</h3>
                <a href="https://github.com/chrisganaeshfx">Chris</a>
                <a href="https://github.com/Eun18">Eunice</a>
            </div>
            <div className='Links'>
                <h3>Links</h3>
                <a href="/">Home</a>
                <a href="/screens/chats/Chat">Chats</a>
                <a href="#">Categories</a>
            </div>            
        </div>
    );
}
