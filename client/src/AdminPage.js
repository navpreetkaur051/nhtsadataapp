import React, {Fragment, useState} from "react";
import { Segment, Form, Button, Header,Grid, Search, List, Table, TableBody, TableRow, TableCell, IconGroup } from "semantic-ui-react";
import Axios from "axios";
import useModal from './common/useModal';
import ManufacturerDet from './ManufacturerDet';
import './nhtsaapp.css';
/**
 * @author @navpreet
 * @description admin page
 **/

let path = "/"
if(process.env.NODE_ENV !== "production"){
  path = "http://localhost:8080/"
}
const AdminPage = () => {

  const {isShowing, toggle} = useModal();

  const [nhtsaDataALlManufactures, setNhtsaDataALlManufactures] = useState();
  const [nhtsaDataAllMakesByManufacturer, setNhtsaDataAllMakesByManufacturer] = useState();
  const [nhtsaDataVehicleDetailsByVinNumber, setNhtsaDataVehicleDetailsByVinNumber] = useState();
  const [searchKeyword, setSearchKeyword] = useState();

  const link ={
  "color": "darkblue",
  "text-decoration": "underline",
  "cursor": "pointer"
  }
  const handleSearchBoxValueChange = (e)=>{
      setSearchKeyword(e.target.value);
      setNhtsaDataVehicleDetailsByVinNumber("");
  }
  const validateVin =(vin)=>{
    let isValidVIN = true;
    let regex = [];
    regex[0] = /^[A-Z0-9]{17}/;
    regex[1] = /^[A-Z0-9]{8}[A-Z0-9]{0,9}[*]{1}[A-Z0-9]{0,9}/;
    if(vin===""){
      isValidVIN = false;
    }
    else if(vin.length===17 && vin.match(regex[0])){
      isValidVIN = true
    }
    else if(vin.length < 17 && vin.match(regex[1])){
        isValidVIN = true;
    }
    else{
      isValidVIN = false;
    }

    return isValidVIN;
  }
  const handleFindVINVehicle = ()=>{
    let isValidVIN = validateVin(searchKeyword);
    if(isValidVIN){
      fetchDataVehicleDetail(searchKeyword);
    }
    else {
      alert("Invalid VIN");
    }
    setSearchKeyword("");
  }
  const fetchDataVehicleDetail = (vinnumber)=>{
    Axios.get(path + "data/urlGetDetailsVehiclebasedonVIN/"+ vinnumber)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        console.log("dataa::",data.Results);
        setNhtsaDataVehicleDetailsByVinNumber(data.Results);
      }
      )
      .catch((e) => {
        console.log(e);
      });
}
const handleShowManufacturerDetailClick = ()=>{
  toggle();
};

const fetchDataAllMakesByManufacturer = (manufacturer)=>{

  Axios.get(path + "data/getnhtsadataallmakes/"+manufacturer)
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      console.log("sddfsf",data);
      setNhtsaDataAllMakesByManufacturer(data.Results);
    }
    )
    // .then(()=>{
    //   handleShowManufacturerDetailClick();
    // })
    .catch((e) => {
      console.log(e);
    });

    handleShowManufacturerDetailClick();
}

    const fetchDataAllManufacturers = ()=>{
            Axios.get(path + "data/getnhtsadataallmanufacturers")
              .then((res) => {
                return res.data;
              })
              .then((data) => {
                setNhtsaDataALlManufactures(data.Results);
              }
              )
              .catch((e) => {
                console.log(e);
              });
      }
      //fetchDataAllManufacturers();

  return (
    <Fragment>
    <Segment>
      <Header as="h2">
        <Header.Content>NHTSA data</Header.Content>
      </Header>
      <lable>Enter vin number</lable>
      <input
            name="searchVIN"
            placeholder="Enter VIN"
            value={searchKeyword}
            onChange={handleSearchBoxValueChange}
            id="searchVIN"          
          />
      <Button onClick={handleFindVINVehicle}>Find information</Button>
      <br/>
      <br/>
      <Table celled padded border="1">
        <Table.Header singleLine>
            <Table.Row>
              <Table.Cell>MakeID</Table.Cell>
              <Table.Cell>Make</Table.Cell>
              <Table.Cell>Manufacturer</Table.Cell>
              <Table.Cell>Manufacturer ID</Table.Cell>
              <Table.Cell>Model</Table.Cell>
              <Table.Cell>Model ID</Table.Cell>
              <Table.Cell>Model Year</Table.Cell>
            </Table.Row>
        </Table.Header>
        {nhtsaDataVehicleDetailsByVinNumber !==undefined && nhtsaDataVehicleDetailsByVinNumber.length > 0 && 
          (
            nhtsaDataVehicleDetailsByVinNumber.map((data)=>(
                <Table.Body>
                  <Table.Row key={data.VIN}>
                      <Table.Cell>{data.MakeID}</Table.Cell>
                      <Table.Cell>{data.Make}</Table.Cell>
                      <Table.Cell>{data.Manufacturer}</Table.Cell>
                      <Table.Cell>{data.ManufacturerId}</Table.Cell>
                      <Table.Cell>{data.Model}</Table.Cell>
                      <Table.Cell>{data.ModelID}</Table.Cell>
                      <Table.Cell>{data.ModelYear}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              
              ))
              )
            }
    </Table>
    <br/>
    <br/>
    <Button onClick={fetchDataAllManufacturers}>Get All Manufacturers</Button>
    <Table celled padded  border="1">
    <Table.Header singleLine>
        <Table.Row>
          <Table.Cell>Country</Table.Cell>
          <Table.Cell>Manufacturer Common Name</Table.Cell>
          <Table.Cell>Manufacturer ID</Table.Cell>
          <Table.Cell>Manufacturer NAme</Table.Cell>
          <Table.Cell> Vehicle Type</Table.Cell>
        </Table.Row>
    </Table.Header>
    {nhtsaDataALlManufactures !==undefined && nhtsaDataALlManufactures.length > 0 && 
    (
      nhtsaDataALlManufactures.map((data)=>(
          <Table.Body>
            <Table.Row key={data.Mfr_ID}>
                <Table.Cell>{data.Country}</Table.Cell>
                <Table.Cell><a style={link} onClick={()=>fetchDataAllMakesByManufacturer(data.Mfr_CommonName)}>
                  {data.Mfr_CommonName}</a>
                  </Table.Cell>
                <Table.Cell>{data.Mfr_ID}</Table.Cell>
                <Table.Cell>{data.Mfr_Name}</Table.Cell>
                <Table.Cell>
                  {
                    data.VehicleTypes !== undefined && data.VehicleTypes.length>0 && 
                    (
                      data.VehicleTypes.map((type)=>(
                        <List.Item>
                          <List.Content>{type.IsPrimary}</List.Content>
                          <List.Content>{type.Name}</List.Content>
                        </List.Item>
                      ))
                      )
                  }
                </Table.Cell>
            </Table.Row>
          </Table.Body>
        
        ))
        )
      }
      </Table>
     </Segment>
     <ManufacturerDet 
               isShowing={isShowing}
               manufacturerData={nhtsaDataAllMakesByManufacturer}
                hide={toggle}
      />
    </Fragment>);
}
export default AdminPage;
