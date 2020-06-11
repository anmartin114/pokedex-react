import React, { useState, useEffect } from "react";
import "./styles/Pokedex.css";
import axios from "axios";

const Pokedex = (props) => {
  const [pokemonData, setPokemonData] = useState({});
  const { history } = props;
  const [filter, setFilter] = useState("");

  const handleSearch = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=807/`)
      .then(function (response) {
        const { data } = response;
        const { results } = data;
        const newPokemonData = {};
        results.forEach((pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`,
          };
        });
        setPokemonData(newPokemonData);
      });
  }, []);

  const getCard = (pokeId) => {
    const { id, name, sprite } = pokemonData[pokeId];
    const nameCap = name.charAt(0).toUpperCase() + name.slice(1);
    return (
      <section key={pokeId}>
        <div className="card" onClick={() => history.push(`/${id}`)}>
          <p className="id">{`${id}`}</p>
          <img className="img" alt="" src={sprite} />
          <p className="name">{`${nameCap}`}</p>
        </div>
      </section>
    );
  };

  return (
    <div className="app">
      <header>
        <h1>Pokedex</h1>
        <div className="search">
          <input
            type="text"
            name="search"
            placeholder="search"
            onChange={handleSearch}
          />
        </div>
      </header>
      <section>
        <div className="container">
          {Object.keys(pokemonData).map(
            (pokeId) =>
              pokemonData[pokeId].name.includes(filter) && getCard(pokeId)
          )}
        </div>
      </section>
    </div>
  );
};

export default Pokedex;
