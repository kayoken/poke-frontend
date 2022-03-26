import logo from "../poke-logo.png";
import { useState, useEffect } from "react";
import axios from "axios";

const Card = ({ pokemon, onClick, activeCard }) => {
  const [details, setDetails] = useState({});
  const [isBusy, setIsBusy] = useState(true);

  useEffect(() => {
    getDetails().then((res) => {
      setDetails(res.data);
      setIsBusy(false);
    });
  }, []);

  const getDetails = async () => {
    const details = await axios.get(pokemon.url);
    return details;
  };

  return (
    !isBusy && (
      <div
        onClick={(e) => onClick(pokemon.name, e)}
        className={`poke-card ${pokemon.name === activeCard && "active"}`}
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
    )
  );
};

export default Card;
