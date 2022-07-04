export type TaggedEntity<Tag extends string, Content> = { tag: Tag, content: Content };

const isTaggedEntity = (value: unknown): value is TaggedEntity<string, any> => {
    return !!(value as TaggedEntity<string, any>).tag;
}

export const attachTag = <Tag extends string, Content>
    (tag: Tag, content: Content): TaggedEntity<Tag, Content> => {
    return { tag, content };
}

export const getTag = <Tag extends string, Content>
    (taggedEntity: TaggedEntity<Tag, Content>): string => {
    if (isTaggedEntity(taggedEntity)) {
        return taggedEntity.tag;
    }

    throw new Error(`Wrong tagged data: ${JSON.stringify(taggedEntity)}`);
}

export const getContent = <Tag extends string, Content>
    (taggedEntity: TaggedEntity<Tag, Content>): Content => {
    if (isTaggedEntity(taggedEntity)) {
        return taggedEntity.content;
    }

    throw new Error(`Wrong tagged data: ${JSON.stringify(taggedEntity)}`);
}