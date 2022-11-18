import { DateTime } from 'luxon';

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
  hourCycle: 'h23',
});

const regex = /(,*\s|\/)/g;

export default function convertDate(
  event: Date,
  format:
    | 'time'
    | 'MonthDDYYYY'
    | 'key'
    | 'dateInput'
    | 'timeInput'
    | 'MonthYear',
  delimiter?: string
) {
  let converted = '';

  switch (format) {
    case 'time':
      converted = logFormatter.format(event);
      break;
    case 'MonthYear':
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
    const split = converted.split('-');
    converted = `${split[2]}-${split[0]}-${split[1]}`;
  } else if (format === 'timeInput') {
    [converted] = converted.split(' ');
  } else if (format === 'MonthYear') {
    const split = converted.split('.');
    converted = `${split[0]}.01.${split[2]}`;
  }
  return converted;
}

function changeToUTCinMilli(date: Date) {
  let dT = DateTime.fromJSDate(date);
  dT = dT.setZone('utc', { keepLocalTime: true });
  return dT.toMillis();
}

export { changeToUTCinMilli };
