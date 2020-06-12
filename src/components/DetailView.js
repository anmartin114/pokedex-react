import React, { useState, useEffect } from "react";
import "./styles/DetailView.css";
import axios from "axios";

const DetailView = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { pokeid } = params;
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokeid}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokeid]);

  const getPokemon = (pokemon) => {
    const { name, id, height, weight, sprites } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const nameCap = name.charAt(0).toUpperCase() + name.slice(1);

    const pokeTypes = pokemon.types.map((type) => type.type.name);

    const pokeStats = pokemon.stats.map(
      (stats) =>
        stats.stat.name.charAt(0).toUpperCase() + stats.stat.name.slice(1)
    );

    const pokeStatNum = pokemon.stats.map((stats) => stats.base_stat);

    const pokeAbilities = pokemon.abilities.map(
      (abilities) =>
        abilities.ability.name.charAt(0).toUpperCase() +
        abilities.ability.name.slice(1)
    );

    console.log(pokemon);

    return (
      <>
        <div className="content">
          <h1>{`${id}`}</h1>
          <img src={fullImageUrl} className="img-large" alt="" />
          <h1>{`${nameCap}`}</h1>
          <div className="typeDiv">
            <h3>Type: </h3>
            <h3 className={pokeTypes[0]}>{pokeTypes[0]}</h3>
            <h3 className={pokeTypes[1]}>{pokeTypes[1]}</h3>
          </div>
          <p>Height: {height}</p>
          <p>Weight: {weight}</p>
          <div className="info">
            <div className="stats">
              <h4>Stats: </h4>
              <p>
                {pokeStats[0]}: {pokeStatNum[0]}{" "}
              </p>
              <p>
                {pokeStats[1]}: {pokeStatNum[1]}{" "}
              </p>
              <p>
                {pokeStats[2]}: {pokeStatNum[2]}{" "}
              </p>
              <p>
                {pokeStats[3]}: {pokeStatNum[3]}{" "}
              </p>
              <p>
                {pokeStats[4]}: {pokeStatNum[4]}{" "}
              </p>
              <p>
                {pokeStats[5]}: {pokeStatNum[5]}{" "}
              </p>
            </div>

            <div className="things">
              <div className="abilities">
                <h4>Abilities: </h4>
                <p>{pokeAbilities[0]}</p>
                <p>{pokeAbilities[1]}</p>
                <p>{pokeAbilities[2]}</p>
              </div>
              <div className="icons">
                <img src={sprites.front_default}></img>
                <img src={sprites.back_default}></img>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {pokemon === undefined && <h1>loading...</h1>}
      {pokemon !== undefined && getPokemon(pokemon)}

      {pokemon !== undefined && (
        <div className="buttonDiv">
          <button className="back" onClick={() => history.push("/")}>
            Back to Pokedex
          </button>
        </div>
      )}
    </>
  );
};

export default DetailView;
