import { useEffect, useState } from "react";
import axios from "axios";
import Pokemon from "../../components/pokemon/Pokemon";
import FadeLoader from "react-spinners/FadeLoader";
import Navbar from "../../components/navbar/Navbar";
import classes from "./searchPage.module.css";

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [pokemonData, setPokemonData] = useState({});
  const [loading, setLoading] = useState(false);
  const [ifError, setIfError] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [pokemonData, ifError]);

  const onInputChange = (event) => {
    setPokemonData({});
    event.preventDefault();
    setSearchValue(event.target.value);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .get(
        "https://pokeapi.co/api/v2/pokemon/" +
          [searchValue.toLowerCase().trim()]
      )
      .then((res) => {
        console.log(res.data);
        const data = JSON.parse(JSON.stringify(res.data));
        setPokemonData(data);
      })
      .catch((err) => {
        console.log(err);
        setIfError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={classes.container}>
      <Navbar />
      <h2 className={classes.header}>Search for Your Favourite Pokemon!</h2>
      <form className={classes.form} onSubmit={onFormSubmit}>
        <input
          className={classes.input}
          name="pokemon"
          type="text"
          placeholder="Search Pokemon"
          value={searchValue}
          onChange={(event) => onInputChange(event)}
          required
        />
        <button className={classes.searchButton} type="submit">
          Search
        </button>
      </form>
      <div className={classes.content}>
        {loading ? (
          <FadeLoader className={classes.loader} color="red" />
        ) : Object.keys(pokemonData).length > 0 ? (
          <Pokemon key="pokemon" info={pokemonData} loaded="false" />
        ) : ifError ? (
          <span>Result Not Found</span>
        ) : null}
      </div>
    </div>
  );
};

export default SearchPage;
