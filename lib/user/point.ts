import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function getPointLogs() {
  const { data, error } = useSWR('/point', fetcher);
  return data;
}
