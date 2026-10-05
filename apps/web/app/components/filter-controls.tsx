"use client";

import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/cvu";

type FilterOption<T extends string> = {
	count?: number;
	label: string;
	value: T;
};

/** Segmented control: a row of options where exactly one is active. */
export const FilterTabs = <T extends string>({
	label,
	onChange,
	options,
	value,
}: {
	readonly label: string;
	readonly onChange: (value: T) => void;
	readonly options: FilterOption<T>[];
	readonly value: T;
}) => (
	<fieldset className="-mx-4 m-0 min-w-0 overflow-x-auto border-0 px-4 py-0 md:mx-0 md:px-0">
		<legend className="sr-only">{label}</legend>
		<div className="flex min-w-max gap-1 bg-arena-sunken p-1">
			{options.map((option) => {
				const active = option.value === value;
				return (
					<button
						aria-pressed={active}
						className={cn(
							"press flex h-9 items-center gap-1.5 px-3 font-heading text-base font-bold uppercase italic transition-colors",
							active
								? "-skew-x-6 bg-broadcast text-ink"
								: "text-ink-faint hover:bg-arena-raised hover:text-ink",
						)}
						key={option.value}
						onClick={() => onChange(option.value)}
						type="button"
					>
						<span className={active ? "skew-x-6" : undefined}>
							{option.label}
						</span>
						{option.count === undefined ? null : (
							<span
								className={cn(
									"font-sans text-xs font-semibold not-italic tabular-nums",
									active ? "text-ink/80" : "text-ink-ghost",
								)}
							>
								{option.count}
							</span>
						)}
					</button>
				);
			})}
		</div>
	</fieldset>
);

export const SearchField = ({
	onChange,
	placeholder,
	value,
}: {
	readonly onChange: (value: string) => void;
	readonly placeholder: string;
	readonly value: string;
}) => (
	<label className="flex h-11 items-center gap-2 bg-arena-sunken px-3 text-ink-faint transition-shadow focus-within:shadow-[inset_0_-2px_0_var(--color-cashout)] md:w-72">
		<MagnifyingGlassIcon size={18} weight="bold" />
		<span className="sr-only">{placeholder}</span>
		<input
			className="h-full min-w-0 grow bg-transparent text-base text-ink outline-none placeholder:text-ink-ghost"
			onChange={(event) => onChange(event.target.value)}
			placeholder={placeholder}
			type="search"
			value={value}
		/>
		{value ? (
			<button
				aria-label="Clear search"
				className="text-ink-faint hover:text-ink"
				onClick={() => onChange("")}
				type="button"
			>
				<XIcon size={16} weight="bold" />
			</button>
		) : null}
	</label>
);
