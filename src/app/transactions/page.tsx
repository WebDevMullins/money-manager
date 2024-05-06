'use client'

import { useQuery } from '@tanstack/react-query'
import { differenceInDays, startOfMonth } from 'date-fns'
import { useState } from 'react'
import { toast } from 'sonner'

import { DateRangePicker } from '@/components/ui/date-range-picker'
import { columns } from './columns'
import { DataTable } from './data-table'

import { MAX_DATE_RANGE_DAYS } from '@/lib/constants'
import { DateToUTC } from '@/lib/helpers'

import type { GetTransactionHistoryResponseType } from '../api/transactions/route'

function TransactionsPage() {
	const [dateRange, setDateRange] = useState({
		from: startOfMonth(new Date()),
		to: new Date()
	})

	const from = DateToUTC(dateRange.from)
	const to = DateToUTC(dateRange.to)

	const history = useQuery<GetTransactionHistoryResponseType>({
		queryKey: ['transactions', 'history', from, to],
		queryFn: () =>
			fetch(
				// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
				`/api/transactions?from=${from}&to=${to}`
			).then((res) => res.json())
	})

	const noData: unknown[] = []

	return (
		<>
			<div className='border-b bg-card'>
				<div className='container flex flex-wrap items-center justify-between gap-6 py-8'>
					<div>
						<p className='text-3xl font-bold'>Transactions History</p>
					</div>
					<DateRangePicker
						initialDateFrom={dateRange.from}
						initialDateTo={dateRange.to}
						showCompare={false}
						onUpdate={(values) => {
							const { from, to } = values.range

							if (!from || !to) return
							if (differenceInDays(to, from) > MAX_DATE_RANGE_DAYS) {
								toast.error(
									`The selected date range is too big. Max allowed range is ${MAX_DATE_RANGE_DAYS} days!`
								)
								return
							}

							setDateRange({ from, to })
						}}
					/>
				</div>
			</div>
			<div className='container'>
				<DataTable
					columns={columns}
					data={history.data ?? noData}
				/>
			</div>
		</>
	)
}

export default TransactionsPage
