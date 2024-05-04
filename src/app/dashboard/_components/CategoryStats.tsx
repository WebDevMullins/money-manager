'use client'

import type { UserSettings } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import type { GetCategoryStatsResponseType } from '@/app/api/stats/category/route'

import SkeletonWrapper from '@/components/SkeletonWrapper'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'

import { DateToUTC, GetFormattedCurrency } from '@/lib/helpers'
import { type TransactionType } from '@/lib/types'

interface CategoryStatsProps {
	userSettings: UserSettings
	from: Date
	to: Date
}

export default function CategoryStats({
	userSettings,
	from,
	to
}: CategoryStatsProps) {
	const statsQuery = useQuery<GetCategoryStatsResponseType>({
		queryKey: ['overview', 'stats', 'category', from, to],
		queryFn: () =>
			fetch(
				// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
				`/api/stats/category?from=${DateToUTC(from)}&to=${DateToUTC(to)}`
			).then((res) => res.json())
	})

	const formattedCurrency = useMemo(() => {
		return GetFormattedCurrency(userSettings.currency)
	}, [userSettings.currency])

	return (
		<div className='relative flex w-full flex-wrap gap-2 md:flex-nowrap'>
			<SkeletonWrapper isLoading={statsQuery.isFetching}>
				<CategoryCard
					formatter={formattedCurrency}
					type='income'
					data={statsQuery.data ?? []}
				/>
			</SkeletonWrapper>
			<SkeletonWrapper isLoading={statsQuery.isFetching}>
				<CategoryCard
					formatter={formattedCurrency}
					type='expense'
					data={statsQuery.data ?? []}
				/>
			</SkeletonWrapper>
		</div>
	)
}

function CategoryCard({
	formatter,
	type,
	data
}: {
	formatter: Intl.NumberFormat
	type: TransactionType
	data: GetCategoryStatsResponseType
}) {
	// const formatFn = useCallback(
	// 	(value: number) => {
	// 		return formatter.format(value)
	// 	},
	// 	[formatter]
	// )

	const filteredData = data.filter((d) => d.type === type)
	const total = filteredData.reduce(
		(acc, curr) => acc + (curr._sum.amount ?? 0),
		0
	)

	return (
		<Card className='col-span-6 h-80 w-full'>
			<CardHeader>
				<CardTitle className='grid grid-flow-row justify-between gap-2 text-muted-foreground md:grid-flow-col'>
					{type === 'income' ? 'Income' : 'Expense'} by Category
				</CardTitle>
			</CardHeader>
			<div className='flex items-center justify-between gap-2'>
				{filteredData.length === 0 && (
					<div className='flex h-60 w-full flex-col items-center justify-center gap-2'>
						No data found for the selected date range
						<p className='text-pretty text-sm text-muted-foreground'>
							Try selecting a different date range or try adding new{' '}
							{type === 'income' ? 'income' : 'expense'} transactions
						</p>
					</div>
				)}

				{filteredData.length > 0 && (
					<ScrollArea className='h-60 w-full px-4'>
						<div className='flex w-full flex-col gap-4 p-4'>
							{filteredData.map((item) => {
								const amount = item._sum.amount ?? 0
								const percentage = (amount * 100) / (total ?? amount)

								return (
									<div
										key={item.category}
										className='flex flex-col gap-2'>
										<div className='flex items-center justify-between'>
											<span className='flex items-center text-gray-400'>
												{item.categoryIcon} {item.category}
												<span className='ml-2 text-xs text-muted-foreground'>
													({percentage.toFixed(0)}%)
												</span>
											</span>
											<span className='text-sm text-gray-400'>
												{formatter.format(amount)}
											</span>
										</div>

										<Progress
											value={percentage}
											indicator={
												type === 'income' ? 'bg-emerald-500' : 'bg-red-500'
											}></Progress>
									</div>
								)
							})}
						</div>
					</ScrollArea>
				)}
			</div>
		</Card>
	)
}
