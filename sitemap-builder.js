require('@babel/register')({
	extends: './.babelrc',
})
 
const Sitemap = require('react-router-sitemap').default;
const router = require('./src/sitemap-routes').default;
 
(
    new Sitemap(router)
        .build('https://www.qualifiedcharters.com/')
        .save('./public/sitemap.xml')
);