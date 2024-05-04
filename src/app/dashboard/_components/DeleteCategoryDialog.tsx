'use client'
import type { Category } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/components/ui/alert-dialog'

import { buttonVariants } from '@/components/ui/button'
import { type TransactionType } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Trash2Icon } from 'lucide-react'
import { DeleteCategory } from '../_actions/categories'

interface DeleteCategoryDialogProps {
	trigger: React.ReactNode
	category: Category
}

export default function DeleteCategoryDialog({
	trigger,
	category
}: DeleteCategoryDialogProps) {
	const categoryIdentifier = `${category.name}-${category.type}`

	const queryClient = useQueryClient()

	const deleteCategory = useMutation({
		mutationFn: DeleteCategory,
		onSuccess: async () => {
			toast.success(`Category ${category.name} deleted successfully 🎉`, {
				id: categoryIdentifier
			})

			await queryClient.invalidateQueries({
				queryKey: ['categories']
			})
		},
		onError: () => {
			toast.error('Something went wrong', {
				id: categoryIdentifier
			})
		}
	})
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure?</AlertDialogTitle>
					<AlertDialogDescription className='text-pretty'>
						This action cannot be undone.
						<br /> This will permanently delete the{' '}
						<span className='font-bold'>{category.name} </span>
						category.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						className={cn(buttonVariants({ variant: 'destructive' }))}
						onClick={() => {
							toast.loading('Deleting category...', {
								id: categoryIdentifier
							})
							deleteCategory.mutate({
								name: category.name,
								type: category.type as TransactionType
							})
						}}>
						<Trash2Icon className='mr-2 size-4' />
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
