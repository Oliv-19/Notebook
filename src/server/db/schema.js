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
    name: text('name').default(new Date().toLocaleDateString()),
    canvasInfo: text('canvas_info'),
    createdAt: integer('created_at', { mode: "timestamp" })
        .notNull()
        .default(new Date()),
    updatedAt: integer('updated_at', { mode: "timestamp" })
        .notNull()
        .default(new Date()) 
})

export const notebookFiles = sqliteTable('notebook_files', {
    id: integer('id').primaryKey(),
    notebookId: integer('notebook_id').notNull().references(()=> userNotebook.id, {onDelete:'cascade'}),
    pdfUrl: text('pdf_url'),
    createdAt: integer('created_at', { mode: "timestamp" })
        .notNull()
        .default(new Date()),
    updatedAt: integer('updated_at', { mode: "timestamp" })
        .notNull()
        .default(new Date()) 
})

export const userNotebookRelations = relations(userNotebook, ({ one }) => ({
  notebook: one(users, { fields: [userNotebook.userId], references: [users.id] }),
  file: one(notebookFiles, {
    fields: [userNotebook.id],
    references: [notebookFiles.notebookId]
  })
}));

export const notebookFilesRelations = relations(notebookFiles, ({ one }) => ({
  notebook: one(userNotebook, { 
    fields: [notebookFiles.notebookId], 
    references: [userNotebook.id] 
    }),
}));