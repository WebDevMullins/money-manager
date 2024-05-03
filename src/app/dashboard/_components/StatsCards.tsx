'use client'

import type { UserSettings } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'
import CountUp from 'react-countup'

import type { GetBalanceStatsResponseType } from '@/app/api/stats/balance/route'
import SkeletonWrapper from '@/components/SkeletonWrapper'
import { Card } from '@/components/ui/card'
import { DateToUTC, GetFormattedCurrency } from '@/lib/helpers'
import { TrendingDownIcon, TrendingUpIcon, WalletIcon } from 'lucide-react'

interface StatsCardsProps {
	userSettings: UserSettings
	from: Date
	to: Date
}

export default function StatsCards({
	userSettings,
	from,
	to
}: StatsCardsProps) {
	const statsQuery = useQuery<GetBalanceStatsResponseType>({
		queryKey: ['overview', 'stats', from, to],
		queryFn: () =>
			fetch(
				// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
				`/api/stats/balance?from=${DateToUTC(from)}&to=${DateToUTC(to)}`
			).then((res) => res.json())
	})

	const formattedCurrency = useMemo(() => {
		return GetFormattedCurrency(userSettings.currency)
	}, [userSettings.currency])

	const income = statsQuery.data?.income ?? 0
	const expense = statsQuery.data?.expense ?? 0

	const balance = income - expense

	return (
		<div className='relative flex w-full flex-wrap gap-2 md:flex-nowrap'>
			<SkeletonWrapper isLoading={statsQuery.isFetching}>
				<StatsCard
					formatter={formattedCurrency}
					value={income}
					title='Income'
					icon={
						<TrendingUpIcon className='size-12 items-center rounded-lg bg-emerald-400/10 p-2 text-emerald-500' />
					}
				/>

				<StatsCard
					formatter={formattedCurrency}
					value={expense}
					title='Expense'
					icon={
						<TrendingDownIcon className='size-12 items-center rounded-lg bg-red-400/10 p-2 text-red-500' />
					}
				/>

				<StatsCard
					formatter={formattedCurrency}
					value={balance}
					title='Balance'
					icon={
						<WalletIcon className='size-12 items-center rounded-lg bg-sky-400/10 p-2 text-sky-500' />
					}
				/>
			</SkeletonWrapper>
		</div>
	)
}

function StatsCard({
	formatter,
	value,
	title,
	icon
}: {
	formatter: Intl.NumberFormat
	value: number
	title: string
	icon: React.ReactNode
}) {
	const formatFn = useCallback(
		(value: number) => {
			return formatter.format(value)
		},
		[formatter]
	)

	return (
		<Card className='flex h-24 w-full items-center gap-4 p-4'>
			{icon}
			<div className='flex flex-col gap-0'>
				<p className='text-lg text-muted-foreground'>{title}</p>
				<CountUp
					preserveValue
					redraw={false}
					end={value}
					formattingFn={formatFn}
					className='text-2xl'
				/>
			</div>
		</Card>
	)
}
