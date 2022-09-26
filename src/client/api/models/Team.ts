/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { File } from './File';
import type { LeagueListElement } from './LeagueListElement';
import type { Location } from './Location';
import type { Person } from './Person';
import type { Sponsor } from './Sponsor';
import type { Translation } from './Translation';

export type Team = {
    id: number;
    name: Translation;
    thumb: File;
    leagues: Array<LeagueListElement>;
    leader?: Person;
    titles: Array<Translation>;
    sponsors: Array<Sponsor>;
    photo?: File;
    president: string;
    foundingYear: string;
    phone: string;
    mail: string;
    locations: Array<Location>;
};
