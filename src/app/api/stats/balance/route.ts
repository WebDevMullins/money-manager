import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { OverviewQuerySchema } from '@/schema/overview'
import { db } from '@/server/db'

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
		return Response.json(queryparams.error.message, {
			status: 400
		})
	}

	const stats = await getBalanceStats(
		user.id,
		queryparams.data.from,
		queryparams.data.to
	)

	return Response.json(stats)
}

export type GetBalanceStatsResponseType = Awaited<
	ReturnType<typeof getBalanceStats>
>

async function getBalanceStats(userId: string, from: Date, to: Date) {
	const totals = await db.transaction.groupBy({
		by: ['type'],
		where: {
			userId,
			date: {
				gte: from,
				lte: to
			}
		},
		_sum: {
			amount: true
		}
	})

	return {
		expense: totals.find((t) => t.type === 'expense')?._sum.amount ?? 0,
		income: totals.find((t) => t.type === 'income')?._sum.amount ?? 0
	}
}
