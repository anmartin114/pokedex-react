import React from "react";
import { Route } from "react-router-dom";
import Pokedex from "./Pokedex";
import DetailView from "./DetailView";


function App() {
  return (
    <div>
      <Route exact path="/" component={Pokedex} />
      <Route path="/:pokeid" component={DetailView} />
    </div>
  );
}

export default App;
