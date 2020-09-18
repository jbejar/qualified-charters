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
function FirstLicensedHistogram({ schools, averages }) {
  const numbers = schools.reduce(
    (acc, school) =>
      acc.concat(
        school.firstLicensed.list
      ),
    []
  );
  const bins = window.d3.bin().domain([-1, 25]).thresholds(25)(numbers);
  const data = bins.reduce((acc, el) => {
    acc.push({
      x: (el.x0 + el.x1) / 2,
      y: el.length,
      label: el.x0,
    });
    return acc;
  });
  return (
      <div class="mb-3">
          <h3>Educator Licensure</h3>
      
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
            <Label value="Years Since First Licensed" offset={-10} position="insideBottom" />
            </XAxis>
        <YAxis />
        <Tooltip />
        <Bar dataKey="y" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
      {numbers.length && averages && <div><p><b>Mean Eduator Years Licensed:</b> {window.d3.mean(numbers).toFixed(2)}
      </p><p><b>Median Eduator Years Licensed:</b> {window.d3.median(numbers).toFixed(2)}
      </p></div>}
    Note: If educator is not licensed, they are included as 0
    </div>
  );
}

FirstLicensedHistogram.propTypes = {
  schools: PropTypes.array.isRequired,
  averages: PropTypes.bool,
};

export default FirstLicensedHistogram;
