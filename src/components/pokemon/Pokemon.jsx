import { useState } from "react";
import classes from "./pokemon.module.css";
import PropTypes from "prop-types"
;
const Pokemon = ({info}) => {
  const [bookmarked, setBookmarked] = useState(false);

  console.log(info);
  let classList = [classes.pokemonCard];
  let imageURL = "";
  let name = info.name;

  if (Object.keys(info).length === 0) {
    classList.push(classes.hidden);
  } else {
    classList.push(classes.show);
    imageURL = info.sprites.front_default;
  }

  const bookmark = (event) => {
    event.preventDefault();
    setBookmarked(!bookmarked);
  };

  return (
    <>
      <div className={classList.join(" ")}>
        <div
          className={bookmarked ? classes.bookmarked : classes.bookmark}
          onClick={(event) => bookmark(event)}
        ></div>
        <img src={imageURL} alt="pokemon-image" />
        <div className={classes.info}>
          <h1 style={{ fontSize: "3rem" }}>{name}</h1>
          <h1>EXP : {info.base_experience}</h1>
          <h1>Height : {info.height}</h1>
          <h1>Weight : {info.weight}</h1>
        </div>
      </div>
    </>
  );
};

Pokemon.propTypes = {info: PropTypes.object.isRequired};

export default Pokemon;
