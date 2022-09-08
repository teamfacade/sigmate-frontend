import axios from 'axios';

type RenewResultResultsType = 'Renewing' | 'Success' | 'Fail' | 'SignOutNeeded';

type RenewResultType = {
  result: RenewResultResultsType;
  accessToken?: string;
  refreshToken?: string;
};

const Axios = axios.create({
  baseURL: 'http://api.sigmate.io:5100',
});

let renewingAccess = false;
let renewingRefresh = false;

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
    .catch((err) => {
      if (err.response.status === 401) return RenewRefreshToken(config);
      throw new Error(err.response.status);
    })
    .finally(() => {
      renewingAccess = false;
    });
};

const RenewRefreshToken: (config: any) => Promise<RenewResultType> = async (
  config
) => {
  if (renewingRefresh) return { result: 'Renewing' as RenewResultResultsType };

  renewingRefresh = true;
  return Axios.post('/auth/token/renew/refresh', config)
    .then((res) => ({
      result: 'Success' as RenewResultResultsType,
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken,
    }))
    .catch(() => {
      return {
        result: 'SignOutNeeded' as RenewResultResultsType,
      };
    })
    .finally(() => {
      renewingRefresh = false;
    });
};

export default Axios;
