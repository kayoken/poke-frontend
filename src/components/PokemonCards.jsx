import Card from "./Card";

const PokemonCards = ({ cards, activeCard, handleCardClicked }) => {
  const pokemonCards = cards.results.map((pokemon) => (
    <Card
      activeCard={activeCard}
      key={pokemon.name}
      pokemon={pokemon}
      onClick={handleCardClicked}
    />
  ));
  return <>{pokemonCards}</>;
};

export default PokemonCards;
