import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
} from "@syncfusion/ej2-react-schedule"
import "./../calendar.css"

import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data"


export function CryptoEvents() {

  const data = [
    // {
    //     Id: 2,
    //     Subject: 'Meeting',
    //     StartTime: new Date(2018, 1, 15, 10, 0),
    //     EndTime: new Date(2018, 1, 15, 12, 30),
    //     IsAllDay: false,
    //     Status: 'Completed',
    //     Priority: 'High'
    // },
];

// const fieldsData = {
//     id: 'Id',
//     subject: { name: 'Subject' },
//     isAllDay: { name: 'IsAllDay' },
//     startTime: { name: 'StartTime' },
//     endTime: { name: 'EndTime' }
// }

//   const dataManager = new DataManager({
//     url: "https://services.syncfusion.com/react/production/api/schedule",
//     adaptor: new WebApiAdaptor(),
//     crossDomain: true,
//   })

//   console.log(typeof dataManager, typeof data)
//   console.log(dataManager)

  return (
    <div className="schedule-control-section">
      <div className="control-section">
        <div className="control-wrapper">
          {/* <ScheduleComponent
            width="100%"
            height="650px"
            currentView="Month"
            eventSettings={{ dataSource: dataManager }}
            readonly={true}
          >
            <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
          </ScheduleComponent> */}
        </div>
      </div>
    </div>
  )
}

export default CryptoEvents
