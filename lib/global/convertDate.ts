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

const DateInputFormatter = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

const TimeInputFormatter = new Intl.DateTimeFormat('en', {
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h24',
});

const regex = /(,*\s|\/)/g;

export default function convertDate(
  event: Date,
  format: 'time' | 'MonthDDYYYY' | 'key' | 'dateInput' | 'timeInput',
  delimiter: string | undefined
) {
  let converted = '';

  switch (format) {
    case 'time':
      converted = logFormatter.format(event);
      break;
    case 'MonthDDYYYY':
      converted = MDYFormatter.format(event);
      break;
    case 'key':
      converted = KeyFormatter.format(event);
      break;
    case 'dateInput':
      converted = DateInputFormatter.format(event);
      break;
    case 'timeInput':
      converted = TimeInputFormatter.format(event);
      break;
    default:
      break;
  }

  converted = converted.replaceAll(regex, delimiter || ' ');
  if (format === 'dateInput') {
    const splitted = converted.split('-');
    converted = `${splitted[2]}-${splitted[0]}-${splitted[1]}`;
  }
  return converted;
}
