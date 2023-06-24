import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Pokemon from "../../components/pokemon/Pokemon";
import classes from "./bookmarks.module.css";
import Navbar from "../../components/navbar/Navbar";

const Bookmarks = () => {
  const [pokemons, setPokemons] = useState([]);
  const bookmarks = useSelector((state) => state.bookmarks);

  const getPokemonById = useCallback(async (id) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      return response.data;
    } catch (error) {
      return null;
    }
  }, []);

  const getPokemons = useCallback(async () => {
    const resultPromises = [];
    bookmarks.forEach((id) => {
      const promise = getPokemonById(id);
      resultPromises.push(promise);
    });

    const pokeResults = await Promise.all(resultPromises);
    setPokemons((prev) => {
      return [...prev, ...pokeResults];
    });
  }, [bookmarks, getPokemonById]);

  useEffect(() => {
    getPokemons();
  }, [getPokemons]);

  return (
    <>
      <Navbar />
      <div className={classes.container}>
        <h4>Bookmarks</h4>
        <div className={classes.pokemons}>
          {pokemons.map((pokemon) => {
            return <Pokemon info={pokemon} key={pokemon.id} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Bookmarks;
