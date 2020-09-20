import React from "react";
import Row from "react-bootstrap/Row";
import moment from "moment";

export default function BlogPage() {
    const blogPostsContext = require.context("../_posts/blog", true, /\.md$/);
    const articleKeys = blogPostsContext.keys();
    const format = "YYYY/MM/DD hh:mm A";
    
  return (
    <div className="container">
      <div className="jumbotron p-4">
        <h1 className="display-4">Qualified Charters</h1>

      </div>
        {articleKeys.map(key => {
            const article = blogPostsContext(key);
            console.log(article);
            const {date, thumbnail, title, author} = article.attributes;
            
            return <div key={key}>
                <h1>{title}</h1>
                <h4>{author}</h4>
                <h4>{moment(date).format(format)}</h4>
                <img src={thumbnail} alt={title + " image"}/>
                {article.react({})}
            </div>
        })
        }
      <Row className="mb-2">
          
      </Row>
    </div>
  );
}
