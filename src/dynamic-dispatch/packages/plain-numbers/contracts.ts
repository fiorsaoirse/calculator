import { ITaggedEntity } from '../tag';

export const PLAIN_NUMBER = 'plain-number';

export interface IPlainType extends ITaggedEntity<typeof PLAIN_NUMBER> {
    tag: typeof PLAIN_NUMBER;
    content: number
};