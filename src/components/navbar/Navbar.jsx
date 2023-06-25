import { Link } from "react-router-dom";
import classes from "./navbar.module.css";

const Navbar = () => {
  return (
    <div className={classes.navbar}>
      <Link className={classes.link} to="/">
        Home
      </Link>
      <Link className={classes.link} to="/search">
        Search
      </Link>
      <Link className={classes.link} to="/bookmarks">
        Bookmarks
      </Link>
    </div>
  );
};

export default Navbar;
