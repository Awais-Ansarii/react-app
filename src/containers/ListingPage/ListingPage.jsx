import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Pokemon from "../../components/pokemon/pokemon";

const ListingPage = () => {
  const containerRef = useRef(null);

  const [loading, setLoading] = useState(true);

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
    "https://pokeapi.co/api/v2/pokemon?limit=10"
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
      console.log(response.data);
      const { next, results } = response.data;
      for await (const result of results) {
        let pokemon = await getOnePokemon(result["url"]);
        // find pokemon existing in pokemons array
        const index = pokemons.findIndex((x) => x.id === pokemon.id);
        if (index == -1) {
          setPokemons((prev) => {
            return [...prev, pokemon];
          });
        }
      }
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

  return (
    <div
      onScroll={handleScroll}
      ref={containerRef}
      style={{
        width: "100wh",
        height: "98vh",
        overflowY: "scroll",
        overflowX: "clip",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "start",
      }}
    >
      {pokemons.map((pokemon, index) => {
        return (
          <Pokemon
            key={index}
            url={pokemon.sprites.front_default}
            name={pokemon.name}
          />
        );
      })}
    </div>
  );
};

export default ListingPage;
