import React from 'react';
import { LanguageLocaleEnum } from '../client/api';
import { ClavaRootContextType } from './types';

export const ClavaRootContext = React.createContext<ClavaRootContextType>({
  l: LanguageLocaleEnum.DE,
  aoi: -1,
  theme: 'dark',
  fbToken: '',
});
