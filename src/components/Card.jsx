import logo from "../poke-logo.png";
import { useState, useEffect } from "react";
import axios from "axios";

const Card = ({ pokemon, onClick }) => {
  const [details, setDetails] = useState({});

  useEffect(() => {
    getDetails().then((res) => {
      setDetails(res.data);
    });
  }, []);

  const getDetails = async () => {
    return axios.get(pokemon.url);
  };

  return (
    <div
      onClick={() => onClick(pokemon.name)}
      className="poke-card"
      key={pokemon.name}
      id={pokemon.name}
    >
      <div className="poke-headline">{pokemon.name}</div>
      <img
        src={details.sprites.front_default}
        className="poke-placeholder"
        alt="logo"
      />
    </div>
  );
};

export default Card;
