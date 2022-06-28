import { TaggedEntity } from '../tag';

export const PLAIN_NUMBER = 'plain-number';

export type PlainType = TaggedEntity<typeof PLAIN_NUMBER, number>;