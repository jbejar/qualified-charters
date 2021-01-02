import React, {useState} from 'react'
import SchoolTable from '../components/SchoolTable';
import LegislativeDistrictDropDown from '../components/LegislativeDistrictDropDown';
export default function MostQualifiedPage() {
    const [schools, setSchools] = useState([]);
    const percentLicensed = s => 1 - ((s.licenseTypes["No License"] || 0) / (s.licenseTypes.All || 0))
    const firstLicensedMean = s => (s.firstLicensed["meanYrs"] || 0)
    const firstLicensedMedian = s => (s.firstLicensed["medianYrs"] || 0)
    const renewedLicensed = s => (s.licenseStatus["Renewed"] || 0) / (s.licenseStatus.All || 0)
    const expiredLicensed = s => (s.licenseStatus["Expired"] || 0) / (s.licenseStatus.All || 0)
    const temporaryLicensed = s =>  ((s.licenseTypes.Temporary || 0) / (s.licenseTypes.All || 0))
    const leaLicensed = s =>  (((s.licenseTypes["Level 1 LEA-Specific"] || 0) + (s.licenseTypes["Level 2 LEA-Specific"] || 0) + (s.licenseTypes["LEA-Specific"] || 0)) / (s.licenseTypes.All || 0))
    const qualifiedSort = (s,t) => (2*firstLicensedMean(t)  + firstLicensedMedian(t)) -(2*firstLicensedMean(s) + firstLicensedMedian(s));
    const meanLicensedSort = (s,t) => (1.5*renewedLicensed(t)  + 0.6*professionalLicense(t) + 0.3*teacherToStudent(t)) -(1.5*renewedLicensed(s) + 0.6*professionalLicense(s) - 0.3 * teacherToStudent(s));
    const leastMeanLicensedSort = (t,s) => meanLicensedSort(s,t);
    const leastQualifiedSort = (t,s) => (2*renewedLicensed(t)  + professionalLicense(t)) -(2*renewedLicensed(s) + professionalLicense(s));
    const licensedSort = (s,t) => (leaLicensed(t) -leaLicensed(s));
    const renewedLicenseSort = (s,t) => (renewedLicensed(t) -renewedLicensed(s));
    const leastRenewedLicenseSort = (t,s) => (renewedLicensed(t) -renewedLicensed(s));
    const professionalLicense = s =>  (((s.licenseTypes["1"] || 0) + (s.licenseTypes["1 - Returning"] || 0) + (s.licenseTypes["2"] || 0) + (s.licenseTypes["3"] || 0) + (s.licenseTypes["Professional"] || 0)) / (s.licenseTypes.All || 0))
    const professionalLicenseSort = (s,t) => (professionalLicense(t) -professionalLicense(s));
    const beforeYearForGrowth = "Total Students All Grades (Excludes AE) 2018-19"
    const afterYearForGrowth = "Total Students All Grades (Excludes AE) 2019-20"
    const enrollmentGrowth = s =>  !s.elsi || !s.elsi[afterYearForGrowth] || !s.elsi[beforeYearForGrowth] ? 0 : ( ((s.elsi[afterYearForGrowth] || 0) / (s.elsi[beforeYearForGrowth] || 0))-1)
    const enrollmentGrowthSort = (s,t) => (enrollmentGrowth(t) -enrollmentGrowth(s));
    const teacherToStudent = s =>  !s.elsi || !s.elsi["Pupil/Teacher Ratio 2018-19"] ? Infinity :  (s.elsi["Pupil/Teacher Ratio 2018-19"] || Infinity);
    const teacherToStudentSort = (t,s) => (teacherToStudent(t) -teacherToStudent(s));
    return (
        <div className="container">
            <div className="jumbotron">
                <h3 className="display-4">Most Qualified</h3>
                <hr className="my-2"/>
                <img width="400" src={process.env.PUBLIC_URL + "/Qualified.png"} className="img-fluid rounded" alt="Qualified Log"/>
            </div>
            <h4>Most Qualified Charter Schools</h4>
            <SchoolTable schools={schools} sort={qualifiedSort} columns={[
                {name: "Renewed", func: renewedLicensed},
                {name: "Professional", func: professionalLicense},
                {name: "Percent Licensed", func: percentLicensed},
                {name: "Temporary Licensed", func: temporaryLicensed},
            ]} limit={20}/>
            <h4>Most Experienced Licensed Educators in Charter Schools</h4>
            <SchoolTable schools={schools} sort={meanLicensedSort} columns={[
                {name: "Avg. Years Since First Licensed", func: r => firstLicensedMean(r) + ""},
                {name: "Teacher/Student Ratio from 2018", func: r => teacherToStudent(r).toFixed(1) + ""},
            ]} limit={20}/>
            <h4>Most LEA Specific Licenses</h4>
            <SchoolTable schools={schools} sort={licensedSort} limit={20} columns={[
                {name: "Lea Licensed", func: leaLicensed},
            ]}/>
            <h4>Professional Educator Licenses</h4>
            (Level 1-3)
            <SchoolTable schools={schools} sort={professionalLicenseSort} limit={20} columns={[
                {name: "Professional Educator", func: professionalLicense},
            ]}/>
            <h4>Renewed Educator Licenses</h4>
            <SchoolTable schools={schools} sort={renewedLicenseSort} limit={20} columns={[
                {name: "Renewed", func: renewedLicensed},
            ]}/>
            <h4>Least Renewed Educator Licenses</h4>
            <SchoolTable schools={schools} sort={leastRenewedLicenseSort} limit={20} columns={[
                {name: "Renewed", func: renewedLicensed},
            ]}/>
            <h4>Least Renewed and Professional Educator Licenses</h4>
            <SchoolTable schools={schools} sort={leastQualifiedSort} limit={20} columns={[
                {name: "Renewed", func: renewedLicensed},
                {name: "Professional", func: professionalLicense},
                {name: "Percent Licensed", func: percentLicensed},
                {name: "Temporary Licensed", func: temporaryLicensed},
                {name: "Expired Licensed", func: expiredLicensed},
            ]}/>
            <h4>Least Experienced Licensed Educators in Charter Schools</h4>
            <SchoolTable schools={schools} sort={leastMeanLicensedSort} columns={[
                {name: "Avg. Years Since First Licensed", func: r => firstLicensedMean(r) + ""},
                {name: "Teacher/Student Ratio from 2018", func: r => teacherToStudent(r).toFixed(1) + ""},
            ]} limit={20}/>
            <h4>Teacher To Student Ratio</h4>
            <SchoolTable schools={schools} sort={teacherToStudentSort} limit={20} columns={[
                {name: "Teacher/Student Ratio from 2018", func: r => teacherToStudent(r).toFixed(1) + ""},
            ]}/>
            <h4>Enrollment Growth</h4>
            <SchoolTable schools={schools} sort={enrollmentGrowthSort} limit={20} columns={[
                {name: "Growth from 2018", func: enrollmentGrowth},
            ]}/>
            <LegislativeDistrictDropDown setSchools={setSchools}/>
        </div>
    )
}
