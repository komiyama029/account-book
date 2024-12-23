import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import {
	integer,
	primaryKey,
	sqliteTable,
	text,
} from "drizzle-orm/sqlite-core";

const client = createClient({
	url: process.env.DATABASE_URL as string,
	authToken: process.env.DATABASE_AUTH_TOKEN,
});
export const db = drizzle(client);

export const users = sqliteTable("user", {
	id: integer("id").primaryKey(),
	uid: text("uid").$defaultFn(() => crypto.randomUUID()),
	name: text("name"),
	email: text("email").unique(),
	emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
	image: text("image"),
});

export const sessions = sqliteTable("session", {
	sessionToken: text("sessionToken").primaryKey(),
	userId: integer("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
});

export const verificationTokens = sqliteTable(
	"verificationToken",
	{
		identifier: text("identifier").notNull(),
		token: text("token").notNull(),
		expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
	},
	(verificationToken) => ({
		compositePk: primaryKey({
			columns: [verificationToken.identifier, verificationToken.token],
		}),
	}),
);
