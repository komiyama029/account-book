"use server";

import { auth } from "@/auth";
import { db, todos } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const updateTodo = async (id: number, isDone: boolean) => {
	const session = await auth();
	const userId = Number(session?.user?.id);

	await db
		.update(todos)
		.set({ isDone })
		.where(and(eq(todos.id, id), eq(todos.userId, userId)));
};
