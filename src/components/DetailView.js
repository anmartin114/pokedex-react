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
    const { name, id, height, weight, types } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const nameCap = name.charAt(0).toUpperCase() + name.slice(1);

    const pokeTypes = pokemon.types.map((type) => type.type.name);

    return (
      <>
        <div className="content">
          <h1>{`${id}`}</h1>
          <img src={fullImageUrl} className="img-large" alt="" />
          <h1>{`${nameCap}`}</h1>
          <div className="typeDiv">
            <h4>Type: </h4>
            <h4 className={pokeTypes[0]}>{pokeTypes[0]}</h4>
            <h4 className={pokeTypes[1]}>{pokeTypes[1]}</h4>
          </div>
          <p>Height: {height}</p>
          <p>Weight: {weight}</p>
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
            back to pokedex
          </button>
        </div>
      )}
    </>
  );
};

export default DetailView;
