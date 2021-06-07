import React from "react";
import loadable from "@loadable/component";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { ROUTE_ROOT } from "common/variables";

const Main = loadable(() => import("pages/main"));
const RouletteLibrary = loadable(() => import("pages/rouletteLibrary"));
const RouletteCanvas = loadable(() => import("pages/rouletteCanvas"));

const Root: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={ROUTE_ROOT.MAIN} exact component={Main} />
        <Route
          path={ROUTE_ROOT.ROULETTE_LIBRARY}
          exact
          component={RouletteLibrary}
        />
        <Route
          path={ROUTE_ROOT.ROULETTE_CANVAS}
          exact
          component={RouletteCanvas}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Root;
