import React from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";

export default function SchoolSearchComponent() {
  const onChange = e => {
    console.log(e)
  };
  return (
    <div>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={onChange}/>
        <LinkContainer to="/schools/165615">
          <Button variant="outline-success">Search</Button>
        </LinkContainer>
      </Form>
    </div>
  );
}
