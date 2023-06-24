import PropTypes from "prop-types";
import classes from "./pokemon.module.css";
const Pokemon = ({ url, name }) => {
  return (
    <div className={classes.container}>
      <img src={url} alt="pokemon" />
      <h4>{name}</h4>
    </div>
  );
};

export default Pokemon;

Pokemon.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
