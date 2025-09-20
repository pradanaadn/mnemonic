import {
  uuid,
  pgTable,
  timestamp,
  index,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { Notes } from './Notes';
import { Tags } from './Tags';

export const NoteTags = pgTable(
  'notes_tags',
  {
    noteId: uuid('note_id')
      .notNull()
      .references(() => Notes.id),
    tagId: uuid('tag_id')
      .notNull()
      .references(() => Tags.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => [
    primaryKey({ columns: [table.noteId, table.tagId] }),
    index('note_tags_note_idx').on(table.noteId),
    index('note_tags_tag_idx').on(table.tagId),
  ],
);

export const noteTagsToNotesRelation = relations(NoteTags, ({ one }) => ({
  note: one(Notes, {
    fields: [NoteTags.noteId],
    references: [Notes.id],
  }),
  tag: one(Tags, {
    fields: [NoteTags.tagId],
    references: [Tags.id],
  }),
}));

export const notesToTagsRelation = relations(Notes, ({ many }) => ({
  noteTags: many(NoteTags),
}));

export const tagsToNotesRelation = relations(Tags, ({ many }) => ({
  noteTags: many(NoteTags),
}));
