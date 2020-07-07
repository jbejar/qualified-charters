import React, {useState} from 'react';
import SchoolTable from './SchoolTable';
import SchoolMap from './SchoolMap';
import schoolsDump from "./../dump.json";
import SchoolFilter from './SchoolFilter';

export default function HomePage() {
    const [schools, setSchools] = useState(schoolsDump);
    return (
        <div className="container">    
            
            <div className="jumbotron">
                <h3 className="display-4">Search for Your Charter School Up Top</h3>
                <hr className="my-2"/>
                <h3>How do Utah Schools Charter Schools Compare?</h3>
                <SchoolMap schools={schools} zoom={8}/>
                <SchoolFilter setSchools={setSchools}/>
            </div>
            <img width="400" src="/Qualified.png" className="img-fluid rounded" alt=""/>    
            <SchoolTable/>
        </div>
    )
}
