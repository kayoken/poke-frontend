import logo from "../poke-logo.png";
import { useEffect, useState } from "react";

const Card = ({ pokemons, onClick }) => {
  const [allPokemons, setPokemons] = useState([]);

  useEffect(() => {
    pokemons.results.map((pokemon) => {
      console.log(pokemon);
    });
  }, []);

  return pokemons.results.map((pokemon) => (
    <div
      onClick={() => onClick(pokemon.name)}
      className="poke-card"
      key={pokemon.name}
      id={pokemon.name}
    >
      <div className="poke-headline">{pokemon.name}</div>
      <img src={logo} className="poke-placeholder" alt="logo" />
    </div>
  ));
};

export default Card;
