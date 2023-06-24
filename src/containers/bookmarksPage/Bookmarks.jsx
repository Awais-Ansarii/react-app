import { useDispatch, useSelector } from "react-redux";
import classes from "./bookmarks.module.css";
import { useCallback, useEffect, useState } from "react";
import { addBookmark } from "../../features/bookmark-slice";
import axios from "axios";
import Pokemon from "../../components/pokemon/Pokemon";

const Bookmarks = () => {
  const dispatch = useDispatch();
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
    <div>
      <h1>Bookmarks</h1>
      <div style={{ display: "flex" }}>
        {pokemons.map((pokemon) => {
          return <Pokemon info={pokemon} key={pokemon.id} />;
        })}
      </div>
    </div>
  );
};

export default Bookmarks;
