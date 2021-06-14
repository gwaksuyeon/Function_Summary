import React from "react";
import loadable from "@loadable/component";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { ROUTE_ROOT } from "common/variables";

const Main = loadable(() => import("pages/main"));
const Roulette = loadable(() => import("pages/roulette"));
const Share = loadable(() => import("pages/share"));
const Pagination = loadable(() => import("pages/pagination"));
const InfiniteScroll = loadable(() => import("pages/infinite/scroll"));
const InfiniteButton = loadable(() => import("pages/infinite/button"));
const Roles = loadable(() => import("pages/roles"));

const Root: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={ROUTE_ROOT.MAIN} exact component={Main} />
        <Route path={ROUTE_ROOT.ROULETTE} exact component={Roulette} />
        <Route path={ROUTE_ROOT.SHARE} exact component={Share} />
        <Route path={ROUTE_ROOT.PAGINATION} exact component={Pagination} />
        <Route
          path={ROUTE_ROOT.INFINITY_SCROLL_PAGING}
          exact
          component={InfiniteScroll}
        />
        <Route
          path={ROUTE_ROOT.INFINITY_PAGING}
          exact
          component={InfiniteButton}
        />
        <Route path={ROUTE_ROOT.ROLES} exact component={Roles} />
      </Switch>
    </BrowserRouter>
  );
};

export default Root;
