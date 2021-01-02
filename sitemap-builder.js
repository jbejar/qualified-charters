require('@babel/register')({
	extends: './.babelrc',
})
 
const Sitemap = require('react-router-sitemap').default;
const router = require('./src/sitemap-routes').default;
const params = require("./src/dump.json").map(s => ({
    schoolID: s.SchoolID,
    schoolName: encodeURIComponent(s.SchoolName.trim().toLowerCase().replace(/ /g, '-').replace('&', 'and').replace("#", "").replace(/\./g, ''))
}));
const paramsConfig = {
	'/schools/:schoolID/:schoolName': params};
(
    new Sitemap(router)
        .applyParams(paramsConfig)
        .build('https://www.qualifiedcharters.com/')
        .save('./public/sitemap.xml')
);