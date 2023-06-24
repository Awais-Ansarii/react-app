import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Pokemon from "../../components/pokemon/Pokemon";
import classes from "./ListingPage.module.css";
import PokemonFilter from "../../components/PokemonFilter/PokemonFilter";
import Navbar from "../../components/navbar/Navbar";
import FadeLoader from "react-spinners/FadeLoader";

const ListingPage = () => {
  const containerRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    type: "",
    move: "",
    species: "",
    ability: "",
  });
  const [openFilterModal, setOpenFilterModal] = useState(false);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const { scrollTop, clientHeight, scrollHeight } = container;
      const isBottom = scrollTop + clientHeight === scrollHeight;
      if (isBottom) {
        getMorePokemons();
      }
    }
  };

  const [pokemons, setPokemons] = useState([]);
  const [nextEndpoint, setNextEndpoint] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=12"
  );

  const getOnePokemon = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return null;
    }
  };

  const getMorePokemons = async () => {
    try {
      setLoading(true);
      const response = await axios.get(nextEndpoint);
      const { next, results } = response.data;

      const resultPromises = [];
      results.forEach((element) => {
        const promise = getOnePokemon(element.url);
        resultPromises.push(promise);
      });

      const pokeResults = await Promise.all(resultPromises);
      setPokemons((prev) => {
        return [...prev, ...pokeResults];
      });
      setNextEndpoint(next);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMorePokemons();
  }, []);

  const filterPokemon = pokemons.filter((pokemon) => {
    const { type, move, species, ability } = filter;
    const moveIndex = pokemon.moves.findIndex((x) => x.move.name === move);
    const typeIndex = pokemon.types.findIndex((x) => x.type.name === type);
    // species can only be one
    const abilityIndex = pokemon.abilities.findIndex(
      (x) => x.ability.name === ability
    );

    return (
      (pokemon.species === species || species === "") &&
      (moveIndex != -1 || move === "") &&
      (abilityIndex != -1 || ability === "") &&
      (typeIndex != -1 || type === "")
    );
  });

  return (
    <>
      <Navbar />
      {openFilterModal && (
        <PokemonFilter
          filter={filter}
          setFilter={setFilter}
          setOpenFilterModal={setOpenFilterModal}
        />
      )}
      <button
        onClick={() => setOpenFilterModal(true)}
        className={classes.filter}
      >
        Filter
      </button>
      <div
        onScroll={handleScroll}
        ref={containerRef}
        className={classes.container}
      >
        {filterPokemon.map((pokemon, index) => {
          return <Pokemon key={index} info={pokemon} />;
        })}
      </div>
      {loading && (
        <div className={classes.loader}>
          <FadeLoader color="red" />
        </div>
      )}
    </>
  );
};

export default ListingPage;
