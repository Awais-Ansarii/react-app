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
    event.preventDefault();
    setSearchValue(event.target.value);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    setIfError(!ifError);
    setLoading(true);
    axios
      .get("https://pokeapi.co/api/v2/pokemon/" + [searchValue])
      .then((res) => {
        console.log(res.data);
        const data = JSON.parse(JSON.stringify(res.data));
        setPokemonData(data);
        console.log(pokemonData);
      })
      .catch((err) => {
        console.log(err);
        setIfError(true);
      });
  };

  let contentComponent;

  if (ifError) {
    contentComponent = <div key="error">Result Not Found!</div>;
  } else {
    contentComponent = (
      <Pokemon key="pokemon" info={pokemonData} loaded="false" />
    );
  }

  return (
    <>
      <Navbar />
      <h1 className={classes.header}>Search for Your Favourite Pokemon!</h1>
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
        ) : (
          [contentComponent]
        )}
      </div>
    </>
  );
};

export default SearchPage;
