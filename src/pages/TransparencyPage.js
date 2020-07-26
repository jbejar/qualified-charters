import React, {useState } from 'react'
import SchoolTable from '../components/SchoolTable';
import LegislativeDistrictDropDown from '../components/LegislativeDistrictDropDown';
export default function TransparencyPage() {
    const recordings = s => s.pmn.haveRecordings / s.pmn.scheduled;
    const minutes = s => s.pmn.haveMinutes / s.pmn.scheduled;
    const properNotice = s => s.pmn.advanceNotice / s.pmn.meetings.length;
    const recordingsSort = (s,t) => (recordings(t) + properNotice(t) + minutes(t)-recordings(s) - minutes(s)- properNotice(s));
    const recordingsSortInv = (s,t) => recordingsSort(t,s);
    const [schools, setSchools] = useState([]);
    return (
        <div className="container">
            <div className="jumbotron">
                <h3 className="display-4">Transparency</h3>
                <hr className="my-2"/>
                <img width="400" src={process.env.PUBLIC_URL + "/Qualified.png"} className="img-fluid rounded" alt="Qualified Logo"/>
                <p>
                    Schools are required to post minutes within three days of their approval to the <a href="https://www.utah.gov/pmn/index.html" >Utah Public Meeting</a> website.
                    Also they are also required to post an audio recording within three days of the meeting. See <a href="https://le.utah.gov/xcode/Title52/Chapter4/52-4-S203.html?v=C52-4-S203_2018050820180508">Utah Open and Public Meetings Act</a>
                </p>
            </div>
            
            <h4>Most Audio Recordings and Minutes</h4>
            <SchoolTable schools={schools} sort={recordingsSort} columns={[
                {name: "Recordings Avail", func: recordings},
                {name: "Minutes Avail", func: minutes},
                {name: "<= 24 hr notice", func: properNotice},
            ]} limit={20}/>
            <h4>Least Audio Recordings and Minutes</h4>
            <SchoolTable schools={schools} sort={recordingsSortInv} columns={[
                {name: "Recordings Avail", func: recordings},
                {name: "Minutes Avail", func: minutes},
                {name: "<= 24 hr notice", func: properNotice},
            ]} limit={38}/>
            <LegislativeDistrictDropDown setSchools={setSchools} />
        </div>
    )
}
