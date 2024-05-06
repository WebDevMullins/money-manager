'use client'

import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable,
	type ColumnDef,
	type ColumnFiltersState,
	type SortingState
} from '@tanstack/react-table'
import { RotateCcwIcon } from 'lucide-react'
import { useMemo, useState } from 'react'

import { DataTableFacetedFilter } from '@/components/datatable/FacetedFilters'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'

import type { TransactionType } from './columns'
import { DataTableViewOptions } from './data-table-view-options'

import type { GetTransactionHistoryResponseType } from '../api/transactions/route'

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue & TransactionType>[]
	data: TData[] & GetTransactionHistoryResponseType[],
	to: Date,
	from: Date
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting,
			columnFilters
		}
	})

	const categories = useMemo(() => {
		const categoriesMap = new Map()
		data?.forEach((transaction: GetTransactionHistoryResponseType) => {
			categoriesMap.set(transaction.category, {
				value: transaction.category,
				label: `${transaction.categoryIcon} ${transaction.category}`
			})
		})
		const uniqueCategories = new Set(categoriesMap.values())
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return Array.from(uniqueCategories)
	}, [data])

	const isFiltered = table.getState().columnFilters.length > 0

	return (
		<div className='w-full'>
			<div className='flex flex-wrap items-end justify-between gap-2 py-4'>
				<Input
					placeholder='Filter transactions...'
					value={(table.getColumn('description')?.getFilterValue() as string) ?? ''}
					onChange={(event) =>
						table.getColumn('description')?.setFilterValue(event.target.value)
					}
					className='h-8 w-[150px] lg:w-[250px]'
				/>
				<div className='flex gap-2'>
					{table.getColumn('category') && (
						<DataTableFacetedFilter
							title='Category'
							column={table.getColumn('category')}
							options={categories}
						/>
					)}
					{table.getColumn('type') && (
						<DataTableFacetedFilter
							title='Type'
							column={table.getColumn('type')}
							options={[
								{ label: 'Income', value: 'income' },
								{ label: 'Expense', value: 'expense' }
							]}
						/>
					)}
					{isFiltered && (
						<Button
							variant='ghost'
							onClick={() => table.resetColumnFilters()}
							className='h-8 px-2 lg:px-3'>
							Reset
							<RotateCcwIcon className='ml-2 size-4' />
						</Button>
					)}
				</div>
				<DataTableViewOptions table={table} />
			</div>
			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center'>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
