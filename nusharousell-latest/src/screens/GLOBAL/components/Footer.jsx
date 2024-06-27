import React from 'react';
import { Link } from 'react-router-dom'
import logo from '../assets/logos/logo.png';
import "../../styles/Footer.css";

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
                <Link to="https://github.com/chrisganaeshfx">Chris</Link>
                <Link href="https://github.com/Eun18">Eunice</Link>
            </div>
            <div className='Links'>
                <h3>Links</h3>
                <a href="/">Home</a>
                <Link to='/chats'>Chats</Link>
            </div>            
        </div>
    );
}
