import React from "react";
import { react as Article}  from "../_posts/blog/2020-09-18-test.md";
import Row from "react-bootstrap/Row";

export default function BlogPage() {
    const blogPostsContext = require.context("../_posts/blog", true, /\.md$/);
    const articleKeys = blogPostsContext.keys();
    
  return (
    <div className="container">
      <div className="jumbotron p-4">
        <h1 className="display-4">Qualified Charters</h1>
        {articleKeys.map(key => {
            const article = blogPostsContext(key);
            return article.react;
        })
        }
        <p className="lead my-4">
          Blog
          <Article/>
        </p>

      </div>
      <Row className="mb-2">
          
      </Row>
    </div>
  );
}
