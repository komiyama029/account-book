import { signOut } from "@/auth";

export default async function Home() {
	return (
		<div>
			<form
				action={async () => {
					"use server";
					await signOut();
				}}
			>
				<button type="submit">Sign Out</button>
			</form>
		</div>
	);
}
