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

  const fetchPokemonFromAPI = () => {
    fetchCurrentPage()
      .then((response) => {
        setCurrentPage(response.data);
        localStorage.setItem("currentPage", JSON.stringify(response.data));
        return fetchAllPokemon(response.data.count);
      })
      .then((responseAll) => {
        setAllPokemon(responseAll.data);
        localStorage.setItem("pokemon", JSON.stringify(responseAll.data));
        setLoading(false);
      })
      .catch((error) => console.log(error.response));
  };

  const fetchCurrentPage = () => {
    return axios({
      method: "get",
      url: "https://pokeapi.co/api/v2/pokemon/?limit=4",
    });
  };

  const fetchAllPokemon = (count) => {
    return axios({
      method: "get",
      url: `https://pokeapi.co/api/v2/pokemon/?limit=${count}`,
    });
  };

  const fetchSinglePokemon = (name) => {
    return axios({
      method: "get",
      url: `https://pokeapi.co/api/v2/pokemon/${name}`,
    });
  };

  const fetchPokemonFromLocal = () => {
    setAllPokemon(JSON.parse(localStorage.getItem("pokemon") || "{}"));
    setCurrentPage(JSON.parse(localStorage.getItem("currentPage") || "{}"));
    setLoading(false);
  };

  const fetchPage = (fetchURL) => {
    return axios({
      method: "get",
      url: fetchURL,
    });
  };

  const handleCardClicked = (name) => {
    fetchSinglePokemon(name).then((res) => {
      console.log(res.data);
    });
  };

  const handlePrevNext = () => {};

  let pokemonCards = [];
  if (!loading) {
    pokemonCards = currentPage.results.map((pokemon) => (
      <Card key={pokemon.name} pokemon={pokemon} onClick={handleCardClicked} />
    ));
  }

  return (
    <div className="App">
      <Header />
      <PrevNext currentPage={currentPage} />
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
