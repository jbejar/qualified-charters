import React from 'react'
import SchoolTable from '../components/SchoolTable';
import schools from "./../dump.json";
export default function MostQualifiedPage() {
    const percentLicensed = s => 1 - ((s.licenseTypes["No License"] || 0) / (s.licenseTypes.All || 0))
    const temporaryLicensed = s =>  ((s.licenseTypes.Temporary || 0) / (s.licenseTypes.All || 0))
    const leaLicensed = s =>  (((s.licenseTypes["Level 1 LEA-Specific"] || 0) + (s.licenseTypes["Level 2 LEA-Specific"] || 0)) / (s.licenseTypes.All || 0))
    const level2Up = s =>  (((s.licenseTypes["2"] || 0) + (s.licenseTypes["3"] || 0)) / (s.licenseTypes.All || 0))
    const qualifiedSort = (s,t) => (percentLicensed(t) - temporaryLicensed(t) + level2Up(t)) -(percentLicensed(s) - temporaryLicensed(s) + level2Up(s));
    const licensedSort = (s,t) => (leaLicensed(t) -leaLicensed(s));
    return (
        <div className="container">
            <div className="jumbotron">
                <h3 className="display-4">Most Qualified</h3>
                <hr className="my-2"/>
                <img width="400" src="/Qualified.png" className="img-fluid rounded" alt=""/>
            </div>
            <h4>Most Qualified Charter Schools</h4>
            <SchoolTable schools={schools} sort={qualifiedSort} columns={[
                {name: "Level 2+ Licensed", func: percentLicensed},
                {name: "Percent Licensed", func: level2Up},
                {name: "Temporary Licensed", func: temporaryLicensed},
            ]} limit={20}/>
            <h4>Most LEA Specific Licenses</h4>
            <SchoolTable schools={schools} sort={licensedSort} limit={20} columns={[
                {name: "Lea Licensed", func: leaLicensed},
            ]}/>
        </div>
    )
}
