import {
  defaultloginParams,
  defaultOptionSelected,
  deafultLoginPersist,
  TLoginParams,
  TOptionSelected,
  TLoginPersist,
} from '../types/login';
import { create, StateCreator } from 'zustand';
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware';

type TLoginStore = {
  optionSelected: TOptionSelected;
  loginParams: TLoginParams;
  setOptionSelected: (value: TOptionSelected) => void;
  setLoginParams: (value: TLoginParams) => void;
};

type TLoginPersistStore = {
  authData: TLoginPersist;
  isAuthenticated: boolean;
  setAuthData: (value: TLoginPersist) => void;
  setIsAuthenticated: (value: boolean) => void;
};

type TPersist = (
  config: StateCreator<TLoginPersistStore>,
  options: PersistOptions<TLoginPersistStore>
) => StateCreator<TLoginPersistStore>;

const login: StateCreator<TLoginStore> = (set, get, api) => ({
  optionSelected: defaultOptionSelected,
  loginParams: defaultloginParams,
  setOptionSelected: (value: TOptionSelected) =>
    set(() => ({
      optionSelected: value,
    })),
  setLoginParams: (value: TLoginParams) =>
    set(() => ({
      loginParams: value,
    })),
});

const loginPersist = (persist as TPersist)(
  (set, get) => ({
    authData: deafultLoginPersist,
    isAuthenticated: false,
    setAuthData: (value: TLoginPersist) =>
      set(() => ({
        authData: value,
      })),
    setIsAuthenticated: (value: boolean) =>
      set(() => ({ isAuthenticated: value })),
  }),
  {
    name: 'AuthStorage',
    storage: createJSONStorage(() => sessionStorage),
  }
);

const useLoginStore = create<TLoginStore>(login);
const useLoginPersistStore = create<TLoginPersistStore>(loginPersist);

export default { useLoginStore, useLoginPersistStore };
