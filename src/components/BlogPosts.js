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
        </div>
    )
}

BlogPosts.propTypes = {
    schools: PropTypes.array,
}

export default BlogPosts

