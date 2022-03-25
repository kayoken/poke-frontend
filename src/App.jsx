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
  const [activeCard, setActiveCard] = useState("");

  useEffect(() => {
    //timeout function for demonstration purposes
    setTimeout(() => {
      if (localStorage.getItem("pokemon") === null) {
        fetchPokemonFromAPI();
        return;
      }
      fetchPokemonFromLocal();
    }, 1000);
  }, []);

  const fetchCurrentPage = async () => {
    const currentPage = await axios({
      method: "get",
      url: "https://pokeapi.co/api/v2/pokemon/?limit=8",
    });

    return currentPage;
  };

  const fetchAllPokemon = async (count) => {
    const allPokemon = await axios({
      method: "get",
      url: `https://pokeapi.co/api/v2/pokemon/?limit=${count}`,
    });

    return allPokemon;
  };

  const fetchPokemonFromAPI = async () => {
    await fetchCurrentPage()
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

  const fetchSinglePokemon = async (name) => {
    const singlePokemon = await axios({
      method: "get",
      url: `https://pokeapi.co/api/v2/pokemon/${name}`,
    });

    return singlePokemon;
  };

  const handleCardClicked = (name) => {
    if (activeCard === name) {
      document.body.style.overflowY = "scroll";
      setActiveCard("");
      return;
    }
    document.body.style.overflowY = "hidden";
    setActiveCard(name);
  };

  const fetchPokemonFromLocal = () => {
    setAllPokemon(JSON.parse(localStorage.getItem("pokemon") || "{}"));
    setCurrentPage(JSON.parse(localStorage.getItem("currentPage") || "{}"));
    setLoading(false);
  };

  const handlePrevNext = (url) => {
    setLoading(true);
    axios({
      method: "get",
      url: url,
    }).then((response) => {
      setCurrentPage(response.data);
      localStorage.setItem("currentPage", JSON.stringify(response.data));
      setLoading(false);
    });
  };

  let pokemonCards = [];
  if (!loading) {
    pokemonCards = currentPage.results.map((pokemon) => (
      <Card
        activeCard={activeCard}
        key={pokemon.name}
        pokemon={pokemon}
        onClick={handleCardClicked}
      />
    ));
  }

  return (
    <div className="App">
      <Header />
      <PrevNext onButtonClick={handlePrevNext} currentPage={currentPage} />
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
