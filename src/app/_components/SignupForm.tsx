"use client";

import { Button, Form, Input } from "@nextui-org/react";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Form>;

export default function SignupForm({ ...props }: Props) {
	return (
		<Form
			className="w-full max-w-xs flex flex-col gap-4"
			validationBehavior="native"
			{...props}
		>
			<Input
				isRequired
				errorMessage="メールアドレスの形式が正しくありません"
				label="メールアドレス"
				labelPlacement="outside"
				name="email"
				placeholder="example@example.com"
				type="email"
			/>

			<div className="flex mx-auto">
				<Button color="primary" type="submit">
					送信
				</Button>
			</div>
		</Form>
	);
}
