import {Link} from 'react-router-dom'; 
import classes from './navbar.module.css';

const Navbar = () => {
  return (
    <div className = {classes.navbar}>
        <ul>
            <li>
                <Link className = {classes.link} to = "/" >Home</Link>
            </li>
            <li>
                <Link className = {classes.link} to = "/list" >Pokemon List</Link>
            </li>
        </ul>
    </div>
  )
}

export default Navbar