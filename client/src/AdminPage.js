import React, {useState} from "react";
import { Segment, Form, Button, Header } from "semantic-ui-react";
import Axios from "axios";
/**
 * @author @navpreet
 * @description admin page
 **/

let path = "/"
if(process.env.NODE_ENV !== "production"){
  path = "https://localhost:8080/"
}
const AdminPage = () => {
 
  //const { userInfo, setUserInfo } = useContext(UserContext);
//fetch value from db initially
  const [viewsolval, setviewSolValue] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    Axios.post(path+"adminctrlset", viewsolval)
      .then((res) => {
        if (res.data.message === "updated successfully") {
            alert("Your data is updated!");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleFormChange = (e) => {
    setviewSolValue(e.target.value)
  };
  
  return (
    <Segment>
      <Header as="h2">
        <Header.Content>View Solutions set Form</Header.Content>
      </Header>
        <Form onSubmit={handleFormSubmit} autoComplete="off">
        <Form.Field>
          <label>View Solution available to students?</label>
          <div onChange={handleFormChange}>
            <input type="radio" value="True" name="viewsol" /> Yes
            <input type="radio" value="False" name="viewsol" /> No
          </div>
        </Form.Field>
        <Button positive type="submit" >
         Submit
        </Button>
      </Form>
    </Segment>
  );
};

export default AdminPage;
