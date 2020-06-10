import React, { useState, useEffect } from "react";
import "./styles/Pokedex.css";
import axios from "axios";

const Pokedex = (props) => {
  const [pokemonData, setPokemonData] = useState({});
  const { history } = props;
  const [filter, setFilter] = useState("");

  const handleSearchange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=150/`)
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
    console.log(pokemonData[pokeId]);

    const { id, name, sprite } = pokemonData[pokeId];

    return (
      <section key={pokeId}>
        <div className="card" onClick={() => history.push(`/${id}`)}>
          <p className="id">{`${id}`}</p>
          <img className="img" src={sprite} />
          <p className="name">{`${name}`}</p>
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
            onChange={handleSearchange}
          />
        </div>
      </header>
      <section>
        <div class="container">
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
