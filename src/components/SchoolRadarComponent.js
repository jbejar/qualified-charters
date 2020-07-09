import React from "react";
import PropTypes from "prop-types";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ResponsiveContainer} from 'recharts';
 // Color Blind 10 -https://help.tableau.com/current/pro/desktop/en-us/formatting_create_custom_colors.htm
const color = {
    "2014": "#cfcfcf",
    "2015": "#ffbc79",
    "2016": "#a2c8ec",
    "2017": "#898989",
    "2018": "#c85200",
    "2019": "#5f9ed1",
    "2020": "#595959",
    "2021": "#ababab",
    "2022": "#006ba4",
}
function SchoolRadarComponent({ school }) {
  const data = [
    { name: "Language Arts", ...school.scores["Language Arts"] },
    { name: "Science", ...school.scores["Science"] },
    { name: "Mathematics", ...school.scores["Mathematics"] },
  ].map(score => {
      Object.keys(school.scores[score.name]).forEach(key => {
          score[key] = parseFloat(score[key])
      });
      return score;
  });   
  return (
    <ResponsiveContainer height={400} width="100%">
      <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip/>
      <XAxis dataKey="name" />
      <YAxis domain={[0,100]}/>
      <Legend />
      {/* <Bar dataKey="pv" fill="#8884d8" />
      <Bar dataKey="uv" fill="#82ca9d" /> */}
    
        
        {Object.keys(school.scores["Language Arts"]).map(year => 
        <Bar
        key={year}
        name={year}
        dataKey={year}
        stroke={color[year]}
        fill={color[year]}
        fillOpacity={0.6}
      />    
            )}
        
        </BarChart>
    </ResponsiveContainer>
  );
}

SchoolRadarComponent.propTypes = {
  school: PropTypes.object.isRequired,
};

export default SchoolRadarComponent;
