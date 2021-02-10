import React from "react";
import Row from "react-bootstrap/Row";
import BlogPosts from "../components/BlogPosts"
export default function BlogPage() {
    
  return (
    <div className="container">
      <div className="jumbotron p-4">
        <h1 className="display-4">Qualified Charters</h1>

      </div>
        <BlogPosts/>
      <Row className="mb-2">
          
      </Row>
    </div>
  );
}
