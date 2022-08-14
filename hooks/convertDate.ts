export default function convertDate(date: Date) {
  let converted = '';

  converted += `${date.getMonth()  }.`;
  converted += `${date.getDate()  }.`;
  converted += date.getFullYear();

  return converted;
}
