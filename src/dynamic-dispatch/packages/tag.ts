export type Tag<T> = T extends string ? T : never;
export type Content = any;

export interface ITaggedEntity<T> {
    tag: Tag<T>;
    content: Content
};

const isTaggedEntity = (value: unknown): value is ITaggedEntity<any> => {
    return !!(value as ITaggedEntity<any>).tag;
}

export const attachTag = <T extends string>(tag: Tag<T>, content: Content): ITaggedEntity<T> => {
    return { tag, content };
}

export const getTag = <T extends string>(taggedEntity: ITaggedEntity<T>): string => {
    if (isTaggedEntity(taggedEntity)) {
        return taggedEntity.tag;
    }

    throw new Error(`Wrong tagged data: ${JSON.stringify(taggedEntity)}`);
}

export const getContent = <T>(taggedEntity: ITaggedEntity<T>): Content => {
    if (isTaggedEntity(taggedEntity)) {
        return taggedEntity.content;
    }

    throw new Error(`Wrong tagged data: ${JSON.stringify(taggedEntity)}`);
}