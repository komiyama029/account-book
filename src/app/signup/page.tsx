import SignupForm from "@/app/_components/SignupForm";

export default function SignupPage() {
	return (
		<div className="max-w-sm mx-auto my-20">
			<h1 className="text-center text-xl font-bold mb-8">新規登録</h1>
			<div className="flex justify-center">
				<SignupForm />
			</div>
		</div>
	);
}
