import React from "react";
import logo from "../poke-logo.png";

const Cards = ({ pokemons }) => {
  return pokemons.results.map((pokemon) => (
    <div className="flex-items" key={pokemon.name} id={pokemon.name}>
      {pokemon.name}
      <img src={logo} className="poke-placeholder" alt="logo" />
    </div>
  ));
};

export default Cards;
