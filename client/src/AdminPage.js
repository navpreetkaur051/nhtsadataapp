import React, {Fragment, useState,useEffect,useContext} from "react";
import { Segment, Form, Button, Header } from "semantic-ui-react";
import Axios from "axios";
/**
 * @author @navpreet
 * @description admin page
 **/

let path = "/"
if(process.env.NODE_ENV !== "production"){
  path = "http://localhost:8080/"
}
const AdminPage = () => {

  const [viewsolval, setviewSolValue] = useState();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    const testdata = {
      dvw: viewsolval,
    };
    Axios.post(path+"adminctrlset", testdata)
      .then((res) => {
        if (res.data === "updated successfully") {
            alert("Your data is updated!");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleFormChange = (e) => {
    setviewSolValue(e.target.value === 'true' ? true: false)
  };


  const handleLogout = (e) => {
    window.open(path + "auth/logout", "_self");
  };
  //here  login//success
  return (
    <Fragment>
    <Segment>
      <Header as="h2">
        <Header.Content>View Solutions set Form</Header.Content>
      </Header>
        <Form onSubmit={handleFormSubmit} autoComplete="off">
        <Form.Field>
          <label>View Solution available to students?</label>
          <div onChange={handleFormChange}>
            <input type="radio" value='true' name="viewsol" /> Yes
            <input type="radio" value='false' name="viewsol" /> No
          </div>
        </Form.Field>
        <Button positive type="submit" >
         Submit
        </Button>
      </Form>
    </Segment>
    <Segment>
      <Header as="h2">
        <Header.Content>Signout to exit</Header.Content>
      </Header>
        
        <Button positive type="submit" onClick={handleLogout}>
         Logout
        </Button>
    </Segment>
    </Fragment>
  );
};

export default AdminPage;
