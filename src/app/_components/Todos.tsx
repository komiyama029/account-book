"use client";

import { updateTodo } from "@/actions/crud";
import { Listbox, ListboxItem } from "@nextui-org/react";
import type React from "react";
import { useState } from "react";

export const ListboxWrapper = ({ children }: { children: React.ReactNode }) => (
	<div className="w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
		{children}
	</div>
);

type Props = {
	data: {
		id: number;
		title: string | null;
		isDone: boolean | null;
	}[];
};

export default function Todos({ data }: Props) {
	const [selectedKeys, setSelectedKeys] = useState<Set<number>>(
		new Set(data.filter((d) => d.isDone).map((d) => d.id)),
	);

	const onSelectionChange = async (newSelectedKeys: Set<number>) => {
		// 差分を検出して更新
		const addedKeys = [...newSelectedKeys].filter(
			(key) => !selectedKeys.has(key),
		);
		const removedKeys = [...selectedKeys].filter(
			(key) => !newSelectedKeys.has(key),
		);

		// サーバーに状態を更新
		await Promise.all([
			...addedKeys.map((id) => updateTodo(id, true)),
			...removedKeys.map((id) => updateTodo(id, false)),
		]);

		// 状態を更新
		setSelectedKeys(newSelectedKeys);
	};

	return (
		<div className="flex flex-col gap-2">
			<ListboxWrapper>
				<Listbox
					disallowEmptySelection
					aria-label="Multiple selection example"
					selectedKeys={selectedKeys}
					selectionMode="multiple"
					variant="flat"
					onSelectionChange={(keys) => onSelectionChange(keys as Set<number>)}
				>
					{data.map((d) => (
						<ListboxItem key={d.id}>{d.title}</ListboxItem>
					))}
				</Listbox>
			</ListboxWrapper>
		</div>
	);
}
