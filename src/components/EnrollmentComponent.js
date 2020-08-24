import React from 'react'
import PropTypes from 'prop-types'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
function EnrollmentComponent({elsi}) {
    const studentEnrollmentPrefix = "Total Students All Grades (Excludes AE) "
    const data = Object.keys(elsi).reduceRight((prev, key) => {
        if(!key.startsWith(studentEnrollmentPrefix) || !elsi[key]) {
            return prev;
        }
        const schoolYear = key.substr(studentEnrollmentPrefix.length).split("-")[0];
        prev.push({
            schoolYear,
            enrollment: elsi[key]
        });
        return prev;
    }, []);
    console.log(data);
    return (
        <div>
            <h3>Enrollment</h3>
            <ResponsiveContainer height={400} width="100%">
            <LineChart data={data}>
            <XAxis dataKey="schoolYear"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Line type="monotone" name="Student Enrollment" dataKey="enrollment" stroke="#8884d8" activeDot={{r: 8}}/>
            </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

EnrollmentComponent.propTypes = {
    elsi: PropTypes.object.isRequired,
}

export default EnrollmentComponent

