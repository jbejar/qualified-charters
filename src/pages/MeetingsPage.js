import React, {useState} from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {FaRegFileAudio, FaHourglass, FaRegCalendarTimes, FaHeadset} from 'react-icons/fa'
import { Link } from "react-router-dom";
import LegislativeDistrictDropDown from '../components/LegislativeDistrictDropDown';
const localizer = momentLocalizer(moment);
const format = "YYYY/MM/DD hh:mm A";
const endDateFormat = "MMMM D, YYYY hh:mm A";
export default function MeetingsPage() {
  const setSelectedEvent = (selectedEvent) => {
    if (selectedEvent && selectedEvent.href) {
      window.open("https://www.utah.gov" + selectedEvent.href);
    }
  };
  const districts = {};
  const [schools, setSchools] = useState([]);
  const events = schools.reduce((current, s) => {
    if (districts[s.DistrictID]) {
      return current;
    }
    districts[s.DistrictID] = true;
    const slug = s.SchoolName.trim().toLowerCase().replaceAll('&', 'and').replaceAll(' ', '-').replaceAll('#', '').replace(/\./g, '');
    s.pmn.meetings.forEach((m) => {
      m.link = "schools/" + s.SchoolID + "/" + slug;
      m.LEA = s.LEA;
      m.City = s.City;
      m.StatePublicBody = s.CharteredBy === "State Charter School Board (SCSB)"
      m.HasAudio = m.attachments.includes("Audio Recording Added");
    });
    return current.concat(s.pmn.meetings || []);
  }, []);

  return (
    <div>
      
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor={(event) => moment(event.date, format).toDate()}
        endAccessor={(event) => {
          if(!event.endDate) {
            return moment(event.date, format).add(2, "h").toDate();
          }

          const start = moment(event.date, format);
          const end = moment(event.endDate, endDateFormat);
          const dayAfter = start.add(24, "h");

          if(end.isAfter(dayAfter)) {
            return dayAfter.toDate();
          }
          return end.toDate();
          
        }}
        titleAccessor={e => <span>
            {e.status === "Cancelled" && <FaRegCalendarTimes title="Cancelled" className="mr-1"/>}
            {e.HasAudio && <FaRegFileAudio title="Audio recording available" className="mr-1"/>}
            {!e.isDuplicate && e.hoursAdvanceNotice < 24 && <FaHourglass title="< 24 hour notice"className="mr-1"/>}
            {e.electronic && <FaHeadset title="Electronic meeting available" className="mr-1"/>}
            {<Link className="text-white" to={e.link}>{e.LEA}</Link>}
        </span>}
        tooltipAccessor={ e =>
          e.LEA + " " + e.City
        }
        eventPropGetter={(event, start, end, isSelected) => {
          let backgroundColor = "#18A2B8";
          const passed = new Date() - start;
          if(event.status === "Cancelled") {
            backgroundColor = "#6C757D"
          }
          else if (passed > 0) {
            if (event.HasAudio) {
              backgroundColor = "#28A744";
            } else {
              const threeDays = passed > 1000 * 60 * 60 * 24 * 3;
              backgroundColor = threeDays && event.StatePublicBody ? "#DD3446" : "#c85200";
            }
          } else if (event.attachments === "No associated attachments") {
            backgroundColor = "#5f9ed1";
          }
          return { style: { backgroundColor } };
        }}
        onSelectEvent={setSelectedEvent}
        style={{ height: 700 }}
      />
      <div className="container">
      <LegislativeDistrictDropDown setSchools={setSchools} />
      <p>Missing Recording RED after 3 days </p>
      <p>ORANGE if no recording yet</p>
      </div>
      
    </div>
  );
}
