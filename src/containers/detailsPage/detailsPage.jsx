import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import classes from './detailsPage.module.css';
import Navbar from '../../components/navbar/Navbar';
import Chip from '../../components/Chip';


const DetailsPage = () => {
    
    const [height, setHeight] = useState();
    const [weight, setWeight] = useState();
    const [imageUrl, setImageUrl] = useState('');
    const [type, setType] = useState('');
    const [moves, setMoves] = useState([]);
    const { name } = useParams();

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon/' + [name])
        .then(res => {
            console.log(res.data?.types[0].type);
            const data = JSON.parse(JSON.stringify(res.data));
            setImageUrl(data?.sprites.front_default);
            setType(data?.types[0].type.name);
            setHeight(data?.height);
            setWeight(data?.weight);
            let pokeMoves = [];

            for(let i = 0; i < 20; i++){
              pokeMoves.push(data.moves[i].move.name);
            }
            setMoves(pokeMoves);
        }).catch(err => console.log(err));
    }, [])

    // for(let i = 0; i < 5; i++){
    //   moves.push(details?.moves[i])
    // }

  return (
    <>
    <Navbar />
      <div className = {classes.detailsContainer}>
        <h1>{name}</h1>
        <img src={imageUrl} alt="pokemon-image" />
        <div className={classes.infoContainer}>
          <h2>Type: {type}</h2>
          <h2>Height: {height}</h2>
          <h2>Weight: {weight}</h2>
          <h2>Moves:</h2>
          <div className = {classes.moves}>
            {moves.map((name) => {
              return (
                <Chip
                  key={name}
                  text={name}
                    />
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailsPage