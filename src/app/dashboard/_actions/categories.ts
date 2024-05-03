'use server'

import {
	CreateCategorySchema,
	DeleteCategorySchema,
	type CreateCategorySchemaType,
	type DeleteCategorySchemaType
} from '@/schema/categories'
import { db } from '@/server/db'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export async function CreateCategory(form: CreateCategorySchemaType) {
	const parsedBody = CreateCategorySchema.safeParse(form)
	if (!parsedBody.success) {
		throw new Error('bad request')
	}

	const user = await currentUser()
	if (!user) {
		redirect('/sign-in')
	}

	const { name, icon, type } = parsedBody.data
	return await db.category.create({
		data: {
			userId: user.id,
			name,
			icon,
			type
		}
	})
}

export async function DeleteCategory(form: DeleteCategorySchemaType) {
	const parsedBody = DeleteCategorySchema.safeParse(form)
	if (!parsedBody.success) {
		throw new Error('bad request')
	}

	const user = await currentUser()
	if (!user) {
		redirect('/sign-in')
	}

	return await db.category.delete({
		where: {
			name_userId_type: {
				userId: user.id,
				name: parsedBody.data.name,
				type: parsedBody.data.type
			}
		}
	})
}
