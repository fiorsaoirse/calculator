import { TaggedEntity } from '../tag';

export const RATIONAL_NUMBER = 'rational-number';

export interface IRationalNumber {
    numer: number;
    denom: number;
}

export type RationalType = TaggedEntity<typeof RATIONAL_NUMBER, IRationalNumber>;