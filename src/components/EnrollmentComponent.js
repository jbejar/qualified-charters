import React from 'react'
import PropTypes from 'prop-types'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
function EnrollmentComponent({elsi}) {
    if(!elsi) {
        return <div></div>;
    }
    const studentEnrollmentPrefix = "Total Students All Grades (Excludes AE) "
    const fteTeacherPrefix = "Full-Time Equivalent (FTE) Teachers "
    const teacherToStudentRatio = elsi["Pupil/Teacher Ratio 2018-19"];
    const data = Object.keys(elsi).reduceRight((prev, key) => {
        if(!key.startsWith(studentEnrollmentPrefix) || !elsi[key]) {
            return prev;
        }
        const schoolYearRange = key.substr(studentEnrollmentPrefix.length);
        const fte = elsi[fteTeacherPrefix + schoolYearRange];

        const schoolYear = schoolYearRange.split("-")[0];
        prev.push({
            schoolYear,
            enrollment: elsi[key],
            fte
        });
        return prev;
    }, []);
    return (
        <div>
        <div>
            <h3>Enrollment</h3>
            <ResponsiveContainer height={400} width="100%">
            <LineChart data={data}>
            <XAxis dataKey="schoolYear"/>
            <YAxis/>
            <YAxis yAxisId="right" orientation="right" />
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Line type="monotone" name="Student Enrollment" dataKey="enrollment" stroke="#8884d8" activeDot={{r: 8}}/>
            <Line yAxisId="right" connectNulls name="FTE Teachers" type="monotone" dataKey="fte" stroke="#82ca9d" />
            </LineChart>
            </ResponsiveContainer>
        </div>
        <br/>
        {teacherToStudentRatio && <div><b>Teacher to Student Ratio (2018-19): </b>{teacherToStudentRatio}</div>}
        </div>
    )
}

EnrollmentComponent.propTypes = {
    elsi: PropTypes.object.isRequired,
}

export default EnrollmentComponent

