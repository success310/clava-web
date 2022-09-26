/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CardTypeEnum } from './CardTypeEnum';
import type { Translation } from './Translation';

export type CardType = {
    id: number;
    translation: Translation;
    key: CardTypeEnum;
};
