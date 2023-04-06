import React,{useState} from 'react'
import './Navbar.css';
import {Link, link} from 'react-scroll'
import { UserAuth } from '../Auth/AuthContext';
import { Button } from '@mui/material';
import {HiMenuAlt4,HiX} from 'react-icons/hi';
import {motion} from 'framer-motion';

export default function Navbar() {
 
  const { logout, user } = UserAuth();
  const [toggle, setToggle] = useState(false);

  const handleSignOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(user)
  return (
    <div className='NavContainer'>
        <div className='mass'>
        <div className='ProfButton'>
        <div className='profile'>
            <img src={user? user.photoURL:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQYCM0rWhuESzWSEaoIvAuS5tjyi52Dks5xw&usqp=CAU'}/>
            <h4><span>Hi, </span>{user? user.displayName:"user"}</h4>
           
        </div>
        <button className='logout'  onClick={handleSignOut}>Logout</button>
        </div>
        <div className='Navlist'>
           <ul>
           {["My Collection","Trending Movies","History","New Movies"].map((item)=>
                (<li className='nav__li' key={`link-${item}`}>
               
                <Link to={item} spy={true} smooth={true} offset={50} duration={500}>{item}</Link>
                <div>
                    
                </div>
              </li>)
            )}
            
           </ul>
        </div>
       
        </div>
    </div>
  )
}
