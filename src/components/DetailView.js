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

  const getPokemon = () => {
    const { name, id, species, height, weight, types, sprites } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;

    return (
      <div className="content">
        <h1>{`${id}`}</h1>
        <img src={fullImageUrl} className="img-large" />
        <h1>{`${name}`}</h1>
        <h3>Pokemon Info</h3>

        <h4>Type: </h4>
        {types.map((typeInfo) => {
          const { type } = typeInfo;
          const { name } = type;
          return <h4 key={name}> {`${name}`}</h4>;
        })}

        <p>Species: {species.name}</p>
        <p>Height: {height}</p>
        <p>Weight: {weight}</p>
      </div>
    );
  };

  return (
    <>
      {pokemon === undefined && <h1>loading...</h1>}
      {pokemon !== undefined && getPokemon(pokemon)}
      {pokemon === false && <h1>Pokemon not found</h1>}

      {pokemon !== undefined && (
        <button onClick={() => history.push("/")}>back to pokedex</button>
      )}
    </>
  );
};

export default DetailView;
