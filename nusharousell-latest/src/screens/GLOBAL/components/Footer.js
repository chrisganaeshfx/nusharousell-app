import React from 'react';
import logo from '../assets/logos/pic.png';

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
                <a href="#">Chris</a>
                <a href="#">Eunice</a>
            </div>
            <div className='Links'>
                <a href="#">Home</a>
                <a href="#">Chats</a>
                <a href="#">Categories</a>
            </div>            
        </div>
    );

}
