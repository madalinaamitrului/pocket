import React from "react";
import { Route, Switch } from "react-router";
import Autenthication from "../src/pages/autenthication";
import Home from "./pages/home";
function App() {
  return (
      <Switch>
        <Route exact path="/">
          <Autenthication />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
      </Switch>
  );
}

export default App;
