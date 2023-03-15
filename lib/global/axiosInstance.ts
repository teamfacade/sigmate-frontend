import axios from 'axios';

type RenewResultResultsType = 'Renewing' | 'Success' | 'Fail' | 'SignOutNeeded';

type RenewResultType = {
  result: RenewResultResultsType;
  accessToken?: string;
  refreshToken?: string;
};

const Axios = axios.create({
  // baseURL: 'http://api.sigmate.io/api/v1',
  baseURL: `${
    process.env.NODE_ENV === 'production'
      ? 'https://api.sigmate.io'
      : 'http://localhost:5100'
  }/api/v1`,
});

let renewingAccess = false;

export const RenewAccessToken: (
  refreshToken: string,
  config: any
) => Promise<RenewResultType> = async (refreshToken: string, config: any) => {
  if (renewingAccess) {
    return { result: 'Renewing' as RenewResultResultsType };
  }
  renewingAccess = true;
  return Axios.post('/auth/token/renew/access', {
    refreshToken,
  })
    .then((res) => ({
      result: 'Success' as RenewResultResultsType,
      accessToken: res.data.accessToken,
    }))
    .catch(() => {
      return {
        result: 'SignOutNeeded' as RenewResultResultsType,
      };
    })
    .finally(() => {
      renewingAccess = false;
    });
};

export default Axios;
