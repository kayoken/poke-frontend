import logo from "../poke-logo.png";

const Card = ({ pokemon, onClick }) => {
  return (
    <div
      onClick={() => onClick(pokemon.name)}
      className="poke-card"
      key={pokemon.name}
      id={pokemon.name}
    >
      <div className="poke-headline">{pokemon.name}</div>
      <img src={logo} className="poke-placeholder" alt="logo" />
    </div>
  );
};

export default Card;
