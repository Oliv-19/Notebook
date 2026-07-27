PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_notebook_user` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`name` text DEFAULT '7/25/2026',
	`canvas_info` text,
	`created_at` integer DEFAULT '"2026-07-25T13:31:46.120Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2026-07-25T13:31:46.120Z"' NOT NULL,
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
	`created_at` integer DEFAULT '"2026-07-25T13:31:46.104Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2026-07-25T13:31:46.104Z"' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "email", "password_hash", "created_at", "updated_at") SELECT "id", "email", "password_hash", "created_at", "updated_at" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);