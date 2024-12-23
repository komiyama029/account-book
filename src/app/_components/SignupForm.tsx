"use client";

import { Button, Form, Input } from "@nextui-org/react";

export default function SignupForm() {
	return (
		<Form
			className="w-full max-w-xs flex flex-col gap-4"
			validationBehavior="native"
		>
			<Input
				isRequired
				errorMessage="Please enter a valid email"
				label="メールアドレス"
				labelPlacement="outside"
				name="email"
				placeholder="Enter your email"
				type="email"
			/>

			<div className="flex mx-auto">
				<Button color="primary" type="submit">
					Submit
				</Button>
			</div>
		</Form>
	);
}
