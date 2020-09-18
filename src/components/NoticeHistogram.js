import React from "react";
import PropTypes from "prop-types";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Label,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
function NoticeHistogram({ schools }) {
  const numbers = schools.reduce(
    (acc, school) =>
      acc.concat(
        school.pmn.meetings.map((mtg) => mtg.hoursAdvanceNotice / 24.0)
      ),
    []
  );
  const bins = window.d3.bin().domain([-4, 8]).thresholds(10)(numbers);
  const data = bins.reduce((acc, el) => {
    acc.push({
      x: (el.x0 + el.x1) / 2,
      y: el.length,
      label: el.x0 + " to " + el.x1,
    });
    return acc;
  });
  return (
      <div>
          <h3>Recent Public Meetings</h3>
      
    <ResponsiveContainer height={400} width="100%">
      <BarChart
        barGap={1}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 15,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label">
            <Label value="Days Notice Given for Public Mtg" offset={-5} position="insideBottom" />
            </XAxis>
        <YAxis />
        <Tooltip />
        <Bar dataKey="y" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
}

NoticeHistogram.propTypes = {
  schools: PropTypes.array.isRequired,
};

export default NoticeHistogram;
