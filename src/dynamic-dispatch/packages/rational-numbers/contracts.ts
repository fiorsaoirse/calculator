import { ITaggedEntity } from '../tag';

export const RATIONAL_NUMBER = 'rational-number';

export interface IRationalNumber {
    numer: number;
    denom: number;
}

export type RationalType = ITaggedEntity<typeof RATIONAL_NUMBER, IRationalNumber>;