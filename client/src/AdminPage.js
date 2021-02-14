import React, {Fragment, useState,useEffect,useContext} from "react";
import { Segment, Form, Button, Header } from "semantic-ui-react";
import Axios from "axios";
import { UserContext } from "./UserProvider";
import useReactRouter from "use-react-router";
/**
 * @author @navpreet
 * @description admin page
 **/

let path = "/"
if(process.env.NODE_ENV !== "production"){
  path = "http://localhost:8080/"
}
const AdminPage = () => {

  const { userInfo, setUserInfo } = useContext(UserContext);
  const { history } = useReactRouter();
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
  useEffect(() => {
  Axios.get(path + "auth/login/success", {
    withCredentials: true,
  })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      setUserInfo({
        ...userInfo,
        user: data.user,
        authenticated: data.authenticated,
      }   
      );
    }
    )
    .catch((e) => {
      console.log(e);
    });
  });
  console.log("user:::::",userInfo);
  if (userInfo.authenticated) {
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
  }
  else{
    history.push("/login");
    return null;
  }
};

export default AdminPage;
