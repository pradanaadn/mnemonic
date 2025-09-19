import { uuid, pgTable, varchar, timestamp, index } from "drizzle-orm/pg-core";
import { Roles } from "./Role";
export const Users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 256 }).notNull(),
    username: varchar("username", { length: 256 }).notNull().unique(),
    password: varchar("password", { length: 512 }).notNull(),
    roleId: uuid("role_id").notNull().references(() => Roles.id),

    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [index("users_username_idx").on(table.username)]
);
