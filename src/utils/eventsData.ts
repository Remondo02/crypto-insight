import { type EventsApiResponse } from "@/apis"

export type EventsDataProps = {
  data: {
    id: string
    title: string
    start: Date
    formatTime: number
    end: Date
    link: string
    allDay: boolean
  }[]
  latestEvent: number | undefined
}

export default function eventsData(cryptoEvents: EventsApiResponse[]) {
  const convertedData = []
  let latestEvent
  let endDate

  for (const event of cryptoEvents) {
    if (event.date_to && event.date_to < event.date) {
      endDate = event.date
    }
    convertedData.push({
      id: event.id,
      title: event.name ?? event.description,
      start: event.date,
      formatTime: new Date(event.date).getTime(),
      end: endDate ?? event.date,
      link: event.link,
      allDay: false,
    })

    latestEvent = convertedData.reduce(
      (acc, val) => (acc > val.formatTime ? acc : val.formatTime),
      0
    )
  }
  return { data: convertedData.reverse(), latestEvent }
}
