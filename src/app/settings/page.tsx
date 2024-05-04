'use client'

import type { Category } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import {
	PlusIcon,
	Trash2Icon,
	TrendingDownIcon,
	TrendingUpIcon
} from 'lucide-react'

import { CurrencySelector } from '@/components/CurrencySelector'
import SkeletonWrapper from '@/components/SkeletonWrapper'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'

import CreateCategoryDialog from '../dashboard/_components/CreateCategoryDialog'

import { Separator } from '@/components/ui/separator'
import { type TransactionType } from '@/lib/types'
import { cn } from '@/lib/utils'
import DeleteCategoryDialog from '../dashboard/_components/DeleteCategoryDialog'

export default function SettingsPage() {
	return (
		<>
			<div className='border-b bg-card'>
				<div className='container flex flex-wrap items-center justify-between gap-6 py-8'>
					<div>
						<h1 className='text-3xl font-bold'>Settings</h1>
						<p className='text-muted-foreground'>
							Manage your account settings
						</p>
					</div>
				</div>
			</div>
			<div className='container flex flex-col gap-4 p-4'>
				<Card>
					<CardHeader>
						<CardTitle>Currency</CardTitle>
						<CardDescription>Set your preferred currency</CardDescription>
					</CardHeader>
					<CardContent>
						<CurrencySelector />
					</CardContent>
				</Card>
				<CategoryList type='income' />
				<CategoryList type='expense' />
			</div>
		</>
	)
}

function CategoryList({ type }: { type: TransactionType }) {
	const categoriesQuery = useQuery<Category[]>({
		queryKey: ['categories', type],
		queryFn: () =>
			fetch(`/api/categories?type=${type}`).then((res) => res.json())
	})

	const dataAvailable = categoriesQuery.data && categoriesQuery.data.length > 0

	return (
		<SkeletonWrapper isLoading={categoriesQuery.isLoading}>
			<Card>
				<CardHeader>
					<CardTitle className='flex items-center justify-between gap-2'>
						<div className='flex items-center gap-4'>
							{type === 'income' ? (
								<TrendingDownIcon className='size-12 items-center rounded-lg bg-emerald-400/10 p-1 text-emerald-500' />
							) : (
								<TrendingUpIcon className='size-12 items-center rounded-lg bg-red-400/10 p-1 text-red-500' />
							)}
							<div className='flex flex-col gap-1'>
								<p>{type === 'income' ? 'Income' : 'Expense'} Categories</p>
								<p className='text-sm text-muted-foreground'>Sorted by name</p>
							</div>
						</div>

						<CreateCategoryDialog
							type={type}
							successCallback={() => categoriesQuery.refetch()}
							trigger={
								<Button
									variant={'outline'}
									className='gap-2 text-sm'>
									<PlusIcon className='size-4' />
									Create Category
								</Button>
							}
						/>
					</CardTitle>
				</CardHeader>
				<Separator />
				{!dataAvailable && (
					<div className='flex h-40 w-full flex-col items-center justify-center'>
						<p>
							No{' '}
							<span
								className={cn(
									'm-1',
									type === 'income' ? 'text-emerald-500' : 'text-red-500'
								)}>
								{type}
							</span>
							categories found
						</p>
						<p className='text-sm text-muted-foreground'>
							Create a new category
						</p>
					</div>
				)}
				{dataAvailable && (
					<div className='grid grid-flow-row gap-2 p-2 sm:grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
						{categoriesQuery.data.map((category: Category) => (
							<CategoryCard
								category={category}
								key={category.name}
							/>
						))}
					</div>
				)}
			</Card>
		</SkeletonWrapper>
	)
}

function CategoryCard({ category }: { category: Category }) {
	return (
		<div className='flex border-separate flex-col justify-between rounded-md border shadow-md shadow-black/[0.1] dark:shadow-white/[0.1]'>
			<div className='flex flex-col items-center gap-2 p-4'>
				<span
					className='text-3xl'
					role='img'>
					{category.icon}
				</span>
				<span>{category.name}</span>
			</div>
			<DeleteCategoryDialog
				category={category}
				trigger={
					<Button
						className='flex w-full border-separate items-center gap-2 rounded-t-none text-muted-foreground hover:text-red-500'
						variant={'secondary'}>
						<Trash2Icon className='size-4' />
						Delete
					</Button>
				}
			/>
		</div>
	)
}
