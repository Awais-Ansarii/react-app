import { useCallback, useEffect, useState } from "react";
import classes from "./PokemonFilter.module.css";
import axios from "axios";
import FilterCategory from "./FilterCategory";
import PropTypes from "prop-types";

const PokemonFilter = ({ filter, setFilter, setOpenFilterModal }) => {
  const [abilities, setAbilities] = useState([]);
  const [types, setTypes] = useState([]);
  const [moves, setMoves] = useState([]);
  const [species, setSpecies] = useState([]);

  const getAbility = useCallback(async () => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/ability");
      return setAbilities(response.data.results);
    } catch (error) {
      console.log(error);
      return [];
    }
  }, []);

  const getTypes = useCallback(async () => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/type");
      return setTypes(response.data.results);
    } catch (error) {
      console.log(error);
      return [];
    }
  }, []);

  const getSpecies = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon-species"
      );
      return setSpecies(response.data.results);
    } catch (error) {
      console.log(error);
      return [];
    }
  }, []);
  const getMoves = useCallback(async () => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/move");
      return setMoves(response.data.results);
    } catch (error) {
      console.log(error);
      return [];
    }
  }, []);

  useEffect(() => {
    getAbility();
    getTypes();
    getSpecies();
    getMoves();
  }, [getAbility, getMoves, getSpecies, getTypes]);

  return (
    <div className={classes.container}>
      <button
        onClick={() => setOpenFilterModal(false)}
        className={classes.close}
      >
        Close
      </button>
      <FilterCategory
        category={moves}
        title="move"
        filter={filter}
        setFilter={setFilter}
      />
      <FilterCategory
        category={types}
        title="type"
        filter={filter}
        setFilter={setFilter}
      />
      <FilterCategory
        category={abilities}
        title="ability"
        filter={filter}
        setFilter={setFilter}
      />
      <FilterCategory
        category={species}
        title="species"
        filter={filter}
        setFilter={setFilter}
      />
    </div>
  );
};

PokemonFilter.propTypes = {
  filter: PropTypes.object.isRequired,
  setFilter: PropTypes.func,
  setOpenFilterModal: PropTypes.func,
};

export default PokemonFilter;
