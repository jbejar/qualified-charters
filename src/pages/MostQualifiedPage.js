import React, {useState} from 'react'
import SchoolTable from '../components/SchoolTable';
import LegislativeDistrictDropDown from '../components/LegislativeDistrictDropDown';
export default function MostQualifiedPage() {
    const [schools, setSchools] = useState([]);
    const percentLicensed = s => 1 - ((s.licenseTypes["No License"] || 0) / (s.licenseTypes.All || 0))
    const temporaryLicensed = s =>  ((s.licenseTypes.Temporary || 0) / (s.licenseTypes.All || 0))
    const leaLicensed = s =>  (((s.licenseTypes["Level 1 LEA-Specific"] || 0) + (s.licenseTypes["Level 2 LEA-Specific"] || 0)) / (s.licenseTypes.All || 0))
    const qualifiedSort = (s,t) => (percentLicensed(t) - temporaryLicensed(t) + professionalLicense(t)) -(percentLicensed(s) - temporaryLicensed(s) + professionalLicense(s));
    const licensedSort = (s,t) => (leaLicensed(t) -leaLicensed(s));
    const professionalLicense = s =>  (((s.licenseTypes["1"] || 0) + (s.licenseTypes["1 - Returning"] || 0) + (s.licenseTypes["2"] || 0) + (s.licenseTypes["3"] || 0) + (s.licenseTypes["Professional"] || 0)) / (s.licenseTypes.All || 0))
    const professionalLicenseSort = (s,t) => (professionalLicense(t) -professionalLicense(s));
    return (
        <div className="container">
            <div className="jumbotron">
                <h3 className="display-4">Most Qualified</h3>
                <hr className="my-2"/>
                <img width="400" src={process.env.PUBLIC_URL + "/Qualified.png"} className="img-fluid rounded" alt="Qualified Log"/>
            </div>
            <h4>Most Qualified Charter Schools</h4>
            <SchoolTable schools={schools} sort={qualifiedSort} columns={[
                {name: "Percent Licensed", func: percentLicensed},
                {name: "Temporary Licensed", func: temporaryLicensed},
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
            <LegislativeDistrictDropDown setSchools={setSchools}/>
        </div>
    )
}
