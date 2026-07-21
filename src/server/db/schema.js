import { relations, sql } from "drizzle-orm";
import { sqliteTable, text, integer, check, primaryKey } from "drizzle-orm/sqlite-core";

export const users = sqliteTable('users', {
        id: integer('id').primaryKey(),
        email: text('email').notNull().unique(),
        passwordHash: text('password_hash').notNull(),
        createdAt: integer('created_at', { mode: "timestamp" })
            .notNull()
            .default(new Date()),
        updatedAt: integer('updated_at', { mode: "timestamp" })
            .notNull()
            .default(new Date()) 
    }, (table) => check('email', sql`${table.email} LIKE %@%.%`)
)

export const userNotebook = sqliteTable('notebook_user', {
    id: integer('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => users.id, {onDelete: 'cascade'}),
    name: text('name').default(new Date()),
})

export const userNotebookRelations = relations(userNotebook, ({ one }) => ({
  notebook: one(users, { fields: [userNotebook.userId], references: [users.id] }),
}));
