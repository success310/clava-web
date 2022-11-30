import React from 'react';
import { ClavaContextType, ClavaRootContextType } from './types';
import { LanguageLocaleEnum, User } from '../client/api';

export const ClavaRootContext = React.createContext<ClavaRootContextType>({
  theme: 'dark',
  fbToken: '',
  initialized: false,
});
export const ClavaContext = React.createContext<ClavaContextType>({
  l: LanguageLocaleEnum.DE,
  aoi: -1,
  user: {} as User,
});
