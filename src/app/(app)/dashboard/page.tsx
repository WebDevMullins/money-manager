import { db } from '@/server/db'
import { currentUser } from '@clerk/nextjs/server'
import { MinusIcon, PlusIcon } from 'lucide-react'
import { redirect } from 'next/navigation'

import { Button } from '@/components/ui/button'

import CreateTransaction from './_components/CreateTransactionDialog'
import History from './_components/History'
import Overview from './_components/Overview'

export default async function DashboardPage() {
	const user = await currentUser()

	if (!user) {
		redirect('/sign-in')
	}

	const userSettings = await db.userSettings.findUnique({
		where: {
			userId: user.id
		}
	})

	if (!userSettings) {
		redirect('/onboarding')
	}

	return (
		<div className='min-h-dvh bg-background'>
			<div className='border-b bg-card'>
				<div className='container flex flex-wrap items-center justify-between gap-6 py-8'>
					<p className='text-3xl font-bold'>Welcome, {user.firstName}! 👋🏼</p>
					<div className='flex items-center gap-3'>
						<CreateTransaction
							trigger={
								<Button
									variant={'outline'}
									className='border-emerald-500 bg-emerald-950 text-white hover:bg-emerald-700 hover:text-white'>
									<PlusIcon className='mr-2 size-4' />
									New Income
								</Button>
							}
							type={'income'}
						/>
						<CreateTransaction
							trigger={
								<Button
									variant={'outline'}
									className='border-red-500 bg-red-950 text-white hover:bg-red-700 hover:text-white'>
									<MinusIcon className='mr-2 size-4' />
									New Expense
								</Button>
							}
							type='expense'
						/>
					</div>
				</div>
			</div>
			<Overview userSettings={userSettings} />
			<History userSettings={userSettings} />
		</div>
	)
}
