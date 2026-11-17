/**
 * Minimal, dependency-free .ics generator.
 * Times are emitted in UTC so every calendar app agrees.
 */
const stamp = (date) => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')

const escapeText = (s = '') =>
  String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')

const fold = (line) => {
  // RFC 5545 line folding — keeps Outlook happy.
  const chunks = []
  let rest = line
  while (rest.length > 73) {
    chunks.push(rest.slice(0, 73))
    rest = rest.slice(73)
  }
  chunks.push(rest)
  return chunks.join('\r\n ')
}

export function eventToICS({ uid, title, description, location, startISO, hours = 4 }) {
  const start = new Date(startISO)
  const end = new Date(start.getTime() + hours * 3600000)
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Saptapadi//Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}-${start.getTime()}@saptapadi`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${escapeText(title)}`,
    `DESCRIPTION:${escapeText(description)}`,
    `LOCATION:${escapeText(location)}`,
    'BEGIN:VALARM',
    'TRIGGER:-PT2H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return lines.map(fold).join('\r\n')
}

export function downloadICS(payload, filename = 'wedding.ics') {
  const blob = new Blob([eventToICS(payload)], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 4000)
}
