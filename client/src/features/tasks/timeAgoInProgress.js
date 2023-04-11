import React from 'react'
import { parseISO, formatDistance, formatDuration, formatDistanceToNow } from 'date-fns'

export const TimeAgoInProgress = ({ timestamp }) => {

    console.log(timestamp)

    //const timeAgo = timestamp ? formatDistanceToNow(parseISO(timestamp)) : ''


  let timeAgo = ''
  if (timestamp) {
    const date = parseISO(timestamp)
    const now = new Date()
    
    const timePeriod =
    Math.abs(now - date) < 86400000 //vähemmän kuin yksi pv
    ? formatDuration({ start: now, end: date, format: ['hours', 'minutes'] })
    : formatDuration({ start: now, end: date, format: ['hours', 'minutes'] });

    if (timePeriod.hasOwnProperty('days')) {
        timeAgo = `${timePeriod.days} days, ${timePeriod.hours} hours, ${timePeriod.minutes} minutes`;
    } else {
        timeAgo = `${timePeriod.hours} hours, ${timePeriod.minutes} minutes`;
    }

    console.log(timePeriod.hours)
    console.log(date)

    console.log(now)


  

  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  )
}
}