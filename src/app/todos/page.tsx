import { auth } from "@/auth";
import { db, todos as todoTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import Todos from "../_components/Todos";

export default async function TodosPage() {
	const session = await auth();

	const getTodos = async () => {
		const userId = session?.user?.id;
		if (!userId) return [];

		return await db
			.select({
				id: todoTable.id,
				title: todoTable.title,
				isDone: todoTable.isDone,
			})
			.from(todoTable)
			.where(eq(todoTable.userId, Number(userId)));
	};

	const todos = await getTodos();

	return (
		<div className="m-20">
			<Todos data={todos} />
		</div>
	);
}
