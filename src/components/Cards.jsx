import logo from "../poke-logo.png";

const Cards = ({ pokemons, onClick }) => {
  return pokemons.results.map((pokemon) => (
    <div
      onClick={({ name }) => onClick(pokemon.name)}
      className="poke-card"
      key={pokemon.name}
      id={pokemon.name}
    >
      <div className="poke-headline">{pokemon.name}</div>
      <img src={logo} className="poke-placeholder" alt="logo" />
    </div>
  ));
};

export default Cards;
