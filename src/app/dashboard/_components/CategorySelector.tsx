'use client'

import { type Category } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '@/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'

import CreateCategoryDialog from './CreateCategoryDialog'

import type { TransactionType } from '@/lib/types'
import { cn } from '@/lib/utils'

interface CategorySelectorProps {
	type: TransactionType
	onChange: (value: string) => void
}

export default function CategorySelector({
	type,
	onChange
}: CategorySelectorProps) {
	const [open, setOpen] = useState(false)
	const [value, setValue] = useState('')

	useEffect(() => {
		if (!value) return
		onChange(value)
	}, [onChange, value])

	const categoriesQuery = useQuery<Category[]>({
		queryKey: ['categories', type],
		queryFn: () =>
			fetch(`/api/categories?type=${type}`).then((res) => res.json())
	})

	const selectedCategory = categoriesQuery.data?.find(
		(category: Category) => category.name === value
	)

	const successCallback = useCallback(
		(category: Category) => {
			setValue(category.name)
			setOpen((prev) => !prev)
		},
		[setValue, setOpen]
	)

	return (
		<Popover
			open={open}
			onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					role='combobox'
					aria-expanded={open}
					className='w-[200px] justify-between'>
					{selectedCategory ? (
						<CategoryRow category={selectedCategory} />
					) : (
						'Select a category'
					)}
					<ChevronDownIcon className='ml-2 size-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[200px] p-0'>
				<Command
					onSubmit={(e) => {
						e.preventDefault()
					}}>
					<CommandInput placeholder='Search category...' />
					<CreateCategoryDialog
						successCallback={successCallback}
						type={type}
					/>
					<CommandEmpty>
						<p>No categories found</p>
						<p className='text-xs text-muted-foreground'>
							Tip: Create a new category
						</p>
					</CommandEmpty>
					<CommandGroup>
						<CommandList>
							{categoriesQuery.data?.map((category: Category) => (
								<CommandItem
									key={category.name}
									onSelect={() => {
										setValue(category.name)
										setOpen((prev) => !prev)
									}}
									className='justify-between'>
									<CategoryRow category={category} />
									<CheckIcon
										className={cn(
											'size-4 opacity-0',
											value === category.name && 'opacity-100'
										)}
									/>
								</CommandItem>
							))}
						</CommandList>
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

function CategoryRow({ category }: { category: Category }) {
	return (
		<div className='flex items-center gap-2'>
			<span
				role='img'
				aria-label='category'>
				{category.icon}
			</span>
			<span>{category.name}</span>
		</div>
	)
}
