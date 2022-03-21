import React from "react";

const Cards = ({ pokemons }) => {
  return pokemons.results.map((pokemon) => (
    <div className="flex-items" key={pokemon.name} id={pokemon.name}>
      {pokemon.name}
    </div>
  ));
};

export default Cards;
