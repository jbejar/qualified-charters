import React from 'react'
import PropTypes from 'prop-types'
import moment from "moment";

function BlogPosts({schoolId}) {
    const blogPostsContext = require.context("../_posts/blog", true, /\.md$/);
    const articleKeys = blogPostsContext.keys();
    const format = "MMMM Do YYYY";
    const filteredKeys = !schoolId ? articleKeys : articleKeys.filter(k => blogPostsContext(k).attributes.tags.some(t => parseInt(t) === schoolId));
    return (
        <div>
            {filteredKeys.map(key => {
            const article = blogPostsContext(key);
            const {date, thumbnail, title, author, link} = article.attributes;
            
            return <div class="card" style={{width: "18rem;"}} key={key}>
            <img class="card-img-top" src={thumbnail} alt={title + " image"}/>
            <div class="card-body">
              <h5 class="card-title">{title}</h5>
              <h6>{moment(date).format(format)} - {author}</h6>
              <p class="card-text">{article.react({})}</p>
              { link && <a href={link} class="btn btn-primary">Read article</a>}
              
            </div>
          </div>
            
    
        })
        }
        </div>
    )
}

BlogPosts.propTypes = {
    schools: PropTypes.array,
}

export default BlogPosts

