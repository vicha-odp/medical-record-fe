export const defaultOptionSelected: TOptionSelected = {
  id: 0,
  title: 'Admin',
};

export const defaultloginParams = {
  role: 'Admin' as TOptionSelected['title'],
  govId: '',
  password: '',
};

export const deafultLoginPersist: TLoginPersist = {
  role: 'Admin' as TOptionSelected['title'],
  govId: '',
  name: '',
  email: '',
  password: '',
  categoryName: '',
};

export type TOptionSelected = {
  id: number;
  title: 'Admin' | 'Patient' | 'Doctor';
};

export type TLoginParams = {
  role: TOptionSelected['title'];
  govId: string;
  password: any;
};

export type TLoginPersist = {
  role: TOptionSelected['title'];
  govId: string;
  name: string;
  email: string;
  password: string;
  categoryName?: 'Neurology' | 'Psychiatry' | '';
};
