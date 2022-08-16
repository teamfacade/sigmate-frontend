const logFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZoneName: 'short',
  hourCycle: 'h24',
});

const regex = /,*\s/g;

export default function convertDate(
  event: Date,
  format: string,
  delimeter: string | undefined
) {
  let converted = '';

  switch (format) {
    case 'log':
      converted = logFormatter.format(event);
      break;
    default:
      break;
  }

  converted = converted.replaceAll(regex, delimeter || ' ');
  return converted;
}
