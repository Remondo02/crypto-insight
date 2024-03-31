export default function eventsData({ cryptoEvents }) {
  const convertedData = []
  let latestEvent
  let endDate

  for (const event of cryptoEvents) {
    if (event.date_to < event.date) {
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
      (acc, val) =>
        acc.formatTime > val.formatTime ? acc.formatTime : val.formatTime,
      0
    )
  }
  return { data: convertedData.reverse(), latestEvent }
}
