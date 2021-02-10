import React, { useState } from "react";
import SchoolMap from "../components/SchoolMap";
import SchoolTable from "../components/SchoolTable";
import LegislativeDistrictDropDown from "../components/LegislativeDistrictDropDown";
import LicenseComponent from "../components/LicenseComponent";
import EnrollmentComponent from "../components/EnrollmentComponent";
import NoticeHistogram from "../components/NoticeHistogram"
import FirstLicensedHistogram from "../components/FirstLicensedHistogram"

function titleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function ReportsPage(props) {
  const [schools, setSchools] = useState([]);
  const recordings = (s) => Math.min(s.pmn.haveRecordings / s.pmn.shouldHaveRecordings,1);
  const minutes = (s) => s.pmn.haveMinutes / s.pmn.shouldHaveRecordings;
  const properNotice = (s) => s.pmn.advanceNotice / s.pmn.scheduled;
  const educatorLicenseCountGrowth = s =>  !s.oldAllLicenses ? 0 : ( ((s.licenseStatus.All || 0) / (s.oldAllLicenses || 0))-1);
  const enrollmentGrowth = s =>  ((s.elsi || {})["Total Students All Grades (Excludes AE) 2020-21"] / (s.elsi || {})["Total Students All Grades (Excludes AE) 2019-20"]) - 1;
  const enrollmentGrowthPrev = s =>  ((s.elsi || {})["Total Students All Grades (Excludes AE) 2019-20"] / (s.elsi || {})["Total Students All Grades (Excludes AE) 2018-19"]) - 1;
  const enrollmentGrowthPrev2 = s =>  ((s.elsi || {})["Total Students All Grades (Excludes AE) 2018-19"] / (s.elsi || {})["Total Students All Grades (Excludes AE) 2017-18"]) - 1;
  const procurement = s => s.procurement.length  + "";
  const procurementSort = (s,t) => (procurement(t) -procurement(s));
  const yearOpened = s => s.YearOpened  + "";
  const city = s => s.City  + "";
  const address = s => s.Address  + "";
  const yearOpenedSort = (s,t) => (yearOpened(t) -yearOpened(s));
  const enrollmentGrowthSort = (s,t) => (educatorLicenseCountGrowth(t) -educatorLicenseCountGrowth(s));
  const enrollmentGrowthSortRev = (t,s) => (enrollmentGrowth(t) -enrollmentGrowth(s) || isNaN(enrollmentGrowth(t))-isNaN(enrollmentGrowth(s)));
  const percentLicensed = s => 1 - ((s.licenseTypes["No License"] || 0) / (s.licenseTypes.All || 0))
  const recordingsSort = (s, t) =>
    recordings(t) + minutes(t) - recordings(s) - minutes(s);

  const licenseStatus = schools.reduce(
    (acc, s) => {
      Object.keys(acc).forEach((k) => {
        acc[k] += s.licenseStatus[k] || 0;
      });
      return acc;
    },
    {
      Expired: 0,
      New: 0,
      "No License": 0,
      Reinstated: 0,
      Renewed: 0,
      Student: 0,
      All: 0,
    }
  );
  const licenseTypes = schools.reduce(
    (acc, s) => {
      Object.keys(acc).forEach((k) => {
        acc[k] += s.licenseTypes[k] || 0;
      });
      return acc;
    },
    {
      "1": 0,
      "1 - Returning": 0,
      "2": 0,
      "3": 0,
      "Alt. Route to Licensure": 0,
      Associate: 0,
      "Level 1 APT": 0,
      "LEA-Specific": 0,
      "Level 1 LEA-Specific": 0,
      "Level 2 LEA-Specific": 0,
      "No License": 0,
      Professional: 0,
      Temporary: 0,
      All: 0,
    }
  );
  const elsi = schools.reduce(
    (acc, s) => {
      if(!s.elsi) {
        return acc;
      }
      Object.keys(acc).forEach((k) => {
        if(!s.elsi[k]){
          return;
        }
        acc[k] += s.elsi[k] || 0;
      });
      return acc;
    }, {
      "Total Students All Grades (Excludes AE) 2020-21": 0,
      "Total Students All Grades (Excludes AE) 2019-20": 0,
      "Total Students All Grades (Excludes AE) 2018-19": 0,
      "Total Students All Grades (Excludes AE) 2017-18": 0,
      "Total Students All Grades (Excludes AE) 2016-17": 0,
      "Total Students All Grades (Excludes AE) 2015-16": 0,
      "Total Students All Grades (Excludes AE) 2014-15": 0,
      "Total Students All Grades (Excludes AE) 2013-14": 0,
      "Total Students All Grades (Excludes AE) 2012-13": 0,
      "Total Students All Grades (Excludes AE) 2011-12": 0,
      "Total Students All Grades (Excludes AE) 2010-11": 0,
      "Total Students All Grades (Excludes AE) 2009-10": 0,
      "Full-Time Equivalent (FTE) Teachers 2018-19": null,
      "Full-Time Equivalent (FTE) Teachers 2017-18": null,
      "Full-Time Equivalent (FTE) Teachers 2016-17": null,
      "Full-Time Equivalent (FTE) Teachers 2015-16": null,
      "Full-Time Equivalent (FTE) Teachers 2014-15": null,
      "Full-Time Equivalent (FTE) Teachers 2013-14": null,
      "Full-Time Equivalent (FTE) Teachers 2012-13": null,
      "Full-Time Equivalent (FTE) Teachers 2011-12": null,
      "Full-Time Equivalent (FTE) Teachers 2010-11": null,
      "Full-Time Equivalent (FTE) Teachers 2009-10": null,

    });
  const oldAllLicenses = schools.reduce(
    (acc, s) => acc + s.oldAllLicenses, 0);
  const summarySchool = {
    licenseTypes,
    licenseStatus,
    oldAllLicenses,
    elsi
  };
  return (
    <div className="container">

      <LegislativeDistrictDropDown setSchools={setSchools} />
      {schools && schools.length > 0 && (
        <SchoolMap
          recenter
          schools={schools}
          center={[schools[0].Lat, schools[0].Lng]}
        />
      )}
      <EnrollmentComponent elsi={summarySchool.elsi}/>
      
      <SchoolTable
        summary
        sort={recordingsSort}
        schools={schools}
        columns={[
          {
            name: "City",
            func: (s) => titleCase(s.City),
          },
          {name: "Percent Licensed", func: percentLicensed, summary: true},
          { name: "Recordings Avail", func: recordings, summary: true },
          { name: "Minutes Avail", func: minutes, summary: true },
          { name: "<= 24 hr notice", func: properNotice, summary: true },
        ]}
      />
       <h4>Most New Assigned Educators Since Feb 2020</h4>
      <SchoolTable
        summary
        sort={enrollmentGrowthSort}
        schools={schools}
        columns={[
          {name: "Educators Assigned in CACTUS", func: educatorLicenseCountGrowth, summary: true},
        ]}
      />
       <h4>Declining Enrollments</h4>
      <SchoolTable
        summary
        sort={enrollmentGrowthSortRev}
        limit={20}
        schools={schools}
        columns={[
          {name: "% Change Enrollment SY 20-21", func: enrollmentGrowth, summary: true},
          {name: "% Change Enrollment SY 19-20", func: enrollmentGrowthPrev, summary: true},
          {name: "% Change Enrollment SY 18-19", func: enrollmentGrowthPrev2, summary: true},
        ]}
      />
      <h4>Newest Charter Schools</h4>
      <SchoolTable
        limit={25}
        sort={yearOpenedSort}
        schools={schools}
        columns={[
          {name: "Opened", func: yearOpened, summary: true},
          {name: "Address", func: address, summary: true},
          {name: "City", func: city, summary: true},
        ]}
      />
       <h4>Most Procurement Records in State Procurement Portal</h4>
      <SchoolTable
        limit={24}
        sort={procurementSort}
        schools={schools}
        columns={[
          {name: "Procurement Records", func: procurement, summary: true},
        ]}
        />
    
      
      <LicenseComponent school={summarySchool} />
      <FirstLicensedHistogram averages schools={schools}/>
      <NoticeHistogram schools={schools}/>
    </div>
  );
}

export default ReportsPage;
