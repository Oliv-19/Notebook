CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`created_at` integer DEFAULT '"2026-07-17T20:58:49.683Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2026-07-17T20:58:49.683Z"' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);