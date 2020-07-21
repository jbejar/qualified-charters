import React from 'react'
import schools from "./../dump.json";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
const localizer = momentLocalizer(moment);
const format = "YYYY/MM/DD hh:mm A";
export default function MeetingsPage() {
    const events = schools.reduce(
        (current, s) => current.concat(s.pmn.meetings || [])
    , []);
    console.log(events);

    return (
        <div>
            <Calendar
            localizer={localizer}
            events={events}
            startAccessor={event => moment(event.date, format).toDate()}
            endAccessor={event => moment(event.date, format).add(2, 'h').toDate()}
            titleAccessor="name"
            style={{height: 700}}
            />
        </div>
    )
}
