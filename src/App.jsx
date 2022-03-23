import { useState, useEffect } from "react";
import logo from "./poke-logo.png";
import axios from "axios";
import "./App.scss";
import PokeGrid from "./components/PokeGrid";
import Card from "./components/Card";
import Header from "./components/Header";
import PrevNext from "./components/PrevNext";

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
    fetchCurrentPage().then((res) => {
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

  const fetchCurrentPage = () => {
    return axios({
      method: "get",
      url: "https://pokeapi.co/api/v2/pokemon/?limit=4",
    });
  };

  const fetchPokemonFromLocal = () => {
    setAllPokemon(JSON.parse(localStorage.getItem("pokemon") || "{}"));
    setCurrentPage(JSON.parse(localStorage.getItem("currentPage") || "{}"));
    setLoading(false);
  };

  const fetchNextPage = async (fetchURL) => {
    return axios({
      method: "get",
      url: fetchURL,
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

  const handleCardClicked = (name) => {
    fetchSinglePokemon(name).then((res) => {
      console.log(res.data);
    });
  };

  let pokemonCards = [];
  if (!loading) {
    pokemonCards = currentPage.results.map((pokemon) => (
      <Card key={pokemon.name} pokemon={pokemon} onClick={handleCardClicked} />
    ));
  }

  return (
    <div className="App">
      <Header />
      <PrevNext />
      <PokeGrid>
        {loading ? (
          <img src={logo} className="App-logo" alt="logo" />
        ) : (
          <>{pokemonCards}</>
        )}
      </PokeGrid>
    </div>
  );
}

export default App;
