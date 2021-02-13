import React, { Fragment } from "react";
import Routers from "./Router";
import { HashRouter } from "react-router-dom";

const App = () => {
  return (
      <Fragment>
        <HashRouter>
            <Routers />
        </HashRouter>
      </Fragment>
  );
};

export default App;