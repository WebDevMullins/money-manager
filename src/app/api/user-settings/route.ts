import { db } from '@/server/db'
import { currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function GET(_req: Request) {
	const user = await currentUser()

	if (!user) {
		redirect('/sign-in')
	}

	let userSettings = await db.userSettings.findUnique({
		where: {
			userId: user.id
		}
	})

	if (!userSettings) {
		userSettings = await db.userSettings.create({
			data: {
				userId: user.id,
				currency: 'USD'
			}
		})
	}
	// Revalidate the page every time the user settings change
	revalidatePath('/onboarding')

	return Response.json(userSettings)
}
