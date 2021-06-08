import React from "react";
import loadable from "@loadable/component";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { ROUTE_ROOT } from "common/variables";

const Main = loadable(() => import("pages/main"));
const Roulette = loadable(() => import("pages/roulette"));
const Share = loadable(() => import("pages/share"));

const Root: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={ROUTE_ROOT.MAIN} exact component={Main} />
        <Route path={ROUTE_ROOT.ROULETTE} exact component={Roulette} />
        <Route path={ROUTE_ROOT.SHARE} exact component={Share} />
      </Switch>
    </BrowserRouter>
  );
};

export default Root;
