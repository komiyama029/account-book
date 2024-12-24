import { auth, signOut } from "@/auth";
import { db, todos } from "@/db/schema";
import { Button } from "@nextui-org/react";
import { TodoInputForm } from "./_components/TodoInputForm";

export default async function Home() {
	const session = await auth();

	if (!session) {
		return <div>loading...</div>;
	}

	const createTodo = async (formData: FormData) => {
		"use server";
		try {
			await db.insert(todos).values({
				title: formData.get("title") as string,
				userId: Number(session?.user?.id) ?? 0,
				isDone: false,
			});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="m-20">
			<div className="flex justify-end">
				<form
					action={async () => {
						"use server";
						await signOut();
					}}
				>
					<Button type="submit" variant="bordered">
						ログアウト
					</Button>
				</form>
			</div>

			<TodoInputForm action={createTodo} />

			<Button variant="light" href="/list" className="flex mx-auto underline">
				一覧へ
			</Button>
		</div>
	);
}
