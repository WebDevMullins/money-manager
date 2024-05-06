'use client'

import type { ColumnDef, Row } from '@tanstack/react-table'

import { DataTableColumnHeader } from '@/components/datatable/ColumnHeader'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { MoreHorizontalIcon, Trash2Icon } from 'lucide-react'
import { useState } from 'react'
import type { GetTransactionHistoryResponseType } from '../api/transactions/route'
import DeleteTransactionDialog from './delete-transactions-dialog'

export type TransactionType = GetTransactionHistoryResponseType[0]

export const columns: ColumnDef<TransactionType>[] = [
	{
		accessorKey: 'category',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Category'
			/>
		),
		filterFn: (row: Row<TransactionType>, id: string, value: string) => {
			return value.includes(row.getValue(id))
		},
		cell: ({ row }) => (
			<div className='flex gap-2 capitalize'>
				{row.original.categoryIcon}
				<div className='capitalize'>{row.original.category}</div>
			</div>
		)
	},
	{
		accessorKey: 'description',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Description'
			/>
		),
		cell: ({ row }) => (
			<div className='capitalize'>{row.original.description}</div>
		)
	},
	{
		accessorKey: 'date',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Date'
			/>
		),
		filterFn: (row: Row<TransactionType>, id: string, value: string) => {
			return value.includes(row.getValue(id))
		},
		cell: ({ row }) => {
			const date = new Date(row.original.date)
			const formattedDate = date.toLocaleDateString('default', {
				timeZone: 'UTC',
				year: 'numeric',
				month: '2-digit',
				day: '2-digit'
			})
			return <div className='text-muted-foreground'>{formattedDate}</div>
		}
	},
	{
		accessorKey: 'type',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Type'
			/>
		),
		filterFn: (row: Row<TransactionType>, id: string, value: string) => {
			return value.includes(row.getValue(id))
		},
		cell: ({ row }) => (
			<div
				className={cn(
					'rounded-lg p-2 text-center capitalize',
					row.original.type === 'income' &&
						'bg-emerald-400/10 text-emerald-500',
					row.original.type === 'expense' && 'bg-red-400/10 text-red-500'
				)}>
				{row.original.type}
			</div>
		)
	},
	{
		accessorKey: 'amount',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Amount'
			/>
		),
		cell: ({ row }) => (
			<p className='text-md rounded-lg bg-gray-400/5 p-2 text-center font-medium'>
				{row.original.formattedAmount}
			</p>
		)
	},
	{
		id: 'actions',
		enableHiding: false,
		cell: ({ row }) => <RowActions transaction={row.original} />
	}
]

function RowActions({ transaction }: { transaction: TransactionType }) {
	const [showDeleteDialog, setShowDeleteDialog] = useState(false)

	return (
		<>
			<DeleteTransactionDialog
				open={showDeleteDialog}
				setOpen={setShowDeleteDialog}
				transactionId={transaction.id}
			/>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant={'ghost'}
						className='h-8 w-8 p-0 '>
						<span className='sr-only'>Open menu</span>
						<MoreHorizontalIcon className='size-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						className='flex items-center gap-2'
						onSelect={() => {
							setShowDeleteDialog((prev) => !prev)
						}}>
						<Trash2Icon className='size-4 text-muted-foreground' />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
}
