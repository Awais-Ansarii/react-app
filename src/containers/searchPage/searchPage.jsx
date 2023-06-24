import React, { useEffect, useState } from "react";
import axios from "axios";
import Pokemon from "../../components/pokemon/Pokemon";
import FadeLoader from "react-spinners/FadeLoader";
import Error from "../../components/Error/error";
import classes from "./searchPage.module.css";

const searchPage = () => {
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
    contentComponent = <Error key="error" />;
  } else {
    contentComponent = (
      <Pokemon key="pokemon" info={pokemonData} loaded="false" />
    );
  }

  return (
    <>
      <form className={classes.form}>
        <input
          className={classes.input}
          name="pokemon"
          type="text"
          placeholder="Search Pokemon"
          value={searchValue}
          onChange={(event) => onInputChange(event)}
        />
        <button
          className={classes.searchButton}
          type="submit"
          onClick={onFormSubmit}
        >
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

export default searchPage;
