'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { CalendarIcon, Loader2Icon } from 'lucide-react'
import { useCallback, useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import { DateToUTC } from '@/lib/helpers'
import { type TransactionType } from '@/lib/types'
import { cn } from '@/lib/utils'
import {
	CreateTransactionSchema,
	type CreateTransactionSchemaType
} from '@/schema/transaction'
import { toast } from 'sonner'
import { CreateTransaction } from '../_actions/transactions'
import CategorySelector from './CategorySelector'

interface CreateTransactionProps {
	trigger: ReactNode
	type: TransactionType
}

export default function CreateTransactionDialog({
	trigger,
	type
}: CreateTransactionProps) {
	const [open, setOpen] = useState(false)
	const queryClient = useQueryClient()

	const form = useForm<CreateTransactionSchemaType>({
		resolver: zodResolver(CreateTransactionSchema),
		defaultValues: {
			type,
			date: new Date()
		}
	})

	const handleCategoryChange = useCallback(
		(value: string) => {
			form.setValue('category', value)
		},
		[form]
	)

	const { mutate, isPending } = useMutation({
		mutationFn: CreateTransaction,
		onSuccess: () => {
			toast.success('Transaction created successfully 🎉', {
				id: 'create-transaction'
			})

			form.reset({
				amount: 0,
				category: undefined,
				date: new Date(),
				description: '',
				type
			})

			void queryClient.invalidateQueries({
				queryKey: ['overview']
			})

			setOpen((prev) => !prev)
		}
	})

	const onSubmit = useCallback(
		(values: CreateTransactionSchemaType) => {
			toast.loading('Creating transaction...', {
				id: 'create-transaction'
			})
			mutate({
				...values,
				date: DateToUTC(values.date)
			})
		},
		[mutate]
	)

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Create a New{' '}
						<span
							className={cn(
								'm-1 capitalize',
								type === 'income' ? 'text-emerald-500' : 'text-red-500'
							)}>
							{type}
						</span>{' '}
						Transaction
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						className='space-y-4'
						onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Input
											defaultValue={''}
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Transaction description (optional)
									</FormDescription>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='amount'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Amount</FormLabel>
									<FormControl>
										<Input
											defaultValue={0}
											type='number'
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Transaction amount (required)
									</FormDescription>
								</FormItem>
							)}
						/>

						<div className='flex items-center justify-between gap-2'>
							<FormField
								control={form.control}
								name='category'
								render={() => (
									<FormItem className='flex flex-col'>
										<FormLabel>Category</FormLabel>
										<FormControl>
											<CategorySelector
												type={type}
												onChange={handleCategoryChange}
											/>
										</FormControl>
										<FormDescription className='text-pretty'>
											Select a category for this transaction
										</FormDescription>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='date'
								render={({ field }) => (
									<FormItem className='flex flex-col'>
										<FormLabel>Transaction Date</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant={'outline'}
														className={cn(
															'w-[200px] pl-3 text-left font-normal',
															!field.value && 'text-muted-foreground'
														)}>
														{field.value ? (
															format(field.value, 'PPP')
														) : (
															<span>Pick a date</span>
														)}
														<CalendarIcon className='ml-auto size-4 opacity-50' />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent
												className='w-auto p-0'
												align='start'>
												<Calendar
													mode='single'
													selected={field.value}
													onSelect={(value) => {
														if (!value) return
														field.onChange(value)
													}}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
										<FormDescription>
											Select a date for this transaction
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</form>
				</Form>
				<DialogFooter>
					<DialogClose asChild>
						<Button
							type='button'
							variant={'secondary'}
							onClick={() => {
								form.reset()
							}}>
							Cancel
						</Button>
					</DialogClose>
					<Button
						onClick={form.handleSubmit(onSubmit)}
						disabled={isPending}>
						{!isPending && 'Create'}
						{isPending && <Loader2Icon className='animate-spin' />}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
