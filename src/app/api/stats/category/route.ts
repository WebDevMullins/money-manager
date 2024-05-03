import { OverviewQuerySchema } from '@/schema/overview'
import { db } from '@/server/db'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export async function GET(req: Request) {
	const user = await currentUser()
	if (!user) {
		redirect('/sign-in')
	}

	const { searchParams } = new URL(req.url)
	const from = searchParams.get('from')
	const to = searchParams.get('to')

	const queryparams = OverviewQuerySchema.safeParse({ from, to })

	if (!queryparams.success) {
		throw new Error(queryparams.error.message)
	}

	const stats = await getCategoryStats(
		user.id,
		queryparams.data.from,
		queryparams.data.to
	)

	return Response.json(stats)
}

export type GetCategoryStatsResponseType = Awaited<
	ReturnType<typeof getCategoryStats>
>

async function getCategoryStats(userId: string, from: Date, to: Date) {
	const stats = await db.transaction.groupBy({
		by: ['category', 'categoryIcon', 'type'],
		where: {
			userId,
			date: {
				gte: from,
				lte: to
			}
		},
		_sum: {
			amount: true
		},
		orderBy: {
			_sum: {
				amount: 'desc'
			}
		}
	})

	return stats
}
