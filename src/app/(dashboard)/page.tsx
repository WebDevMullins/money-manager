import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
	const user = await currentUser()

	if (!user) {
		redirect('/sign-in')
	}

	return (
		<main className='flex min-h-screen flex-col items-center justify-center '>
			<h1 className='text-3xl'>{user?.firstName}</h1>
		</main>
	)
}
