import React, { useEffect, useState } from 'react';
import classes from './pokemon.module.css';

const pokemon = (props) => {

  const[bookmarked, setBookmarked] = useState(false);

  console.log(props.info);
  let classList = [classes.pokemonCard];
  let imageURL = "";
  let name = props.info.name;

  if(Object.keys(props.info).length === 0){
    classList.push(classes.hidden);
  }
  else{
    classList.push(classes.show);
    imageURL = props.info.sprites.front_default;
  }

  const bookmark = (event) => {
    event.preventDefault();
    setBookmarked(!bookmarked);
  }

  return (
    <>
      <div className = {classList.join(' ')}>
        <div className = {bookmarked ? classes.bookmarked : classes.bookmark} onClick={event => bookmark(event)}></div>
        <img src = {imageURL} alt = "pokemon-image" />
        <div className = {classes.info}>
          <h1 style = {{fontSize: '3rem'}}>{name}</h1>
          <h1>EXP : {props.info.base_experience}</h1>
          <h1>Height : {props.info.height}</h1>
          <h1>Weight : {props.info.weight}</h1>
        </div>
      </div>
    </>
  )
}

export default pokemon