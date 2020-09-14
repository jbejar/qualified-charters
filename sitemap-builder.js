require('@babel/register')({
	extends: './.babelrc',
})
 
const Sitemap = require('react-router-sitemap').default;
const router = require('./src/sitemap-routes').default;
const schoolIDs = require("./src/dump.json").map(s => s.SchoolID);
const paramsConfig = {
	'/schools/:schoolID': [
		{ schoolID: schoolIDs },
	]};
(
    new Sitemap(router)
        .applyParams(paramsConfig)
        .build('https://www.qualifiedcharters.com/')
        .save('./public/sitemap.xml')
);