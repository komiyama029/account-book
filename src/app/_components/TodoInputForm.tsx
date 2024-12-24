"use client";

import { Button, Form, Input } from "@nextui-org/react";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Form>;

export const TodoInputForm = ({ ...props }: Props) => {
	return (
		<div className="max-w-xs mx-auto">
			<Form
				className="w-full flex flex-col gap-4"
				validationBehavior="native"
				{...props}
			>
				<Input
					isRequired
					label="タイトル"
					labelPlacement="outside"
					name="title"
					type="text"
				/>
				<div className="flex mx-auto">
					<Button color="primary" type="submit">
						登録
					</Button>
				</div>
			</Form>
		</div>
	);
};
