import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import SendGrid from "next-auth/providers/sendgrid";
import { db, sessions, users } from "./db/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: DrizzleAdapter(db, {
		// @ts-ignore
		usersTable: users,
		// @ts-ignore
		sessionsTable: sessions,
	}),
	providers: [
		SendGrid({
			from: process.env.SENDGRID_FROM as string,
		}),
	],
});
