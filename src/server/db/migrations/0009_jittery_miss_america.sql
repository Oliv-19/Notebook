CREATE TABLE `notebook_files` (
	`id` integer PRIMARY KEY NOT NULL,
	`notebook_id` integer NOT NULL,
	`pdf_url` text,
	`created_at` integer DEFAULT '"2026-08-01T11:40:17.537Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2026-08-01T11:40:17.538Z"' NOT NULL,
	FOREIGN KEY (`notebook_id`) REFERENCES `notebook_user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_notebook_user` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`name` text DEFAULT '8/1/2026',
	`canvas_info` text,
	`created_at` integer DEFAULT '"2026-08-01T11:40:17.537Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2026-08-01T11:40:17.537Z"' NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_notebook_user`("id", "user_id", "name", "canvas_info", "created_at", "updated_at") SELECT "id", "user_id", "name", "canvas_info", "created_at", "updated_at" FROM `notebook_user`;--> statement-breakpoint
DROP TABLE `notebook_user`;--> statement-breakpoint
ALTER TABLE `__new_notebook_user` RENAME TO `notebook_user`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`created_at` integer DEFAULT '"2026-08-01T11:40:17.507Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2026-08-01T11:40:17.507Z"' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "email", "password_hash", "created_at", "updated_at") SELECT "id", "email", "password_hash", "created_at", "updated_at" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);