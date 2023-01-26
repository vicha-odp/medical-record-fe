import { UseQueryOptions, UseMutationOptions } from 'react-query';

type TQueryOptions = Omit<
  UseQueryOptions<any, unknown, any, any[]>,
  'queryKey' | 'queryFn'
>;
type TMutationOptions =
  | Omit<UseMutationOptions<any, unknown, any, unknown>, 'mutationFn'>
  | undefined;

type TStandardResponse = {
  message_action: string;
  message_data: {};
  message_desc: string;
  message_id: string;
  message_request_datetime: string;
};

type TSCStandardResponse = {
  messageAction: string;
  messageData: {};
  messageDesc: string;
  messageId: string;
  messageRequestDatetime: string;
};

type TStandardParams = {
  limit: number;
  page_number: number;
};

export type {
  TQueryOptions,
  TMutationOptions,
  TStandardParams,
  TStandardResponse,
  TSCStandardResponse,
};
