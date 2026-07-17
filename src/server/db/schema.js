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