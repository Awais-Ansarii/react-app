import React from 'react';
import {Link} from 'react-router-dom'; 
import classes from './navbar.module.css';

const navbar = () => {
  return (
    <div className = {classes.navbar}>
        <ul>
            <li>
                <Link to = "/" >Home</Link>
            </li>
            <li>
                <Link to = "/listing" >Pokemon List</Link>
            </li>
        </ul>
    </div>
  )
}

export default navbar