import React, {useState} from 'react';
import axios from 'axios';
import classes from './searchPage.module.css'

const searchPage = () => {

    const [searchValue, setSearchValue] = useState("");

    const onInputChange = (event) => {
        event.preventDefault();
        setSearchValue(event.target.value);
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        axios.get('https://pokeapi.co/api/v2/pokemon/' + [searchValue])
        .then(res => {
            console.log(res.data);
        }).catch(err => console.log(err));
    }

  return (
    <>
        <form className = {classes.form}>
            <input className = {classes.input} name = "pokemon" type = "text" placeholder = 'Search Pokemon' value = {searchValue} onChange = {event => onInputChange(event)} />
            <button className = {classes.searchButton} type = "submit" onClick = {onFormSubmit}>Search</button>
        </form>
    </>
  )
}

export default searchPage