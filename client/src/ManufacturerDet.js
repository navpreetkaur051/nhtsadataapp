import React, { Fragment} from "react";
import { Form, Button ,Header, Segment, Table} from "semantic-ui-react";

/**
 * @author @navpreet
 * @description
 **/
const ManufacturerDet =({isShowing,hide,manufacturerData}) =>{

    const handleCloseModal =()=>{
        hide();
    }

    if(isShowing){
    return (
        <Fragment>
            <div className="modal-overlay"/>
                <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
                    <div className="modal-testsql">
                            <Form>
                                <Form.Field className="buttonToRight">
                                    <Button data-dismiss="modal" onClick={handleCloseModal}>Close</Button>
                                </Form.Field>
                                <Form.Field>
                                        <Segment  verticalAlign='top'>
                                                    <Header>Makes by Manufacturer</Header>
                                                    <Table celled border="1">
                                                        <Table.Header>
                                                            <Table.Row>
                                                            <Table.HeaderCell>Make ID</Table.HeaderCell>
                                                            <Table.HeaderCell>Make name</Table.HeaderCell>
                                                            <Table.HeaderCell>Manufacturer name</Table.HeaderCell>
                                                            </Table.Row>
                                                     </Table.Header>
                                                    {manufacturerData !== undefined && manufacturerData.length>0 && 
                                                    manufacturerData.map((data)=>(
                                                        <Table.Body>
                                                         <Table.Row>
                                                            <Table.Cell>{data.Make_ID}</Table.Cell>
                                                            <Table.Cell>{data.Make_Name}</Table.Cell>
                                                            <Table.Cell>{data.Mfr_Name}</Table.Cell>
                                                        </Table.Row>
                                                    </Table.Body>
                                                    ))}
                                                    </Table>
                                        </Segment> 
                                </Form.Field>
                            </Form>
                    </div>
                </div>
        </Fragment>);
    }
    else{ return null;}
}

export default ManufacturerDet