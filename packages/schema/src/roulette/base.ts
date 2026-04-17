export type BaseItemType<TIdType extends string> = {
	description?: string;
	disabled?: boolean;
	id: TIdType;
	label?: string;
};

export type ClassType = "heavy" | "light" | "medium";

export type Settings = {
	disabledEquipmentIds: string[];
	showEquipmentDescriptions: boolean;
};
