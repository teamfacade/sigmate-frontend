const logFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZoneName: 'short',
  hourCycle: 'h24',
});

const MDYFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: '2-digit',
  year: 'numeric',
});

const KeyFormatter = new Intl.DateTimeFormat('en', {
  month: '2-digit',
  day: '2-digit',
  year: 'numeric',
});

const regex = /(,*\s|\/)/g;

export default function convertDate(
  event: Date,
  format: 'time' | 'MMDDYYYY' | 'key',
  delimiter: string | undefined
) {
  let converted = '';

  switch (format) {
    case 'time':
      converted = logFormatter.format(event);
      break;
    case 'MMDDYYYY':
      converted = MDYFormatter.format(event);
      break;
    case 'key':
      converted = KeyFormatter.format(event);
      break;
    default:
      break;
  }

  converted = converted.replaceAll(regex, delimiter || ' ');
  return converted;
}
