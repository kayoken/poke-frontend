import { useState, useEffect } from "react";
import logo from "./poke-logo.png";
import axios from "axios";
import "./App.scss";
import PokeGrid from "./components/PokeGrid";
import Card from "./components/Card";

function App() {
  const [allPokemon, setAllPokemon] = useState({});
  const [currentPage, setCurrentPage] = useState({});
  const [currentPokemon, setCurrentPokemon] = useState({});
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
    fetchCurrentPage.then((res) => {
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

  const fetchCurrentPage = async () => {
    return await axios({
      method: "get",
      url: "https://pokeapi.co/api/v2/pokemon/?limit=16",
    });
  };

  const fetchAllPokemon = async () => {
    return await axios({
      method: "get",
      url: `https://pokeapi.co/api/v2/pokemon/?limit=${currentPage.count}`,
    });
  };

  const fetchSinglePokemon = async (name) => {
    return await axios({
      method: "get",
      url: `https://pokeapi.co/api/v2/pokemon/${name}`,
    });
  };

  const fetchPokemonFromLocal = () => {
    setAllPokemon(JSON.parse(localStorage.getItem("pokemon") || "{}"));
    setCurrentPage(JSON.parse(localStorage.getItem("currentPage") || "{}"));
    setLoading(false);
  };

  const handleCardClicked = (name) => {
    fetchSinglePokemon(name).then((res) => {
      console.log(res.data);
    });
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
      <section>
        <PokeGrid>
          {loading ? (
            <img src={logo} className="App-logo" alt="logo" />
          ) : (
            <Card onClick={handleCardClicked} pokemons={currentPage} />
          )}
        </PokeGrid>
      </section>
      <footer>
        <button>Previous</button>
        <button>Next</button>
      </footer>
    </div>
  );
}

export default App;
