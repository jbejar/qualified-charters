import React, {useState} from 'react';
import SchoolTable from './SchoolTable';
import SchoolMap from './SchoolMap';
import schoolsDump from "./../dump.json";
import SchoolFilter from './SchoolFilter';
const professionalLicense = s =>  (((s.licenseTypes["1"] || 0) + (s.licenseTypes["1 - Returning"] || 0) + (s.licenseTypes["2"] || 0) + (s.licenseTypes["3"] + (s.licenseTypes["Professional"] || 0) || 0)) / (s.licenseTypes.All || 0))

export default function MapPage() {
    const [schools, setSchools] = useState(schoolsDump);
    return (
        <div className="container">    
            
            <div className="jumbotron">
                <h3 className="display-4">Utah Charter School Map</h3>
                
                <SchoolMap locate={true} schools={schools} center={[40.7774076, -111.8881773]}/>
                <SchoolFilter setSchools={setSchools}/>
            </div>
            <img width="400" src={process.env.PUBLIC_URL + "/Qualified.png"} className="img-fluid rounded" alt="Qualified"/>
            <SchoolTable schools={schools} columns={[{
                name: "Professional License %",
                func: professionalLicense
            }]}/>
        </div>
    )
}
