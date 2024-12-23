import { createClient } from "@libsql/client";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";
import {
	integer,
	primaryKey,
	sqliteTable,
	text,
} from "drizzle-orm/sqlite-core";

const client = createClient({
	url: process.env.TURSO_DATABASE_URL as string,
	authToken: process.env.TURSO_AUTH_TOKEN,
});
export const db = drizzle(client);

export const users = sqliteTable(
	"users",
	{
		id: integer("id").primaryKey(),
		uid: text("uid").notNull().unique(),
		email: text("email").notNull().unique(),
		created_at: text("created_at").notNull().default(sql`(current_timestamp)`),
	},
	() => [],
);

export const verificationTokens = sqliteTable(
	"verificationToken",
	{
		identifier: text("identifier").notNull(),
		token: text("token").notNull(),
		expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
	},
	(t) => [
		primaryKey({
			columns: [t.identifier, t.token],
		}),
	],
);
