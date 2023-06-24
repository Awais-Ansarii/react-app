import classes from "./pokemon.module.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toogleBookmark } from "../../features/bookmark-slice";

const Pokemon = ({ info }) => {
  const dispatch = useDispatch();

  const bookmarks = useSelector((state) => state.bookmarks);
  const bookmarked = bookmarks.includes(info.id);
  let classList = [classes.pokemonCard];
  let imageURL = "";
  let name = info.name;

  const navigate = useNavigate();

  if (Object.keys(info).length === 0) {
    classList.push(classes.hidden);
  } else {
    classList.push(classes.show);
    imageURL = info.sprites.front_default;
  }

  const bookmark = () => {
    dispatch(toogleBookmark(info.id));
  };

  const onClickPokemon = (event) => {
    event.preventDefault();
    const pokeName = name;
    navigate(`/details/${pokeName}`);
  };

  return (
    <>
      <div className={classList.join(" ")}>
        <div
          className={bookmarked ? classes.bookmarked : classes.bookmark}
          onClick={(event) => bookmark(event)}
        ></div>
        <img
          src={imageURL}
          alt="pokemon-image"
          onClick={(event) => onClickPokemon(event)}
        />
        <div
          className={classes.info}
          onClick={(event) => onClickPokemon(event)}
        >
          <h1 style={{ fontSize: "2rem", textTransform: "capitalize" }}>
            {name}
          </h1>
          <h1 style={{ fontSize: "1.3rem" }}>EXP : {info.base_experience}</h1>
          <h1 style={{ fontSize: "1.3rem" }}>Height : {info.height}</h1>
          <h1 style={{ fontSize: "1.3rem" }}>Weight : {info.weight}</h1>
        </div>
      </div>
    </>
  );
};

Pokemon.propTypes = { info: PropTypes.object.isRequired };

export default Pokemon;
