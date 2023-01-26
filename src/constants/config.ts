const BASE_URL = 'http://localhost:5000';

type ConfigType = {
  apiBaseUrl: string;
};

export const Config: ConfigType | any = {
  apiBaseUrl: BASE_URL || '',
};
