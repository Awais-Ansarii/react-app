import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import classes from './detailsPage.module.css';


const DetailsPage = () => {

    const [details, setDetails] = useState()

    const { name } = useParams();

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon/' + [name])
        .then(res => {
            console.log(res);
        }).catch(err => console.log(err));
    })

  return (
    <h1>Details Page</h1>
  )
}



export default DetailsPage