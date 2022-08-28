const CheckUsername = (username: string) => {
  if (username === '') return false;
  return true;
};

const CheckRefcode = (code: string) => {
  if (code === '') return false;
  return true;
};

export { CheckUsername, CheckRefcode };
