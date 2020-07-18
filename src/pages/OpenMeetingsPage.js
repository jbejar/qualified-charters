import React from 'react'
import SchoolTable from '../components/SchoolTable';
import schools from "../dump.json";
export default function OpenMeetingsPage() {
    const recordings = s => s.pmn.haveRecordings / s.pmn.scheduled;
    const minutes = s => s.pmn.haveMinutes / s.pmn.scheduled;
    const recordingsSort = (s,t) => (recordings(t) + minutes(t)-recordings(s) - minutes(s));
    const recordingsSortInv = (s,t) => recordingsSort(t,s);
    return (
        <div className="container">
            <div className="jumbotron">
                <h3 className="display-4">Open Meetings</h3>
                <hr className="my-2"/>
                <img width="400" src="/Qualified.png" className="img-fluid rounded" alt=""/>
            </div>
            <h4>Most Audio Recordings and Minutes</h4>
            <SchoolTable schools={schools} sort={recordingsSort} columns={[
                {name: "Recordings Avail", func: recordings},
                {name: "Minutes Avail", func: minutes},
            ]} limit={20}/>
            <h4>Least Audio Recordings and Minutes</h4>
            <SchoolTable schools={schools} sort={recordingsSortInv} columns={[
                {name: "Recordings Avail", func: recordings},
                {name: "Minutes Avail", func: minutes},
            ]} limit={38}/>
            
        </div>
    )
}
