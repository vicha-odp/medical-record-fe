import axios from 'axios';
import { Config } from '../constants/config';
import { isEmpty } from './general';

type TClientOptions = {
  params: Object;
  method: string;
  body: any;
  headers: any;
};

const defaultOptions = {
  params: {},
  method: 'GET',
  body: null,
  headers: {},
};

const client =
  (url: string, options: Partial<TClientOptions> = defaultOptions) =>
  async () => {
    const { params, method, body, headers } = options;

    const newOptions: any = {
      method,
    };

    let data = null;

    if (!isEmpty(params)) {
      newOptions.params = params;
    }

    if (!isEmpty(body)) {
      newOptions.data = body;
    }

    if (!isEmpty(headers)) {
      newOptions.headers = {
        ...newOptions.headers,
        ...headers,
      };
    }

    try {
      const res = await axios({
        url: `${Config.apiBaseUrl}${url}`,
        ...newOptions,
      });
      data = res;
    } catch (error) {
      throw error;
    }

    return data;
  };

export default client;
