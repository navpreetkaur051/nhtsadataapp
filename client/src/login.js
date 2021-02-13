import React, { Fragment } from "react";
import { Button,  Grid } from "semantic-ui-react";

let path = "/"
if(process.env.NODE_ENV !== "production"){
  path = "http://localhost:8080/"
}
const login = (props) => {

  const handleOutlookLogin = () => {
    window.open(path+"auth/outlook", "_self")
  }
  const handleGoogleLogin = () => {
    window.open(path+"auth/google", "_self")
  }

  return (
    <Fragment>
      <Grid columns={2} stackable textAlign="center">
      <Grid.Row>
          <h2>If you are a admin, please log in with your UOttawa account</h2>
          {/* <Button onClick={handleOutlookLogin}>
            Sign in with Outlook
          </Button> */}
          <Button onClick={handleGoogleLogin}>
            Sign in with Google
          </Button>
        </Grid.Row>
      </Grid>
    </Fragment>
  );
};

export default login;
