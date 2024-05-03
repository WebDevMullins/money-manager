'use server'

import {
	CreateTransactionSchema,
	type CreateTransactionSchemaType
} from '@/schema/transaction'
import { db } from '@/server/db'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export async function CreateTransaction(form: CreateTransactionSchemaType) {
	const parsedBody = CreateTransactionSchema.safeParse(form)

	if (!parsedBody.success) {
		throw new Error(parsedBody.error.message)
	}

	const user = await currentUser()
	if (!user) {
		redirect('/sign-in')
	}

	const { amount, category, description, date, type } = parsedBody.data

	const categoryRow = await db.category.findFirst({
		where: {
			userId: user.id,
			name: category
		}
	})

	if (!categoryRow) {
		throw new Error('Category not found')
	}

	await db.$transaction([
		db.transaction.create({
			data: {
				userId: user.id,
				amount,
				date,
				description: description ?? '',
				type,
				category: categoryRow.name,
				categoryIcon: categoryRow.icon
			}
		}),

		db.monthHistory.upsert({
			where: {
				day_month_year_userId: {
					day: date.getUTCDate(),
					month: date.getUTCMonth(),
					year: date.getUTCFullYear(),
					userId: user.id
				}
			},
			create: {
				day: date.getUTCDate(),
				month: date.getUTCMonth(),
				year: date.getUTCFullYear(),
				userId: user.id,
				expense: type === 'expense' ? amount : 0,
				income: type === 'income' ? amount : 0
			},
			update: {
				expense: {
					increment: type === 'expense' ? amount : 0
				},
				income: {
					increment: type === 'income' ? amount : 0
				}
			}
		}),

		db.yearHistory.upsert({
			where: {
				month_year_userId: {
					month: date.getUTCMonth(),
					year: date.getUTCFullYear(),
					userId: user.id
				}
			},
			create: {
				month: date.getUTCMonth(),
				year: date.getUTCFullYear(),
				userId: user.id,
				expense: type === 'expense' ? amount : 0,
				income: type === 'income' ? amount : 0
			},
			update: {
				expense: {
					increment: type === 'expense' ? amount : 0
				},
				income: {
					increment: type === 'income' ? amount : 0
				}
			}
		})
	])
}
