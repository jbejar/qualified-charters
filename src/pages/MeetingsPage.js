import React from "react";
import schools from "./../dump.json";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
const localizer = momentLocalizer(moment);
const format = "YYYY/MM/DD hh:mm A";
export default function MeetingsPage() {
    const setSelectedEvent = selectedEvent => {
        if(selectedEvent && selectedEvent.href) {
            window.open("https://www.utah.gov" + selectedEvent.href);
        }
    } 
    const districts = {};
    const events = schools.reduce(
        (current, s) => {
            if(districts[s.DistrictID]) {
                return current;
            }
            districts[s.DistrictID] = true;
            s.pmn.meetings.forEach(m => {
                m.LEA = s.LEA;
                m.City = s.City;
            })
            return current.concat(s.pmn.meetings || [])
        }
    , []);
    

    return (
        <div>
            <Calendar
            localizer={localizer}
            events={events}
            startAccessor={event => moment(event.date, format).toDate()}
            endAccessor={event => moment(event.date, format).add(2, 'h').toDate()}
            titleAccessor="LEA"
            tooltipAccessor="City"
                eventPropGetter={(event, start, end, isSelected) => {

                    let backgroundColor = "#18A2B8";
                    const passed = new Date() - start;
                    if(passed > 0) {  
                        if(event.attachments.includes("Audio Recording Added")) {
                            backgroundColor = "#28A744"
                        } else {
                            const threeDays = passed > (1000 * 60 * 60 * 24) * 3;
                            backgroundColor = threeDays ? "#DD3446" : "#c85200";
                        }
                        
                    } else if(event.attachments === "No associated attachments") {
                        backgroundColor = "#5f9ed1";
                    }
                    return { style: { backgroundColor } }
                  }}
            onSelectEvent={setSelectedEvent}
            style={{height: 700}}
            />
            <p>Has Recording GREEN</p>
            <p>Missing Recording RED after 3 days </p>
            <p>ORANGE if no recording yet</p>
        </div>
    )
}
