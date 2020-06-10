import React from "react";
import { Route, Switch } from "react-router-dom";
import Pokedex from "./Pokedex";
import DetailView from "./DetailView";

function App() {
  return (
    <Switch>
      <Route exact path="/" render={(props) => <Pokedex {...props} />} />
      <Route
        exact
        path="/:pokeid"
        render={(props) => <DetailView {...props} />}
      />
    </Switch>
  );
}

export default App;
