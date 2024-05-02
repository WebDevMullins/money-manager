'use client'

import { useCallback, useEffect, useState } from 'react'

import SkeletonWrapper from '@/components/SkeletonWrapper'
import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '@/components/ui/command'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'

import { UpdateUserCurrency } from '@/app/onboarding/_actions/userSettings'
import { useMediaQuery } from '@/hooks/use-media-query'
import { currencies, type Currency } from '@/lib/currencies'
import { type UserSettings } from '@prisma/client'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

export function CurrencySelector() {
	const [open, setOpen] = useState(false)
	const isDesktop = useMediaQuery('(min-width: 768px)')
	const [selectedOption, setSelectedOption] = useState<Currency | null>(null)

	const userSettings = useQuery<UserSettings>({
		queryKey: ['userSettings'],
		queryFn: () => fetch('/api/user-settings').then((res) => res.json())
	})

	useEffect(() => {
		if (!userSettings.data) return
		const userCurrency = currencies.find(
			(currency) => currency.value === userSettings.data.currency
		)
		if (userCurrency) setSelectedOption(userCurrency)
	}, [userSettings.data])

	const mutation = useMutation({
		mutationFn: UpdateUserCurrency,
		onSuccess: (data: UserSettings) => {
			toast.success(`Currency updated successfully 🎉`, {
				id: 'update-currency'
			})

			setSelectedOption(
				currencies.find((c) => c.value === data.currency) ?? null
			)
		},
		onError: (e) => {
			console.error(e)
			toast.error('Something went wrong', {
				id: 'update-currency'
			})
		}
	})

	const selectOption = useCallback(
		(currency: Currency | null) => {
			if (!currency) {
				toast.error('Please select a currency')
				return
			}

			toast.loading('Updating currency...', {
				id: 'update-currency'
			})

			mutation.mutate(currency.value)
		},
		[mutation]
	)

	if (isDesktop) {
		return (
			<SkeletonWrapper isLoading={userSettings.isFetching}>
				<Popover
					open={open}
					onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							variant='outline'
							className='w-full justify-start'
							disabled={mutation.isPending}>
							{selectedOption ? <>{selectedOption.label}</> : <>Set currency</>}
						</Button>
					</PopoverTrigger>
					<PopoverContent
						className='w-[200px] p-0'
						align='start'>
						<OptionList
							setOpen={setOpen}
							setSelectedOption={selectOption}
						/>
					</PopoverContent>
				</Popover>
			</SkeletonWrapper>
		)
	}

	return (
		<SkeletonWrapper isLoading={userSettings.isFetching}>
			<Drawer
				open={open}
				onOpenChange={setOpen}>
				<DrawerTrigger asChild>
					<Button
						variant='outline'
						className='w-full justify-start'
						disabled={mutation.isPending}>
						{selectedOption ? <>{selectedOption.label}</> : <>Set currency</>}
					</Button>
				</DrawerTrigger>
				<DrawerContent>
					<div className='mt-4 border-t'>
						<OptionList
							setOpen={setOpen}
							setSelectedOption={selectOption}
						/>
					</div>
				</DrawerContent>
			</Drawer>
		</SkeletonWrapper>
	)
}

function OptionList({
	setOpen,
	setSelectedOption
}: {
	setOpen: (open: boolean) => void
	setSelectedOption: (option: Currency | null) => void
}) {
	return (
		<Command>
			<CommandInput placeholder='Filter currency...' />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup>
					{currencies.map((currency: Currency) => (
						<CommandItem
							key={currency.value}
							value={currency.value}
							onSelect={(value) => {
								setSelectedOption(
									currencies.find((priority) => priority.value === value) ??
										null
								)
								setOpen(false)
							}}>
							{currency.label}
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	)
}