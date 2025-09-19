import { uuid, pgTable, varchar, timestamp, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { Users } from "./Users";
import { VisibilityEnum } from "./VisibilityEnum";

export const Notes = pgTable(
  "notes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title", { length: 256 }).notNull(),
    content: varchar("content", { length: 512 }).notNull(),
    visibility: VisibilityEnum("visibility").notNull().default("private"),
    userId: uuid("user_id")
      .notNull()
      .references(() => Users.id),

    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("notes_user_id_idx").on(table.userId),
    index("notes_user_id_update_idx").on(table.userId, table.updatedAt),
    index("notes_user_created_idx").on(table.userId, table.createdAt),
    index("notes_user_title_idx").on(table.userId, table.title),
    index("update_visibility_idx").on(table.updatedAt, table.visibility),
  ]
);

export const noteUserRelation = relations(Notes, ({ one }) => ({
  user: one(Users, {
    fields: [Notes.userId],
    references: [Users.id],
  }),
}));

export const userNotesRelation = relations(Users, ({ many }) => ({
  notes: many(Notes),
}));
