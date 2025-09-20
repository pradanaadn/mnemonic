import { pgEnum } from 'drizzle-orm/pg-core';

export const VisibilityEnum = pgEnum('visibility', ['public', 'private']);
