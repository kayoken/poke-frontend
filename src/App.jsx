import { useState, useEffect } from "react";
import logo from "./poke-logo.png";
import axios from "axios";
import "./App.scss";
import PokeGrid from "./components/PokeGrid";
import Cards from "./components/Cards";

function App() {
  const [allPokemon, setAllPokemon] = useState({});
  const [currentPage, setCurrentPage] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //timeout function for demonstration purposes
    setTimeout(() => {
      if (localStorage.getItem("pokemon") === null) {
        fetchPokemonFromAPI();
      } else {
        fetchPokemonFromLocal();
      }
    }, 1000);
  }, []);

  const fetchPokemonFromAPI = async () => {
    await axios({
      method: "get",
      url: "https://pokeapi.co/api/v2/pokemon/?limit=16",
    }).then((res) => {
      setCurrentPage(res.data);
      return axios(
        `https://pokeapi.co/api/v2/pokemon/?limit=${res.data.count}`
      ).then((resAll) => {
        setAllPokemon(resAll.data);
        localStorage.setItem("pokemon", JSON.stringify(resAll.data));
        localStorage.setItem("currentPage", JSON.stringify(res.data));
        setLoading(false);
      });
    });
  };

  const fetchPokemonFromLocal = () => {
    setAllPokemon(JSON.parse(localStorage.getItem("pokemon") || "{}"));
    setCurrentPage(JSON.parse(localStorage.getItem("currentPage") || "{}"));
    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <input
          className="search-pokemon"
          type="text"
          placeholder="Search Pokemon.."
        />
      </header>
      {loading ? (
        <img src={logo} className="App-logo" alt="logo" />
      ) : (
        <PokeGrid>
          <Cards pokemons={currentPage} />
        </PokeGrid>
      )}
    </div>
  );
}

export default App;
