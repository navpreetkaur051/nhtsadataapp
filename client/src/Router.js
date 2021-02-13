import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import login from "./login";
import admin from "./AdminPage";
import { Container } from "semantic-ui-react";

/**
 * This is routers for the website.
 *
 * Need to solve login authentication, user can input url directly to go to the page.
 */

const Routers = () => {
  return (
    <Fragment>
      <Switch>
        <Fragment>
          <Container className="main">
            <Route exact path="/login" component={login} />
            <Route exact path="/" component={admin} />
          </Container>
        </Fragment>
      </Switch>
    </Fragment>
  );
};

export default Routers;
